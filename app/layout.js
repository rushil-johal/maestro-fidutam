import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Maestro',
  description: 'Education App powered by Generative AI',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <link rel="icon" href="/public/fidulogo.png" sizes="any" />
        {children}
      </body>
    </html>
  );
}
