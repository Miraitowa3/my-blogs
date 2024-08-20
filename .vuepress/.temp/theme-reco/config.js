
  import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import { applyClientSetup } from 'C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.18_@algolia+client-search@4.24.0_@types+node@22.4.1_jiti@1.21.6__mux7el6pkickjaz7xuhxuy5bma/node_modules/vuepress-theme-reco/lib/client/clientSetup.js'
import { applyClientEnhance } from 'C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.18_@algolia+client-search@4.24.0_@types+node@22.4.1_jiti@1.21.6__mux7el6pkickjaz7xuhxuy5bma/node_modules/vuepress-theme-reco/lib/client/clientEnhance.js'

import * as layouts from 'C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.18_@algolia+client-search@4.24.0_@types+node@22.4.1_jiti@1.21.6__mux7el6pkickjaz7xuhxuy5bma/node_modules/vuepress-theme-reco/lib/client/layouts/index.js'

  const layoutsFromDir = {}
export default defineClientConfig({
  enhance(...args) {
    applyClientEnhance(...args)
  },
  setup() {
    applyClientSetup()
  },
  // @ts-ignore
  layouts: { ...layouts, ...layoutsFromDir },
})
