import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'My-Ads',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
        {children}
    </>
  )
}
