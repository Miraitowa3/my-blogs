export const themeData = JSON.parse("{\"lastUpdated\":true,\"style\":\"@vuepress-reco/style-default\",\"logo\":\"/images/home/author.jpg\",\"author\":\"miraitowa\",\"authorAvatar\":\"/images/home/author.jpg\",\"commentConfig\":{\"type\":\"valine\",\"options\":{\"appId\":\"VDhqRMbuY0Yc4pj8zmSEaT1Y-gzGzoHsz\",\"appKey\":\"d07aclCvL4dpp7CXAHxNIcoI\"}},\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"前端基础\",\"children\":[{\"text\":\"CSS\",\"link\":\"/docs/前端端基础/CSS/1\"},{\"text\":\"HTML\",\"link\":\"/docs/前端端基础/HTML/1\"},{\"text\":\"TypeScript\",\"link\":\"/docs/前端端基础/TypeScript/1\"}]},{\"text\":\"前端工程化\",\"children\":[{\"text\":\"CI/CD\",\"link\":\"/categories/qianduangongchenghua/CICD/1\"}]}],\"series\":{\"/docs/前端端基础/\":[{\"text\":\"HTML\",\"children\":[\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\",\"HTML/1\"]},{\"text\":\"CSS\",\"children\":[\"CSS/1\"]},{\"text\":\"TypeScript\",\"children\":[\"TypeScript/1\"]}]}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
