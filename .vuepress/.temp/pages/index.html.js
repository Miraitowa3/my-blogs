import comp from "C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"modules\":[\"BannerBrand\",\"Blog\",\"MdContent\",\"Features\",\"Footer\"],\"bannerBrand\":{\"bgImage\":\"/images/home/hero.jpg\"},\"blog\":{\"socialLinks\":[{\"icon\":\"LogoGithub\",\"link\":\"https://github.com/recoluan\"}]},\"footer\":{\"record\":\"域名备案文案\",\"recordLink\":\"域名备案地址\",\"cyberSecurityRecord\":\"公安备案文案\",\"cyberSecurityLink\":\"公安备案地址\",\"startYear\":2018}},\"headers\":[],\"git\":{\"createdTime\":1723223727000,\"updatedTime\":1723223727000,\"contributors\":[{\"name\":\"miraitowa\",\"email\":\"1835110799@qq.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
