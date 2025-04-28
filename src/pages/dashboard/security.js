// pages/stalker-detection.js
import Link from 'next/link'
import Image from 'next/image'

const StalkerDetection = () => {
  const stalkerSignals = [
    { title: 'Constant Story Views', description: 'They view all your stories immediately after posting' },
    { title: 'Repetitive Likes', description: 'They like your posts, even old ones, in quick succession' },
    { title: 'Multiple Account Interactions', description: 'They interact with your content from different accounts' },
    { title: 'Comment Patterns', description: 'They leave unusually frequent or obsessive comments' },
    { title: 'Profile Views', description: 'They repeatedly visit your profile without following' },
    { title: 'Message Requests', description: 'They send multiple message requests despite being ignored' },
  ]

  const protectionMethods = [
    { title: 'Private Account', description: 'Switch your account to private to control who sees your content' },
    { title: 'Block Suspicious Users', description: 'Don\'t hesitate to block accounts showing stalking behavior' },
    { title: 'Limit Personal Info', description: 'Avoid sharing location data or personal details in posts' },
    { title: 'Story Controls', description: 'Use Close Friends feature and hide stories from suspicious accounts' },
    { title: 'Regular Account Audit', description: 'Regularly review and remove suspicious followers' },
    { title: 'Two-Factor Authentication', description: 'Enable 2FA to protect your account from unauthorized access' },
  ]

  const safetyRecommendations = [
    { title: 'Monitor Recent Followers', description: 'Keep track of new followers and their interaction patterns to identify suspicious behavior early.' },
    { title: 'Check Story Viewers', description: 'Pay attention to accounts that consistently watch your stories first and multiple times.' },
    { title: 'Document Suspicious Activity', description: 'Screenshot and save evidence of concerning behavior in case you need to report it.' },
    { title: 'Use Instagram\'s Safety Tools', description: 'Familiarize yourself with and utilize Instagram\'s built-in safety and privacy features.' },
    { title: 'Trust Your Instincts', description: 'If something feels off about an account\'s behavior, take protective measures immediately.' },
  ]

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-gray-600">
          ← Back
        </Link>
      </div>

      {/* Header */}
      <div className="relative mb-8">
        <h1 className="text-xl font-semibold mb-2">Stalker Detection Guide</h1>
        <p className="text-sm">
          Learn how to identify and protect yourself from{' '}
          <span className="text-red-500">suspicious activity</span> on your Instagram account.
        </p>
      </div>

      {/* Stalker Signals */}
      <section className="mb-6">
        <h2 className="text-md font-medium mb-4">Warning Signs of a Stalker</h2>
        <div className="space-y-2">
          {stalkerSignals.map((signal, index) => (
            <div key={index} className="bg-[#fff1f1] p-3 rounded-lg flex items-start gap-3">
              <div className="mt-1">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{signal.title}</h3>
                <p className="text-xs text-gray-600">{signal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protection Methods */}
      <section className="mb-6">
        <h2 className="text-md font-medium mb-4">How to Protect Your Account</h2>
        <div className="space-y-2">
          {protectionMethods.map((method, index) => (
            <div key={index} className="bg-[#f1f7ff] p-3 rounded-lg flex items-start gap-3">
              <div className="mt-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{method.title}</h3>
                <p className="text-xs text-gray-600">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Recommendations */}
      <section className="mb-12">
        <h2 className="text-md font-medium mb-4">Safety Tips</h2>
        <div className="space-y-2">
          {safetyRecommendations.map((rec, index) => (
            <div key={index} className="bg-[#f5f5f5] p-4 rounded-lg">
              <h3 className="text-sm font-medium">{rec.title}</h3>
              <p className="text-xs text-gray-600">{rec.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mb-8">
        <img src="/shield.webp" className="w-40 mx-auto mb-2"/>
        <p className="text-sm mb-4">
          Stay informed about the latest Instagram safety features and protect yourself from unwanted attention
        </p>
        <Link
          href="/safety-updates"
          className="inline-flex items-center justify-center bg-red-500 text-white px-6 py-2 rounded-lg text-sm"
        >
          Learn More →
        </Link>
      </div>

      {/* Bottom Logo */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Image
          src="/logo.png"
          alt="FollowPulse"
          width={40}
          height={40}
        />
        <span className="text-sm font-medium">FollowPulse</span>
      </div>
    </div>
  )
}

export default StalkerDetection
