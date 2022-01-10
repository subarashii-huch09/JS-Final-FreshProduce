// 步驟一： 抓取資料 ＆ 渲染全部資料
const url = "https://hexschool.github.io/js-filter-data/data.json"
const showList = document.querySelector(".showList");
let data =[]
let filterData = []


// 使用axios 抓取資料
function getData(){
  axios.get(url).then(function(response){
    data = response.data.filter((item) => item.作物名稱);
    //資料裡面有個別資料的 "作物名稱" 是 null 型別。 我們使用 axios 獲取到的資料，不一定每筆資料都是有完整填寫的。有可能因為原始資料的缺漏，造成我們收集到不符合預期的資料，而產生錯誤。
    //因此我們需要對 get 到的資料，進行數據處理。
    //解決方法：
    //第一種方法是在 get 資料時，就篩選出 "作物名稱" 確實有值的資料 (過濾掉空值、null、undefined)
    // 使用 filter，先過濾作物名稱為 null 的資料
    // data = response.data.filter(item => item.作物名稱)

    // 增加條件判斷。第二種方法是在進行搜尋時，確保資料的 "作物名稱" 有值，讓 match 方法能夠正常運作。
    // return (item.作物名稱 && item.作物名稱.match(crop.value.trim()))
  })
}

getData();


//渲染資料
function renderData(showData){
  let str =""
  showData.forEach(function(item){
    str += `
    <tr>
    <td>${item.作物名稱}</td>
    <td>${item.市場名稱}</td>
    <td>${item.上價}</td>
    <td>${item.中價}</td>
    <td>${item.下價}</td>
    <td>${item.平均價}</td>
    <td>${item.交易量}</td>
    <tr>
    `;
  })

  showList.innerHTML = str
}

//最後把 renderData 放進 getData 函式裡面


//步驟二： 篩選資料/種類篩選（蔬菜，水果，或者是 花 ）

const buttonGroup = document.querySelector(".button-group");

buttonGroup.addEventListener("click", function(e){
  e.preventDefault()
  if ( e.target.nodeName === "BUTTON"){

    const tabs = document.querySelectorAll(".button-group button")
    tabs.forEach(item => item.classList.remove("active"))

    let type = e.target.dataset.type
    
    if (type === "N04"){
      filterData = data.filter((item)=>item.種類代碼 === "N04")
      e.target.classList.add("active")
      
    } else if ( type === "N05"){
      filterData = data.filter((item) =>item.種類代碼 === "N05")
      e.target.classList.add("active");
     
    } else if ( type === "N06"){
      filterData = data.filter((item) =>item.種類代碼 === "N06")
      e.target.classList.add("active");
      
    }

    renderData(filterData);
  }

  
})


// 步驟三： 搜尋資料
const search = document.querySelector(".search")
const inputCrop = document.querySelector("#crop")

search.addEventListener("click",function(e){

  if (e.target.nodeName === "BUTTON"){

    let keyword = inputCrop.value.trim()

    if ( keyword === "" || keyword === null ){
      alert("請輸入正確資訊")
      return
    }  

    
    filterData = data.filter((item) => {return item.作物名稱.match(keyword)});
      
    
    if (filterData.length === 0) {
      showList.innerHTML = `
      <tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>`;
    } else {
      renderData(filterData);
      keyword = "";
    }
  }
})

//步驟四：排序資料
const select = document.querySelector("#js-select")
const mobileSelect = document.querySelector("#js-mobile-select");

select.addEventListener("change", selectCategory);
// mobileSelect.addEventListener("change", selectCategory);

// select = e.target.value;
// mobileSelect = e.target.value;

function selectCategory(e){
  switch (e.target.value) {
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
      break
  }
}

function selectChange(value) {
  
  filterData.sort((a, b) => {
      return b[value] - a[value];
    });
  
  renderData(filterData)
}




//步驟五：進階排序資料
const sortAdvanced = document.querySelector(".js-sort-advanced");

sortAdvanced.addEventListener("click", function(e){
  if (e.target.nodeName === "I"){
    const sortPrice = e.target.dataset.price
    const sortCaret = e.target.dataset.sort

    if (sortCaret === "up"){
      filterData.sort((a,b)=> {
        return b[sortPrice]-a[sortPrice]
      })
    } else {
      filterData.sort((a,b)=> {
        return a[sortPrice]-b[sortPrice]
      })
    }

    renderData(filterData)
  }
});
