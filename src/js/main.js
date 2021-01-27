const $siteList = $(".siteList");
const $addSiteBtn = $siteList.find("#addSiteBtn");
const hashMap = JSON.parse(localStorage.getItem("navSite")) || [
  {
    name: "Demo",
    logo: "N",
    link: "//www.baidu.com/",
  },
];

const render = () => {
  $siteList.find(".site:not(#addSiteBtn)").remove();
  hashMap.forEach((node, index) => {
    const $site = $(`
    <div class="site">
      <div class="siteLogo">
        <h2>${node.logo}</h2>
      </div>
      <div class="siteContent">
        <div class="siteTitle">${node.name}</div>
        <div class="siteDesc">${node.link}</div>
      </div>
      <div class="removeSite"><i class="far fa-trash-alt"></i></div>
    </div>`).insertBefore($addSiteBtn);
    $site.on("click", function () {
      window.open("//" + node.link);
    });
    $site.on("click", ".removeSite", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

const simpleLink = (value) => {
  return value
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

$("#addSiteBtn").on("click", function () {
  let link = window.prompt("需要添加的网址为多少呢?");
  let siteName = window.prompt("给网站起个名字");
  link = simpleLink(link);
  hashMap.push({
    name: siteName,
    logo: link[0],
    link: link,
  });
  render();
});

window.onbeforeunload = () => {
  localStorage.setItem("navSite", JSON.stringify(hashMap));
};
