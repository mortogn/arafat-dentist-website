// import Script from 'next/script'

// Umami analytics is temporarily disabled.
// To re-enable, uncomment the Script below and remove the `return null` line.
const UmamiAnalytics = () => {
  return null

  // return (
  //   <Script
  //     defer
  //     src="/track/script.js"
  //     data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACK_CODE}
  //     strategy="afterInteractive"
  //   />
  // )
}

export default UmamiAnalytics
