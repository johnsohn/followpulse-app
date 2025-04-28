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
        <h1 className="text-xl font-semibold ml-20">Secret Admirers</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Description */}
        <p className="text-gray-700">
          Although Instagram doesn't directly show who visits your profile, it
          provides several tools and data points that, when interpreted correctly,
          can help you uncover these hidden admirers.
        </p>

        {/* Articles */}
        <ArticleCard
          part="Part 1"
          title="Key Metrics to Identify Secret Admirers"
          description="Secret admirers might not leave direct footprints, but their interactions can create patterns that reveal their presence."
        />

        <ArticleCard
          part="Part 2"
          title="Engaging and Converting Your Secret Admirers"
          description="Now that you've identified the presence of secret admirers, the next step is to engage more and turn their silent interest into active support."
        />

        <ArticleCard
          part="Part 3"
          title="Maintaining and Growing Engagement with New Followers"
          description="Once you've successfully converted some of your secret admirers into followers, the journey doesn't end there."
        />

        <ArticleCard
          part="Part 4"
          title="Pro Tips To Take Advantage of Secret Admirers"
          description="Now let's talk about establishing clear boundaries that could not only protect your privacy, but also allow you to manage stalking discretely and effectively."
        />

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
