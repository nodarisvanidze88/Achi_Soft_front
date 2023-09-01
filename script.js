
    const csvFileInput = document.getElementById("csvFileInput");
    const uploadButton = document.getElementById("uploadButton");
    let table1 = document.getElementById('lst')

    uploadButton.addEventListener("click", async () => {
        const file = csvFileInput.files[0];
        if (!file) {
            alert("Please select a CSV file.");
            return;
        }

        // Read the file content as text
        const fileReader = new FileReader();
        fileReader.onload = async function (event) {
            const fileContent = event.target.result;

            // Log the file content as JSON (assuming CSV content can be parsed as JSON)
            try {
                const jsonData = JSON.parse(fileContent);
                console.log(jsonData);
            } catch (error) {
                // If the file content cannot be parsed as JSON, log it as plain text
                console.log(fileContent[0]);
            }

            // Create and send the FormData with the file
            const formData = new FormData();
            formData.append("csv_file", file);

            try {
                const response = await fetch("https://achiapp--nodarsvanidze.repl.co/fi/test", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                  getAllItems()
                  csvFileInput.value = ""
                    alert("CSV file uploaded successfully!");
                } else {
                    alert("Failed to upload CSV file.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while uploading the CSV file.");
            }
        };

        // Read the file as text
        fileReader.readAsText(file);
      
    });
async function getAllItems(){
  const allItems = await fetch('https://achiapp--nodarsvanidze.repl.co/fi/allItems')
  const data = await allItems.json()
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
  </tr>
  </thead>`;
  for (let i of data){
    htmlTableContent += tableContent(i)
    console.log(htmlTableContent)
  }

  table1.innerHTML = htmlTableContent

}

function tableContent(items){
  return ` <tr>
    <th class="column1">${items.code}</th>
    <th class="column2">${items.product_id}</th>
    <th class="column3">${items.item_name}</th>
    <th class="column4">${items.category_name}</th>
    <th class="column5">${items.dimention}</th>
    <th class="column6">${items.warehouse}</th>
    <th class="column7">${items.qty_in_wh}</th>
    <th class="column8">${items.price}</th>
  </tr>`
}
getAllItems()