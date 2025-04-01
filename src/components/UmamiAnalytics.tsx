import Script from 'next/script'
import React from 'react'

const UmamiAnalytics = () => {
  return (
    <Script
      defer
      src="/track/script.js"
      data-website-id="e9d2473f-a563-40a5-bf78-7b4c4e033095"
      strategy="afterInteractive"
    />
  )
}

export default UmamiAnalytics
