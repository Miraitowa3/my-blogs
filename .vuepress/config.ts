import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";
export default defineUserConfig({
  title: "miraitowaの博客",
  description: "前端开发",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "miraitowa",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/HTML/": [
        {
          text: "HTML",
          children: ["dd"],
        },

      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/categories/HTML/1/" },
      {
        text: "Linux", children: [
          { text: "CICD", link: "/categories/Linux/CICD/1/" },
          { text: "linux基础命令", link: "/categories/Linux/CICD/1/" },
        ]
      },
      { text: "服务端", link: "/docs/HTML/dd" },
    ]
  }),
  // debug: true,
});
