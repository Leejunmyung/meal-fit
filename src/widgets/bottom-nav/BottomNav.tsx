'use client';

import { Calendar, Heart, Home, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cloneElement, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { href: '/', icon: <Home />, id: 'home' },
  { href: '/planner', icon: <Calendar />, id: 'planner' },
  { href: '/favorites', icon: <Heart />, id: 'favorites' },
  { href: '/profile', icon: <User />, id: 'profile' },
];

export default function BottomNav() {
  // const pathname = usePathname();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // ✅ 경로로 activeIndex 계산
  useLayoutEffect(() => {
    if (navItems.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navRef.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, navItems]);

  if (navItems.length === 0) {
    return null;
  }

  const handleClick = (href: string, index: number) => {
    setActiveIndex(index);
    router.push(href);
  };

  return (
    <nav className='fixed bottom-0 inset-x-0 h-16 border-t flex justify-around items-center z-50 bg-white dark:bg-card/50'>
      {navItems.map(({ href, icon, id }, index) => (
        <a
          key={id}
          ref={(el) => {
            navRef.current[index] = el;
          }}
          onClick={() => handleClick(href, index)}
          className='relative flex items-center justify-center h-full flex-1 cursor-pointer'
          aria-label={id}
        >
          {cloneElement(icon, {
            className: twMerge(
              'w-6 h-6 transition-opacity duration-200',
              activeIndex === index ? 'opacity-100 text-black' : 'opacity-40 text-gray-400',
            ),
          })}
        </a>
      ))}

      {/* ✅ Limelight Effect */}
      <div
        ref={limelightRef}
        className={twMerge(
          'absolute top-0 z-10 w-11 h-[5px] rounded-full bg-black shadow-[0_50px_15px_rgba(59,130,246,0.4)]',
          isReady && 'transition-[left] duration-300 ease-in-out',
        )}
        style={{ left: '-999px' }}
      >
        <div
          className='absolute left-[-30%] top-[5px] w-[160%] h-14 pointer-events-none 
          [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] 
          bg-gradient-to-b from-[#4caf50]/40 to-transparent'
        />
      </div>
    </nav>
  );
}
