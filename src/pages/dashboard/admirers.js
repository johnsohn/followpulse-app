// pages/secret-admirers.js
import Link from 'next/link';
import {useState} from "react"

function ArticleReader({body,setReading}){
  return (
    <div className="z-[50] fixed top-0 left-1/2 w-full md:max-w-md -translate-x-1/2 bg-white min-h-screen border absolute ">
    <button onClick={()=>setReading(false)} className="m-2 border border-black rounded-full p-1">close</button>
    <div className="prose overflow-auto py-10 px-4 min-h-screen shadow" dangerouslySetInnerHTML={{__html:body}} />
    </div>
  )
}
export default function SecretAdmirers() {

  const articles = [
    ` <h1>Key Metrics to Identify Secret Admirers on Instagram</h1>        <p>In the digital age, secret admirers have moved from leaving anonymous notes to leaving digital footprints on social media, particularly Instagram. While they might try to stay under the radar, certain patterns can reveal their presence.</p>    <div class="section">        <h2>1. Story Views Pattern</h2>        <ul>            <li>Consistent early viewers of your stories</li>            <li>People who watch your stories completely</li>            <li>Viewers who don't follow you but regularly check your stories</li>            <li>Those who view multiple stories in succession</li>        </ul>    </div>    <div class="section">        <h2>2. Engagement Behaviors</h2>        <ul>            <li>Quick likes on new posts (within minutes)</li>            <li>Regular likes but no comments</li>            <li>Likes on older posts (scroll-through behavior)</li>            <li>Selective engagement with specific types of content</li>        </ul>    </div>    <div class="section">        <h2>3. Profile Visits</h2>        <ul>            <li>Frequent profile visitors (if you have a business account)</li>            <li>Multiple visits within short time frames</li>            <li>Views during specific times (like late night)</li>        </ul>    </div>    <div class="section">        <h2>4. Interactive Patterns</h2>        <ul>            <li>Passive engagement (viewing without direct interaction)</li>            <li>Subtle reactions to your posts (like emoji responses)</li>            <li>Watching your live videos without commenting</li>            <li>Saving your posts without liking them</li>        </ul>    </div>    <div class="section">        <h2>5. Following Behavior</h2>        <ul>            <li>Following accounts related to you</li>            <li>Following your close friends</li>            <li>Following similar profiles to yours</li>            <li>Mutual followers who don't directly interact</li>        </ul>    </div>    <div class="section">        <h2>6. Direct Message Indicators</h2>        <ul>            <li>Message requests that were withdrawn</li>            <li>"Seen" messages without responses</li>            <li>Quick views of your DM stories</li>            <li>Reaction to your close friends' stories</li>        </ul>    </div>    <div class="section">        <h2>Red Flags to Consider</h2>        <ul>            <li>Excessive anonymous viewing</li>            <li>Creating multiple accounts to view your content</li>            <li>Inappropriate timing of engagement</li>            <li>Crossing personal boundaries</li>        </ul>    </div>    <div class="section">        <h2>Safety Tips</h2>        <ul>            <li class="tip">Keep your account private if uncomfortable</li>            <li class="tip">Block suspicious profiles</li>            <li class="tip">Report concerning behavior</li>            <li class="tip">Limit personal information sharing</li>            <li class="tip">Use Instagram's privacy features</li>        </ul>    </div>    <div class="section">        <h2>Remember</h2>        <ul>            <li>Not all silent followers are secret admirers</li>            <li>Some might be shy supporters</li>            <li>Maintain healthy boundaries</li>            <li>Trust your instincts</li>        </ul>    </div>    <div class="section">        <h2>Extra Tips</h2>        <ul>            <li>Regularly review your follower list</li>            <li>Check who saves your posts</li>            <li>Monitor tagged photos</li>            <li>Review story highlights viewers</li>            <li>Pay attention to post insights (for business accounts)</li>        </ul>    </div>    <p><strong>By being aware of these patterns, you can better understand your Instagram audience while maintaining control over your social media presence and personal space.</strong></p>    <p><em>Remember that while identifying secret admirers might be interesting, it's essential to use this knowledge responsibly and maintain healthy digital boundaries.</em></p>`,
    `<article>
        <h1>Engaging and Converting Your Secret Admirers</h1>

        <p>Now that you've identified the presence of secret admirers, the next step is to engage more and turn their silent interest into active support. Having silent observers on Instagram presents a unique opportunity to grow your following and increase engagement.</p>

        <h2>Create Irresistible Content</h2>
        <p>The first step in converting lurkers to active followers is creating content they can't resist engaging with:</p>
        <ul>
            <li>Share valuable tips and insights in your niche</li>
            <li>Use high-quality visuals that catch attention</li>
            <li>Tell compelling stories through your captions</li>
            <li>Post consistently to stay top of mind</li>
        </ul>

        <h2>Encourage Interaction</h2>
        <p>Make it easy and appealing for admirers to take that first step:</p>
        <ul>
            <li>Ask questions in your captions</li>
            <li>Use Instagram polls and quiz stickers</li>
            <li>Host contests and giveaways</li>
            <li>Reply promptly to any comments you receive</li>
        </ul>

        <h2>Build Trust Gradually</h2>
        <p>Focus on building trust with your audience through:</p>
        <ul>
            <li>Authentic behind-the-scenes content</li>
            <li>Sharing personal stories and experiences</li>
            <li>Being consistent with your posting schedule</li>
            <li>Maintaining a clear brand voice</li>
        </ul>

        <h2>Track and Adjust</h2>
        <p>Monitor your progress and optimize your strategy:</p>
        <ul>
            <li>Review Instagram Insights regularly</li>
            <li>Test different content types</li>
            <li>Track which posts drive the most engagement</li>
            <li>Adjust your approach based on results</li>
        </ul>

        <p>Remember, converting secret admirers takes time and patience. Stay consistent with your efforts and focus on providing value to your audience. The results will follow naturally.</p>
    </article>`,

    `<article>
        <h1>Maintaining and Growing Engagement with New Followers</h1>

        <p>Once you've successfully converted some of your secret admirers into followers, the journey doesn't end there. Maintaining engagement and nurturing these new relationships is crucial for long-term Instagram success.</p>

        <h2>Keep the Momentum Going</h2>
        <p>Maintain consistent engagement with your new followers through:</p>
        <ul>
            <li>Regular posting schedule</li>
            <li>Quick responses to comments</li>
            <li>Engaging with their content</li>
            <li>Personal touches in interactions</li>
        </ul>

        <h2>Provide Exclusive Value</h2>
        <p>Make your followers feel special by offering:</p>
        <ul>
            <li>Behind-the-scenes content</li>
            <li>Early access to new content</li>
            <li>Follower-only promotions</li>
            <li>Special mentions and features</li>
        </ul>

        <h2>Foster Community</h2>
        <p>Build a strong community by:</p>
        <ul>
            <li>Creating conversation-starting posts</li>
            <li>Hosting regular live sessions</li>
            <li>Featuring follower content</li>
            <li>Creating themed hashtags</li>
        </ul>

        <h2>Analyze and Adapt</h2>
        <p>Keep improving your strategy by:</p>
        <ul>
            <li>Monitoring engagement metrics</li>
            <li>Gathering feedback from followers</li>
            <li>Testing new content formats</li>
            <li>Staying updated with platform changes</li>
        </ul>

        <p>Remember that building lasting relationships on Instagram requires consistent effort and genuine interaction. Focus on adding value and fostering real connections with your community.</p>
    </article>`,

    `<article>
        <h1>Pro Tips To Take Advantage of Secret Admirers</h1>

        <p>Now let's talk about establishing clear boundaries that could not only protect your privacy, but also allow you to manage stalking discretely and effectively. Understanding how to leverage secret admirers while maintaining security is crucial.</p>

        <h2>Set Clear Boundaries</h2>
        <p>Establish healthy boundaries through:</p>
        <ul>
            <li>Privacy settings configuration</li>
            <li>Content filtering guidelines</li>
            <li>Interaction rules</li>
            <li>Response protocols</li>
        </ul>

        <h2>Strategic Content Planning</h2>
        <p>Create content that attracts positive attention:</p>
        <ul>
            <li>Professional portfolio highlights</li>
            <li>Industry insights and expertise</li>
            <li>Curated personal content</li>
            <li>Value-driven posts</li>
        </ul>

        <h2>Leverage Analytics</h2>
        <p>Use data to optimize your approach:</p>
        <ul>
            <li>Track profile visits</li>
            <li>Monitor story views</li>
            <li>Analyze engagement patterns</li>
            <li>Identify peak activity times</li>
        </ul>

        <h2>Convert Interest to Action</h2>
        <p>Turn passive viewing into active engagement:</p>
        <ul>
            <li>Create compelling CTAs</li>
            <li>Use engagement-driving features</li>
            <li>Implement strategic hashtags</li>
            <li>Optimize your bio link</li>
        </ul>

        <p>Remember to always prioritize your safety and comfort while leveraging secret admirers for growth. A balanced approach will yield the best long-term results.</p>
    </article>`
  ]

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
      <div className="flex flex-col gap-4">
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
          body={articles[0]}
        />

        <ArticleCard
          part="Part 2"
          title="Engaging and Converting Your Secret Admirers"
          description="Now that you've identified the presence of secret admirers, the next step is to engage more and turn their silent interest into active support."
          body={articles[1]}
        />

        <ArticleCard
          part="Part 3"
          title="Maintaining and Growing Engagement with New Followers"
          description="Once you've successfully converted some of your secret admirers into followers, the journey doesn't end there."
          body={articles[2]}
        />

        <ArticleCard
          part="Part 4"
          title="Pro Tips To Take Advantage of Secret Admirers"
          description="Now let's talk about establishing clear boundaries that could not only protect your privacy, but also allow you to manage stalking discretely and effectively."
          body={articles[3]}
        />

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
function ArticleCard({ part, title, description, body }) {

  const [isReading,setReading] = useState(false);

  return (
    <>
    <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white">
      <span className="text-blue-500 text-sm">{part}</span>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <button onClick={()=>{setReading(true)}} className="flex items-center text-blue-500">
        Read article
        <span className="ml-2">→</span>
      </button>
    </div>
    {isReading && (
    <ArticleReader body={body} setReading={setReading} />
    )}
    </>
  );
}
