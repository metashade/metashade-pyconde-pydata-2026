import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ router }) => {
  if (typeof window !== 'undefined') {
    router.afterEach(() => {
      const count = () => {
        const gc = (window as any).goatcounter
        if (gc && gc.count) {
          gc.count({
            path: window.location.pathname + window.location.search + window.location.hash,
          })
        } else {
          // If the script hasn't loaded yet, retry shortly
          setTimeout(count, 100)
        }
      }
      count()
    })
  }
})
