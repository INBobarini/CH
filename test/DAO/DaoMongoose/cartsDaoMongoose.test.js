// read, todos los productos del carrito
// create, add product to cart
// read, cart format {product, quantity}
// create, case a product is already there +1 to quantity
// delete para elminar un producto del carrito
// update recibe arreglo de producto-cantidad
// update actualiza solo la cantidad de ejemplares del producto
// delete para eliminar todos los productos del carrito
// verificar el populate...
// verificar paginacion
// verificar cart purchase: (test integracion)
// 
//

// FALTA VISTA




//---DB---
// db "ecommerce"
// collecciones carts messages products, schemas iguales
// carpeta models en dao, ahi van los schemas

//limit,page,query,sort tests
//get debe retornar:
/*
{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
//buscar productos por categoria o disponibilidad(status), sort por precio
*/
