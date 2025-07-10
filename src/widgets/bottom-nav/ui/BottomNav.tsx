'use client'

import { Calendar, Heart, Home, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const navItems = [
  { href: '/', icon: <Home className="w-6 h-6" />, id: 'home' },
  { href: '/planner', icon: <Calendar className="w-6 h-6" />, id: 'planner' },
  { href: '/favorites', icon: <Heart className="w-6 h-6" />, id: 'favorites' },
  { href: '/profile', icon: <User className="w-6 h-6" />, id: 'profile' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const [activeIndex, setActiveIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const refs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)

  // 경로로 현재 activeIndex 계산
  useLayoutEffect(() => {
    const index = navItems.findIndex((item) => item.href === pathname)
    if (index !== -1) setActiveIndex(index)
  }, [pathname])

  // limelight 중앙 이동
  useLayoutEffect(() => {
    const activeItem = refs.current[activeIndex]
    const limelight = limelightRef.current

    if (activeItem && limelight) {
      const left = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2
      limelight.style.left = `${left}px`

      if (!ready) {
        setTimeout(() => setReady(true), 50)
      }
    }
  }, [activeIndex, ready, refs.current[activeIndex]?.offsetWidth])

  const handleClick = (href: string, index: number) => {
    setActiveIndex(index)
    router.push(href)
  }

  function cloneWithOpacity(icon: React.ReactElement, isActive: boolean) {
    return (
      icon &&
      twMerge(
        icon.props.className,
        isActive ? 'opacity-100 text-blue-500' : 'opacity-40 text-gray-400'
      ) &&
      {
        ...icon,
        props: {
          ...icon.props,
          className: twMerge(
            icon.props.className,
            'transition-opacity duration-200',
            isActive ? 'opacity-100 text-blue-500' : 'opacity-40 text-gray-400'
          ),
        },
      }
    )
  }

  return (
    <nav
      className="fixed bottom-0 inset-x-0 h-16 border flex justify-around items-center z-50 bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl"
    >
      {navItems.map(({ href, icon, id }, index) => (
        <a
          key={id}
          ref={(el) => (refs.current[index] = el)}
          onClick={() => handleClick(href, index)}
          className="relative flex items-center justify-center h-full px-4 cursor-pointer"
        >
          {cloneWithOpacity(icon, activeIndex === index)}
        </a>
      ))}

      {/* Limelight Effect */}
      <div
        ref={limelightRef}
        className={twMerge(
          'absolute top-0 z-10 w-11 h-[5px] rounded-full bg-blue-500 shadow-[0_50px_15px_rgba(59,130,246,0.4)]',
          ready && 'transition-[left] duration-300 ease-in-out'
        )}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 pointer-events-none 
            [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] 
            bg-gradient-to-b from-blue-400/30 to-transparent" />
      </div>
    </nav>
  )
}
