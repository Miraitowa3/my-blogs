import comp from "C:/Users/MIRAITOWA/Desktop/vupress-reco/.vuepress/.temp/pages/a.html.vue"
const data = JSON.parse("{\"path\":\"/a.html\",\"title\":\"git+jenkins+gitHub+nginx实现自动化部署\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"git+jenkins+gitHub+nginx实现自动化部署\",\"date\":\"2023/7/29\",\"lastUpdated\":true,\"hideComments\":false,\"categories\":[\"前端工程化/CICD\"]},\"headers\":[{\"level\":2,\"title\":\"安装 java 环境\",\"slug\":\"安装-java-环境\",\"link\":\"#安装-java-环境\",\"children\":[]},{\"level\":2,\"title\":\"安装 git 仓库\",\"slug\":\"安装-git-仓库\",\"link\":\"#安装-git-仓库\",\"children\":[]},{\"level\":2,\"title\":\"系统配置与项目构建\",\"slug\":\"系统配置与项目构建\",\"link\":\"#系统配置与项目构建\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"a.md\"}")
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
