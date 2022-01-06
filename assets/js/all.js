"use strict";

// 步驟一： 抓取資料 ＆ 渲染全部資料
var url = "https://hexschool.github.io/js-filter-data/data.json";
var showList = document.querySelector(".showList");
var data = [];
var filterData = []; // 使用axios 抓取資料

function getData() {
  axios.get(url).then(function (response) {
    data = response.data.filter(function (item) {
      return item.作物名稱;
    }); //資料裡面有個別資料的 "作物名稱" 是 null 型別。 我們使用 axios 獲取到的資料，不一定每筆資料都是有完整填寫的。有可能因為原始資料的缺漏，造成我們收集到不符合預期的資料，而產生錯誤。
    //因此我們需要對 get 到的資料，進行數據處理。
    //解決方法：
    //第一種方法是在 get 資料時，就篩選出 "作物名稱" 確實有值的資料 (過濾掉空值、null、undefined)
    // 使用 filter，先過濾作物名稱為 null 的資料
    // data = response.data.filter(item => item.作物名稱)
    // 增加條件判斷。第二種方法是在進行搜尋時，確保資料的 "作物名稱" 有值，讓 match 方法能夠正常運作。
    // return (item.作物名稱 && item.作物名稱.match(crop.value.trim()))
  });
}

getData(); //渲染資料

function renderData(showData) {
  var str = "";
  showData.forEach(function (item) {
    str += "\n    <tr>\n    <td>".concat(item.作物名稱, "</td>\n    <td>").concat(item.市場名稱, "</td>\n    <td>").concat(item.上價, "</td>\n    <td>").concat(item.中價, "</td>\n    <td>").concat(item.下價, "</td>\n    <td>").concat(item.平均價, "</td>\n    <td>").concat(item.交易量, "</td>\n    <tr>\n    ");
  });
  showList.innerHTML = str;
} //最後把 renderData 放進 getData 函式裡面
//步驟二： 篩選資料/種類篩選（蔬菜，水果，或者是 花 ）


var buttonGroup = document.querySelector(".button-group");
buttonGroup.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.nodeName === "BUTTON") {
    var tabs = document.querySelectorAll(".button-group button");
    tabs.forEach(function (item) {
      return item.classList.remove("active");
    });
    var type = e.target.dataset.type;
    var _filterData = [];

    if (type === "N04") {
      _filterData = data.filter(function (item) {
        return item.種類代碼 === "N04";
      });
      e.target.classList.add("active");
    } else if (type === "N05") {
      _filterData = data.filter(function (item) {
        return item.種類代碼 === "N05";
      });
      e.target.classList.add("active");
    } else if (type === "N06") {
      _filterData = data.filter(function (item) {
        return item.種類代碼 === "N06";
      });
      e.target.classList.add("active");
    }

    renderData(_filterData);
  }
}); // 步驟三： 搜尋資料

var search = document.querySelector(".search");
var inputCrop = document.querySelector("#crop");
search.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    var keyword = inputCrop.value.trim();

    if (keyword === "" || keyword === null) {
      alert("請輸入正確資訊");
      return;
    }

    var _filterData2 = [];
    _filterData2 = data.filter(function (item) {
      return item.作物名稱.match(keyword);
    });

    if (_filterData2.length === 0) {
      showList.innerHTML = "\n      <tr><td colspan=\"6\" class=\"text-center p-3\">\u67E5\u8A62\u4E0D\u5230\u4EA4\u6613\u8CC7\u8A0AQQ</td></tr>";
    } else {
      renderData(_filterData2);
      keyword = "";
    }
  }
}); //步驟四：排序資料

var select = document.querySelector("#js-select");
select.addEventListener("change", function (e) {
  switch (select.value) {
    case "依上價排序":
      selectChange("上價");
      break;

    case "依中價排序":
      selectChange("中價");
      break;

    case "依下價排序":
      selectChange("下價");
      break;

    case "依平均價排序":
      selectChange("平均價");
      break;

    case "依交易量排序":
      selectChange("交易量");
      break;

    default:
      break;
  }
});

function selectChange(value) {
  filterData.sort(function (a, b) {
    return b[value] - a[value];
  });
  renderData(filterData);
} //步驟五：進階排序資料
//# sourceMappingURL=all.js.map
