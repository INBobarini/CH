const socket = io() //creates a socket whenever this view is rendered

//DELETE BTN
const deleteBtn = document.querySelector("#deleteBtn")

deleteBtn.addEventListener('click',(event)=>{
    const _id = document.querySelector("#id").value ?? null
    fetch('/realtimeproducts', {
        method: "DELETE",
        body: JSON.stringify({_id}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(res => res.text()).then()
})

//ADD BTN
const addBtn = document.querySelector("#addBtn")
const product = {}
addBtn.addEventListener('click',(event)=>{
    let keys = ["title","description","code","price","thumbnail","stock","status"]//model?
    keys.forEach((e)=>{product[e]=document.querySelector(`#${e}`).value})
    console.log(product)
    fetch('/realtimeproducts', {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(res => res.text()).then()
})

//plantilla parcial y socket o
const divProductsTable = document.querySelector("#productsTable") ?? null

const tableTemplate = 
`<table>
<tbody>
<tr>
    <th>Title</th>
    <th>Description</th>
    <th>Code</th>
    <th>Price</th>
    <th>Thumbnails</th>
    <th>Stock</th>
    <th>Status</th>
    <th>_id</th>
</tr>
{{#each products}}
<tr>
    <td>{{this.title}}</td>
    <td>{{this.description}}</td>
    <td>{{this.code}}</td>
    <td>{{this.price}}</td>
    <td>{{this.thumbnail}}</td>
    <td>{{this.stock}}</td>
    <td>{{this.status}}</td>
    <td>{{this._id}}</td>
</tr>
{{/each}}
</tbody>
</table>`

const compileTemplate = Handlebars.compile(tableTemplate)

socket.on('updateProducts', products =>{
    divProductsTable.innerHTML = compileTemplate({
        products:products
    })
})