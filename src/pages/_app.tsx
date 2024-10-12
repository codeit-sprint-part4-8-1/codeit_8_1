import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import GNB from '@/components/@Shared/GNB';
import Container from '@/components/@Shared/Container';
import Footer from '@/components/@Shared/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMainPage = router.pathname === '/'; // 메인 페이지 여부 확인

  return (
    <div className="flex flex-col min-h-screen">
      <GNB />
      {/* 컨테이너 컴포넌트에 fullWidth prop을 전달 */}
      <Container fullWidth={isMainPage}>
        <Component {...pageProps} />
      </Container>
      <Footer className="mt-auto" />
    </div>
  );
}
