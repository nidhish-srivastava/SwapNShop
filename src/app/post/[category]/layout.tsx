import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell an AD',
//   description: 'SwapNShop is your go-to online marketplace for buying and selling items in your local area and beyond. Browse a wide variety of listings, from electronics and fashion to furniture and collectibles. With our secure platform and user verification system, you can trade, sell, or shop with confidence. Join SwapNShop now and enjoy a convenient and safe way to swap, sell, and find great deals. Buy, sell, and connect with your community at SwapNShop today!'
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
