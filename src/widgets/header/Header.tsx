'use client';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 h-12 bg-white border-b flex items-center justify-between px-4 z-50">
      {/* 왼쪽: mealFit 로고 (텍스트로 대체) */}
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-black text-lg">mealFit</span>
      </Link>

      {/* 오른쪽: 로그인 / 회원가입 버튼 */}
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="px-3 py-1 border border-gray-400 rounded text-black hover:bg-gray-100 hover:text-black transition"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="px-3 py-1 border border-black bg-black rounded text-white hover:bg-gray-600 hover:text-white transition"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
