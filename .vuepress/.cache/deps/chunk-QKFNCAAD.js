// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.18_@algolia+client-search@4.24.0_@types+node@22.4.1_jiti@1.21.6__mux7el6pkickjaz7xuhxuy5bma/node_modules/vuepress-theme-reco/lib/client/utils/other.js
function formatISODate(ISODate = "") {
  const dateStr = ISODate.replace("T", " ").replace("Z", "").split(".")[0];
  const formatDateStr = dateStr.replace(/(\s00:00:00)$/, "");
  return formatDateStr;
}

export {
  formatISODate
};
//# sourceMappingURL=chunk-QKFNCAAD.js.map
