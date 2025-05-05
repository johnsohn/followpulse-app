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
        <h1 className="text-xl font-semibold ml-20">Password safety</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">

        <div className="flex flex-col justify-center items-center">
        <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">NO BREACHED ACCOUNTS</span>

        <img src="/shield.webp" className="my-8"/>

        <span className="font-semibold text-2xl">Good news!</span>
        <span className="text-center text-black/70">Your email address is not associated with any data breaches.</span>

        </div>

        <div className="h-[0.5px] w-full my-8 bg-black/50" />
        {/* Newsletter Section
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
        */}

        {/* Footer */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="FollowPulse" className="w-8 h-8" />
            <span className="font-semibold">FollowPulse</span>
          </div>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
