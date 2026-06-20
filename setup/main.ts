import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ router }) => {
  if (typeof window !== 'undefined' && import.meta.env.PROD) {
    // 1. Configure GoatCounter, preserving existing configuration if any
    (window as any).goatcounter = (window as any).goatcounter || {};
    (window as any).goatcounter.no_onload = true

    // 2. Dynamically inject the script tag with an ID guard
    const scriptId = 'goatcounter-script'
    if (!window.document.getElementById(scriptId)) {
      const script = window.document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = 'https://gc.zgo.at/count.js'
      script.dataset.goatcounter = 'https://metashade.goatcounter.com/count'
      window.document.head.appendChild(script)
    }

    // 3. Setup router hook to track page views
    let retryCount = 0
    const MAX_RETRIES = 50 // 5 seconds max retry
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const count = () => {
      const gc = (window as any).goatcounter
      if (gc && gc.count) {
        gc.count({
          path: window.location.pathname + window.location.hash,
        })
        retryCount = 0
        timeoutId = null
      } else if (retryCount < MAX_RETRIES) {
        retryCount++
        timeoutId = setTimeout(count, 100)
      } else {
        timeoutId = null
      }
    }

    router.afterEach(() => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      retryCount = 0 // Reset retry count for the new navigation
      count()
    })
  }
})
