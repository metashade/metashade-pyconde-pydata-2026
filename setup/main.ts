import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ router }) => {
  if (typeof window !== 'undefined') {
    // 1. Configure GoatCounter
    (window as any).goatcounter = {
      no_onload: true,
    }

    // 2. Dynamically inject the script tag
    const script = window.document.createElement('script')
    script.async = true
    script.src = 'https://gc.zgo.at/count.js'
    script.dataset.goatcounter = 'https://metashade.goatcounter.com/count'
    window.document.head.appendChild(script)

    // 3. Setup router hook to track page views
    let retryCount = 0
    const MAX_RETRIES = 50 // 5 seconds max retry
    let timeoutId: any = null

    const count = () => {
      const gc = (window as any).goatcounter
      if (gc && gc.count) {
        gc.count({
          path: window.location.pathname + window.location.search + window.location.hash,
        })
        retryCount = 0
      } else if (retryCount < MAX_RETRIES) {
        retryCount++
        timeoutId = setTimeout(count, 100)
      }
    }

    router.afterEach(() => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      count()
    })
  }
})
