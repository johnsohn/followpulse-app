// pages/login.js
import { useState } from 'react';
import {useRouter} from 'next/router';
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard")
    // Add your login logic here
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      {/* Top section with background */}
      <div className="h-[450px] bg-[url('/background.jpg')] bg-no-repeat bg-cover" />

      {/* Bottom section with form */}
      <div className="flex-1 px-6 pt-6">
        <h1 className="text-3xl text-left text-gray-800 mb-8 font-semibold">
          Analyze your Instagram account and gain valuable insights
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-blue-600 text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
