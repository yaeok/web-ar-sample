import type { Metadata } from 'next'
import './globals.css';

import { Shippori_Mincho } from 'next/font/google';

const shippori_mincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: '400',
  variable: '--mincho',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'やりたいこと10選',
  description: '1年でやりたいことをやろう',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${shippori_mincho.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
