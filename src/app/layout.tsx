import type { Metadata } from 'next'
import { Exo_2 as FontSans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Provider from '@/components/SessionProvider'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SpeedInsights } from '@vercel/speed-insights/next';



const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MOBTS company dashboard',
  description: 'Dashboard for the companies',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo-light.svg',
        href: '/logo-light.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      }
    ]
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
      ><Provider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen flex items-center justify-center'>
              <Navbar />
              <main className='min-h-screen flex items-center justify-center'>
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  )
}
