import BottomNav from '@/widgets/bottom-nav/ui/BottomNav';
import { Header } from '@/widgets/header/ui/Header';
import './globals.css';
export const metadata = {
  title: 'AI 식단 추천 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='bg-gray-50 pt-12 pb-16'>
        {' '}
        {/* 상단+하단 네비 높이만큼 패딩 */}
        <Header />
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
