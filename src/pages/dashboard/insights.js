// pages/tips-and-insights.js
import Link from 'next/link'
import Image from 'next/image'

const TipsAndInsights = () => {
  const engagementTips = [
    { title: 'Post More Frequently', description: 'Increase the frequency of posts to keep followers engaged' },
    { title: 'Engage with Followers', description: 'Respond to comments and messages to build a community feel' },
    { title: 'Use Stories and Reels', description: 'Leverage Instagram Stories and Reels to share quick and varied content' },
    { title: 'Incorporate Hashtags', description: 'Use relevant and trending hashtags to increase post visibility' },
    { title: 'Host Giveaways', description: 'Encourage followers to engage with content through giveaways and contests' },
    { title: 'Collaborate with Influencers', description: 'Partner with influencers to reach more followers and increase visibility' },
  ]

  const followerTips = [
    { title: 'Optimize Profile', description: 'Ensure the profile is visually appealing and provides clear information' },
    { title: 'Cross Promote on Other Platforms', description: 'Promote your Instagram account on other social networks like Facebook, Twitter, and TikTok' },
    { title: 'Content Quality', description: 'Post high-quality, visually appealing photos and videos' },
    { title: 'Engage with Other Accounts', description: 'Like, comment, and follow other accounts in your niche to attract followers' },
    { title: 'Run Instagram Ads', description: 'Use targeted promoted content to reach specific demographics and viewers' },
    { title: 'Post at Optimal Times', description: 'Analyze your audience to post when they\'re most active' },
  ]

  const summaryRecommendations = [
    { title: 'Content Optimization', description: 'Create diverse content including different versions of your pictures, experiments with different types of content formats, stories, and reels to maintain engagement.' },
    { title: 'Increase Interactivity', description: 'Use interactive elements like polls, questions and quizzes in Instagram Stories to increase engagement.' },
    { title: 'Leverage Top Commenters', description: 'Engage more with top commenters by responding to their comments and fostering their content. This can help build a stronger community feel.' },
    { title: 'Post Timing Strategy', description: 'Identify the times when your posts receive the most engagement and schedule your new posts around those times to maximize reach.' },
    { title: 'Enhance Visual Appeal', description: 'Invest in higher quality visuals and consider a consistent theme or aesthetic for the profile to stand out.' },
  ]

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-gray-600">
          ← Back
        </Link>
      </div>

      {/* Header with balloons */}
      <div className="relative mb-8">
        <h1 className="text-xl font-semibold mb-2">Tips & Insights</h1>
        <p className="text-sm">
          We have prepared some tips to help improve the{' '}
          <span className="text-blue-500">performance</span> of your Instagram account.
        </p>
        
      </div>

      {/* Engagement Tips */}
      <section className="mb-6">
        <h2 className="text-md font-medium mb-4">Recommendations for Increasing Engagement</h2>
        <div className="space-y-2">
          {engagementTips.map((tip, index) => (
            <div key={index} className="bg-[#f3f9f3] p-3 rounded-lg flex items-start gap-3">
              <div className="mt-1">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{tip.title}</h3>
                <p className="text-xs text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Follower Tips - similar structure */}
      <section className="mb-6">
        <h2 className="text-md font-medium mb-4">Recommendations for Increasing Followers</h2>
        <div className="space-y-2">
          {followerTips.map((tip, index) => (
            <div key={index} className="bg-[#f3f9f3] p-3 rounded-lg flex items-start gap-3">
              <div className="mt-1">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{tip.title}</h3>
                <p className="text-xs text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Recommendations */}
      <section className="mb-12">
        <h2 className="text-md font-medium mb-4">Summary Recommendations</h2>
        <div className="space-y-2">
          {summaryRecommendations.map((rec, index) => (
            <div key={index} className="bg-[#e8f5e8] p-4 rounded-lg">
              <h3 className="text-sm font-medium">{rec.title}</h3>
              <p className="text-xs text-gray-600">{rec.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mb-8">
        <img src="/bell.webp" className="w-40 mx-auto mb-2"/>
        <p className="text-sm mb-4">
          Keep up to date with the latest news in the field of promotion of Instagram accounts and learn new things
        </p>
        <Link
          href="/news"
          className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-lg text-sm"
        >
          Read news →
        </Link>
      </div>

      {/* Bottom Logo */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Image
          src="/logo.png"
          alt="InstaMetrics"
          width={40}
          height={40}
        />
        <span className="text-sm font-medium">InstaMetrics</span>
      </div>
    </div>
  )
}

export default TipsAndInsights
