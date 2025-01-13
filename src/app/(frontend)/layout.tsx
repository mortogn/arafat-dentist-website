import React from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
