import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* AnimatePresence wraps the children for exit/enter animations */}
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
