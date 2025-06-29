'use client';
import { Home, LogIn } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className='fixed top-0 inset-x-0 h-12 bg-white border-b flex items-center justify-between px-4 z-50'>
      <Link href='/'>
        <Home className='w-6 h-6 text-gray-800' />
      </Link>
      <Link href='/login'>
        <LogIn className='w-6 h-6 text-gray-800' />
      </Link>
    </header>
  );
}
