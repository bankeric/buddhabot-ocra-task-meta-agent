import type { AppProps } from 'next/app';
import { Noto_Serif_SC, EB_Garamond } from 'next/font/google';

import '../styles/globals.css';
import { cn } from '@/lib/utils';

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-sc',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <body className={cn(notoSerifSC.className, ebGaramond.className)}>
        <Component {...pageProps} />
      </body>
    </html>
  );
}
