export const redirects = JSON.parse("{\"/blogs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/cicd/git+jenkins+gitHub+nginx%E5%AE%9E%E7%8E%B0/\":\"/blogs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/cicd/git_jenkins_gitHub_nginx%E5%AE%9E%E7%8E%B0/\"}")

export const routes = Object.fromEntries([
  ["/timeline.html", { loader: () => import(/* webpackChunkName: "timeline.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/timeline.html.js"), meta: {"title":""} }],
  ["/posts.html", { loader: () => import(/* webpackChunkName: "posts.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/posts.html.js"), meta: {"title":""} }],
  ["/friendship-link.html", { loader: () => import(/* webpackChunkName: "friendship-link.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/friendship-link.html.js"), meta: {"title":""} }],
  ["/categories/qianduangongchenghua/CICD/1.html", { loader: () => import(/* webpackChunkName: "categories_qianduangongchenghua_CICD_1.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/categories/qianduangongchenghua/CICD/1.html.js"), meta: {"title":""} }],
  ["/posts/1.html", { loader: () => import(/* webpackChunkName: "posts_1.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/posts/1.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/docs/%E5%89%8D%E7%AB%AF%E7%AB%AF%E5%9F%BA%E7%A1%80/CSS/1.html", { loader: () => import(/* webpackChunkName: "docs_前端端基础_CSS_1.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/docs/前端端基础/CSS/1.html.js"), meta: {"title":"css"} }],
  ["/docs/%E5%89%8D%E7%AB%AF%E7%AB%AF%E5%9F%BA%E7%A1%80/HTML/1.html", { loader: () => import(/* webpackChunkName: "docs_前端端基础_HTML_1.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/docs/前端端基础/HTML/1.html.js"), meta: {"title":"语义化"} }],
  ["/docs/%E5%89%8D%E7%AB%AF%E7%AB%AF%E5%9F%BA%E7%A1%80/TypeScript/1.html", { loader: () => import(/* webpackChunkName: "docs_前端端基础_TypeScript_1.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/docs/前端端基础/TypeScript/1.html.js"), meta: {"title":"ts"} }],
  ["/blogs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/cicd/git_jenkins_gitHub_nginx%E5%AE%9E%E7%8E%B0/", { loader: () => import(/* webpackChunkName: "blogs_前端工程化_cicd_git_jenkins_gitHub_nginx实现_index.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/blogs/前端工程化/cicd/git_jenkins_gitHub_nginx实现/index.html.js"), meta: {"title":"git+jenkins+gitHub+nginx实现自动化部署"} }],
  ["/blogs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/cicd/githubAction%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/", { loader: () => import(/* webpackChunkName: "blogs_前端工程化_cicd_githubAction实现自动化部署_index.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/blogs/前端工程化/cicd/githubAction实现自动化部署/index.html.js"), meta: {"title":"github action实现自动化部署"} }],
  ["/blogs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/cicd/githubAction%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/%E5%8F%82%E8%80%83.html", { loader: () => import(/* webpackChunkName: "blogs_前端工程化_cicd_githubAction实现自动化部署_参考.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/blogs/前端工程化/cicd/githubAction实现自动化部署/参考.html.js"), meta: {"title":"前言"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/MIRAITOWA/Desktop/钉钉/my-blogs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
