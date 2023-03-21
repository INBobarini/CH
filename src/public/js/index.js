const socket = io()


const deleteBtn = document.querySelector("#deleteBtn")

deleteBtn.addEventListener('click',(event)=>{
    const id = document.querySelector("#id") ?? null
    console.log(id.value)
    socket.emit('deleteById',id.value)
})

const addBtn = document.querySelector("#addBtn")
const product = {}
addBtn.addEventListener('click',(event)=>{
    
    let keys = ["title","description","code","price","thumbnails","stock","status"]
    keys.forEach((e)=>{product[e]=document.querySelector(`#${e}`).value})
    console.log(product)
    socket.emit('addProduct',product)
})

//plantilla parcial y socket o
const divProductsTable = document.querySelector("#productsTable") ?? null

const tableTemplate = 
`<table>
<tbody>
<tr>
    <th>Id</th>
    <th>Title</th>
    <th>Description</th>
    <th>Code</th>
    <th>Price</th>
    <th>Thumbnails</th>
    <th>Stock</th>
    <th>Status</th>
</tr>
{{#each products}}
<tr>
    <td>{{this.id}}</td>
    <td>{{this.title}}</td>
    <td>{{this.description}}</td>
    <td>{{this.code}}</td>
    <td>{{this.price}}</td>
    <td>{{this.thumbnail}}</td>
    <td>{{this.stock}}</td>
    <td>{{this.status}}</td>
</tr>
{{/each}}
</tbody>
</table>`

const compileTemplate = Handlebars.compile(tableTemplate)

socket.on('updateProducts',data=>{
    
    divProductsTable.innerHTML = compileTemplate({
        products:data.products
    })
})

