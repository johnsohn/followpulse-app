import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const LOCK_TIMEOUT = 30000; // 30 seconds

export default function withConcurrencyLimit(handler) {
  return async (req, res) => {
    const userId = req?.user?.id || req.headers['CF-Connecting-IP'] || 'anonymous';
    const lockKey = `lock:${userId}:${req.url}`;

    const acquireLock = async () => {
      const result = await redis.set(lockKey, 'locked', 'PX', LOCK_TIMEOUT, 'NX');
      return result === 'OK';
    };

    const releaseLock = async () => {
      await redis.del(lockKey);
    };

    if (!(await acquireLock())) {
      return res.status(429).json({ error: 'Too many requests. Please wait for the previous request to complete.' });
    }

    // Wrap the original handler in a try-catch block
    try {
      // Create a new promise that wraps the handler execution
      await new Promise(async (resolve, reject) => {
        try {
          // Override res.json and res.end to release the lock before sending the response
          const originalJson = res.json;
          const originalEnd = res.end;

          res.json = async function (...args) {
            await releaseLock();
            return originalJson.apply(this, args);
          };

          res.end = async function (...args) {
            await releaseLock();
            return originalEnd.apply(this, args);
          };

          // Call the original handler
          await handler(req, res);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      // If an error occurred and the response hasn't been sent yet, send an error response
      if (!res.headersSent) {
        await releaseLock();
        res.status(500).json({ error: 'An internal server error occurred' });
      }
    }
  };
}
