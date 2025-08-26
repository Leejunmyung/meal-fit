import ReactQueryProvider from '@/shared/api/ReactQueryProvider';
import BottomNav from '@/widgets/bottom-nav/BottomNav';
import { Header } from '@/widgets/header/Header';
import './globals.css';
export const metadata = {
  title: 'AI 식단 추천 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='bg-gray-50 pt-12 pb-16'>
        <ReactQueryProvider>
          {' '}
          <Header />
          <main>{children}</main>
          <BottomNav />
        </ReactQueryProvider>
        
      </body>
    </html>
  );
}
