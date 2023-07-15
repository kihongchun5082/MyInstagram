import './globals.css'
import NavbarPage from '@/components/Navbar'
import AuthContext from '@/context/AuthContext'
import SWRConfigContext from '@/context/SWRConfigContext'
import { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
const OpenSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:  {
    default: '우리들의 인스타그램',
    template: '가족 인스타그램 | %s'
  },
  description: '전기홍 인스타그램 사진들',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={OpenSans.className}>
      <body className=' w-full bg-slate-200 overflow-auto'>
        <AuthContext>
          <header className=' sticky top-0 bg-yellow-300 z-10 border-b-2'>
            <div className=' max-w-screen-xl mx-auto'>
              <NavbarPage />
            </div>
          </header>
          <main className=" w-full flex justify-center max-w-screen-xl  mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal'/>
      </body>
    </html>
  )
}
