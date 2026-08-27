import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'R3F Next.js',
  description: 'React Three Fiber in Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 mx-auto relative overflow-hidden bg-black text-white">
        {children}
      </body>
    </html>
  );
}
