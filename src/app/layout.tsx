import { Header } from '@/components'
import Provider from '@/store/provider'

export const metadata = {
  title: 'Podcaster',
  description: 'Podcast App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
