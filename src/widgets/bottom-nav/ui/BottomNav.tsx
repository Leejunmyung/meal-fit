'use client';

import { Calendar, Heart, Home, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { href: '/', icon: <Home />, id: 'home' },
  { href: '/planner', icon: <Calendar />, id: 'planner' },
  { href: '/favorites', icon: <Heart />, id: 'favorites' },
  { href: '/profile', icon: <User />, id: 'profile' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // ✅ 경로로 activeIndex 계산
  useLayoutEffect(() => {
    const index = navItems.findIndex((item) => item.href === pathname);
    if (index !== -1) setActiveIndex(index);
  }, [pathname]);

  // ✅ limelight 위치 정확 계산 (flex 영향 X)
  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const nav = navRef.current;

    if (limelight && nav) {
      const containerWidth = nav.offsetWidth;
      const itemWidth = containerWidth / navItems.length;

      const left = itemWidth * activeIndex + itemWidth / 2 - limelight.offsetWidth / 2;
      console.log(containerWidth, itemWidth, '확인');
      // if (activeIndex === 3) {
      //   left += 8;
      // }
      limelight.style.left = `${left}px`;

      if (!ready) {
        setTimeout(() => setReady(true), 50);
      }
    }
  }, [activeIndex, ready]);

  const handleClick = (href: string, index: number) => {
    setActiveIndex(index);
    router.push(href);
  };

  return (
    <nav
      ref={navRef}
      className='fixed bottom-0 inset-x-0 h-16 border flex justify-around items-center z-50 bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl'
    >
      {navItems.map(({ href, icon, id }, index) => (
        <a
          key={id}
          onClick={() => handleClick(href, index)}
          className='relative flex items-center justify-center h-full flex-1 cursor-pointer'
          aria-label={id}
        >
          {cloneElement(icon, {
            className: twMerge(
              'w-6 h-6 transition-opacity duration-200',
              activeIndex === index ? 'opacity-100 text-blue-500' : 'opacity-40 text-gray-400',
            ),
          })}
        </a>
      ))}

      {/* ✅ Limelight Effect */}
      <div
        ref={limelightRef}
        className={twMerge(
          'absolute top-0 z-10 w-11 h-[5px] rounded-full bg-blue-500 shadow-[0_50px_15px_rgba(59,130,246,0.4)]',
          ready && 'transition-[left] duration-300 ease-in-out',
        )}
        style={{ left: '-999px' }}
      >
        <div
          className='absolute left-[-30%] top-[5px] w-[160%] h-14 pointer-events-none 
          [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] 
          bg-gradient-to-b from-blue-400/30 to-transparent'
        />
      </div>
    </nav>
  );
}
