// pages/secret-admirers.js
import Link from 'next/link';


export default function SecretAdmirers() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen bg-gradient-to-r from-blue-100/50 to-violet-100/50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="text-gray-600">
          Back
        </Link>
        <h1 className="text-xl font-semibold ml-20">My Plan</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Description */}
        <p className="text-gray-700">
          Here are all the details of your plan!
        </p>

        <div className="flex items-center justify-center">
        <span className="text-2xl">Unlocked Features</span>
        </div>
        {["Tips and Insights","Secret Admirers","Detect Stalkers","Password safety"].map((e,i)=>{
          return (
            <div index={i} key={i} className="bg-white p-4">
              {e}
            </div>
          )
        })}

        <div className="flex items-center justify-center my-4">
        <span className="text-2xl">Plan details</span>

        </div>
        <div className="flex flex-col gap-2">
        <span>You are currently subscribed to FollowPulse. Your next billing period is 5/14/2025.</span>
        <button className="bg-red-500 text-white p-1 rounded">Cancel</button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 text-center space-y-4">
          <img src="/bell.webp" alt="Bell" className="mx-auto w-40" />
          <h2 className="font-semibold">
            Keep up to date with the latest news in the field of promotion of
            Instagram accounts and learn new things
          </h2>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Read news
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="FollowPulse" className="w-8 h-8" />
            <span className="font-semibold">FollowPulse</span>
          </div>
          <p className="text-gray-500">Profile Analyzer</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Article Card Component
function ArticleCard({ part, title, description }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white">
      <span className="text-blue-500 text-sm">{part}</span>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <button className="flex items-center text-blue-500">
        Read article
        <span className="ml-2">→</span>
      </button>
    </div>
  );
}
