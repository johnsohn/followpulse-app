// components/Navbar.tsx
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: '💡', title: 'Tips & Insights', href: '/tips' },
    { icon: '❤️', title: 'Secret Admirers', href: '/admirers' },
    { icon: '🔍', title: 'Detect Stalkers', href: '/security' },
    { icon: '🔒', title: 'Password safety', href: '/password' },
    { icon: '🔔', title: 'News', href: '/news' },
    { icon: '📄', title: 'Terms of Service', href: '/terms' },
    { icon: '🛡️', title: 'Privacy Policy', href: '/privacy' },
    { icon: '💳', title: 'My Plan', href: '/plan' },
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 max-w-md mx-auto right-0 bg-white z-50 px-6 py-3 flex justify-between items-center border-b">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="FollowPulse"
            width={40}
            height={40}
            className="mr-3 rounded-full"
          />
          <div>
            <h1 className="font-bold text-lg">FollowPulse</h1>
            <p className="text-sm text-gray-500">Profile Analyzer</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </nav>

      {/* Centered Sidebar Menu Container */}
      <div className="fixed inset-0 flex justify-center z-40 pointer-events-none">
        {/* Sidebar Menu */}
        <div
          className={`w-full max-w-md bg-white transform transition-transform duration-300 ease-in-out pointer-events-auto ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ marginTop: '73px', height: 'calc(100vh - 73px)' }}
        >
          <div className="p-6">
            <div className="space-y-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-700 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              ))}

              <hr className="my-6" />

              <button
                onClick={() => {
                  // Add logout logic here
                  setIsOpen(false)
                }}
                className="flex items-center space-x-3 text-red-500 hover:text-red-600"
              >
                <span className="text-xl">🚪</span>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
