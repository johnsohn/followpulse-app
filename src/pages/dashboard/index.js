// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <Navbar />
      <div className="max-w-md mx-auto pt-16">
        {/* Top Trends Section */}
        <div className="bg-violet-100 rounded-xl p-4 mb-4 hidden">
          <h2 className="text-lg font-bold text-violet-800 mb-3">
            UNCOVER 2025'S TOP INSTAGRAM TRENDS
          </h2>

          <Link href="/trends" className="flex justify-between items-center p-3 bg-white rounded-lg mb-2">
            <span>Top 7 Instagram Trends That Will Define 2025</span>
            <span>→</span>
          </Link>

          <Link href="/algorithm" className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span>Top 5 Instagram Algorithm Hacks to Grow in 2025</span>
            <span>→</span>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-2">
          <FeatureCard
            title="Tips & Insights"
            description="Find out how to improve your account metrics"
            icon="💡"
            href="/dashboard/insights"
          />

          <FeatureCard
            title="Secret Admirers"
            description="Know who's watching your profile without following you"
            icon="❤️"
            href="/dashboard/admirers"
          />

          <FeatureCard
            title="Detect Stalkers"
            description="Learn how to identify, address, and prevent stalking or data"
            icon="🔍"
            href="/dashboard/security"
          />

          <FeatureCard
            title="Password safety"
            description="Find out if all your passwords are securely protected"
            icon="🔑"
            href="/dashboard/password-safety"
          />
          {/*
          <FeatureCard
            title="News"
            description="Stay up to date with current and popular trends"
            icon="☁️"
            href="/dashboard/news"
          />
          */}
        </div>

        {/* Instagram PRO Section */}
        <div className="mt-6 bg-violet-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-violet-800">12-LESSON COURSE</div>
              <h3 className="font-bold">Instagram PRO</h3>
              <p className="text-sm text-gray-600">
                Strategies to boost engagement on your Instagram profile
              </p>
            </div>
            <Image
              src="/instagram.webp"
              alt="Instagram"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <Image

              src="/logo.png"
              alt="FollowPulse"
              width={32}
              height={32}
              className="mr-2 rounded-full"
            />
            <span className="font-bold">FollowPulse</span>
          </div>
          <div className="text-sm text-gray-500">
            <Link href="/terms" className="mr-4">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}


function FeatureCard({ title, description, icon, href }) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </Link>
  )
}
