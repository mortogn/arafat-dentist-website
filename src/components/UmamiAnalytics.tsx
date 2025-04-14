import Script from 'next/script'
import React from 'react'

const UmamiAnalytics = () => {
  return (
    <Script
      defer
      src="/track/script.js"
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACK_CODE}
      strategy="afterInteractive"
    />
  )
}

export default UmamiAnalytics
