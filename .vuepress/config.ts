// .vuepress/config.ts
import { viteBundler } from '@vuepress/bundler-vite';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { defineUserConfig } from 'vuepress';
import { recoTheme } from 'vuepress-theme-reco';
import { copyCodePlugin } from '@vuepress/plugin-copy-code';

export default defineUserConfig({
  title: 'miraitowaの博客',
  description: '前端开发',
  head: [  ["meta", {nname:"referrer" ,content:"no-referrer"}]],
  theme: recoTheme({
    lastUpdated: true,
    style: '@vuepress-reco/style-default',
    logo: '/images/home/author.jpg',
    author: 'miraitowa',
    authorAvatar: '/images/home/author.jpg',
    autoSetSeries: true,
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'VDhqRMbuY0Yc4pj8zmSEaT1Y-gzGzoHsz', // your appId
        appKey: 'd07aclCvL4dpp7CXAHxNIcoI', // your appKey
        enableQQ:true,
        visitor: true,
        avatar:'monsterid'

      }
    },
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端基础',
        children: [
          { text: 'CSS', link: '/docs/web/CSS/1' },
          { text: 'HTML', link: '/docs/web/HTML/1' },
          { text: 'TypeScript', link: '/docs/web/TypeScript/1' }
        ]
      },
      {
        text: '前端工程化',
        children: [
          {
            text: 'CI/CD',
            link: '/categories/qianduangongchenghua/CICD/1'
          }
        ]
      }
    ],
    // series 为原 sidebar
    series: {
      '/docs/web/': [
        {
          text: 'HTML',
          children: ['HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1','HTML/1',]
        },
        {
          text: 'CSS',
          children: ['CSS/1']
        },
        {
          text: 'TypeScript',
          children: ['TypeScript/1']
        }
      ]
    }
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),
  plugins: [
    nprogressPlugin(),
    mediumZoomPlugin({
      // 配置项
    }),
    copyCodePlugin({
      // options
    }),


  ]
});
