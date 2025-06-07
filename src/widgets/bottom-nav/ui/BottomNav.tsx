'use client'
import { Home, Calendar, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/planner', icon: Calendar, label: '식단' },
  { href: '/favorites', icon: Heart, label: '즐겨찾기' },
  { href: '/profile', icon: User, label: '내 정보' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t flex justify-around items-center z-50">
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        return (
          <Link key={href} href={href} className="flex flex-col items-center text-xs">
            <Icon className={`w-5 h-5 ${active ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className={active ? 'text-blue-500' : 'text-gray-500'}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}