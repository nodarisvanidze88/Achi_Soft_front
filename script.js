let table1 = document.getElementById('lst')

async function getAllItems(){
  const trigerData = await fetch('https://achiapp--nodarsvanidze.repl.co/fi/test')
  const allItems = await fetch('https://achiapp--nodarsvanidze.repl.co/fi/allItems')
  const data = await allItems.json()
  console.log(data)
  let htmlTableContent = `<thead class="tablehead">
  <tr class='table100-head'>
    <th class="column1">შტრიხკოდი</th>
    <th class="column2">შიდა კოდი</th>
    <th class="column3">დასახელება</th>
    <th class="column4">კატეგორია</th>
    <th class="column5">ზ/ე</th>
    <th class="column6">საწყობი</th>
    <th class="column7">ნაშთი</th>
    <th class="column8">ფასი</th>
    <th class="column9">ღირებულება</th>
    <th class="column10">ფოტო</th>
  </tr>
  </thead>`;
  for (let i of data){
    htmlTableContent += tableContent(i)
  }
  table1.innerHTML = htmlTableContent
}

function tableContent(items){
  let withImages;
  console.log(items.image_urel)
  if (items.image_urel != ""){
    withImages = 
      ` <tr>
      <th class="column1">${items.code}</th>
      <th class="column2">${items.product_id}</th>
      <th class="column3">${items.item_name}</th>
      <th class="column4">${items.category_name}</th>
      <th class="column5">${items.dimention}</th>
      <th class="column6">${items.warehouse}</th>
      <th class="column7">${items.qty_in_wh}</th>
      <th class="column8">${Math.round(items.price).toFixed(2)}</th>
      <th class="column9">${Math.round(items.qty_in_wh*items.price).toFixed(2)}</th>
      <th class="column10">
      <a href="${items.image_urel}"><img src="${items.image_urel}" alt="img" width="50" height="50">
      </a></th>
      </tr>`   
  }else {
    withImages =
      ` <tr>
      <th class="column1">${items.code}</th>
      <th class="column2">${items.product_id}</th>
      <th class="column3">${items.item_name}</th>
      <th class="column4">${items.category_name}</th>
      <th class="column5">${items.dimention}</th>
      <th class="column6">${items.warehouse}</th>
      <th class="column7">${items.qty_in_wh}</th>
      <th class="column8">${Math.round(items.price).toFixed(2)}</th>
      <th class="column9">${Math.round(items.qty_in_wh*items.price).toFixed(2)}</th>
      <th class="column10"></th>
      </tr>`
  }
  return withImages
}
getAllItems()