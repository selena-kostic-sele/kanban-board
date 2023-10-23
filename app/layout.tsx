import './globals.css'

export const metadata = {
  title: 'Kanban Board',
  description: 'Generated by Selena Kostic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
