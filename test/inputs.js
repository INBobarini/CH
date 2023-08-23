const inputs = {}

//PRODUCTS
inputs.singleProduct = {}
//SINGLE PRODUCTS
inputs.singleProduct.ok = {
	"title": "Silla de madera",
	"description": "Guatambú",
	"code": "587fe69ge",
	"price": 5000,
	"stock": 10,
	"status": true,
    "thumbnail": "chair.jpeg",
}

inputs.singleProduct.wrongPriceFormat = {
	"title": "Silla de madera",
	"description": "Guatambú",
	"code": "587fe69ge",
	"price": "a string not a number",
	"stock": 10,
	"status": true,
    "thumbnail": "chair.jpeg"
}
inputs.manyProducts = {}
//MULTIPLE PRODUCTS
inputs.manyProducts.ok = [
	{
	"title": "Mesa de comedor",
	"description": "Madera maciza",
	"code": "843he59jd",
	"price": 100,
	"stock": 3,
	"status": true,
	"thumbnail": [
		"dining_table.jpeg"
	],
	"owner": "admin"
	},
	{
	"title": "Sofá de cuero",
	"description": "Piel de vaca",
	"code": "5f8d2fj2e",
	"price": 15000,
	"stock": 3,
	"status": true,
	"thumbnail": [
		"leather_sofa.jpeg"
	],
	"owner": "admin"
	},
	{
	"title": "Lámpara de techo",
	"description": "Estilo moderno",
	"code": "34k9cjd83",
	"price": 3500,
	"stock": 6,
	"status": true,
	"thumbnail": [
		"ceiling_lamp.jpeg"
	],
	"owner": "admin"
	},
	{
	"title": "Escritorio de madera",
	"description": "Roble americano",
	"code": "84g3hc9j4",
	"price": 8000,
	"stock": 3,
	"status": true,
	"thumbnail": "wooden_desk.jpeg"
	},
	{
	"title": "Estantería de metal",
	"description": "Negra mate",
	"code": "7d3h4f93h",
	"price": 5000,
	"stock": 5,
	"status": true,
	"thumbnail": "metal_shelf.jpeg"
	},
	{
	"title": "Cama de matrimonio",
	"description": "Cabecero de cuero",
	"code": "k23kd92j2",
	"price": 18000,
	"stock": 0,
	"status": true,
	"thumbnail": "double_bed.jpeg"
	},
	{
	"title": "Mesa de centro",
	"description": "Estilo escandinavo",
	"code": "j92hd38f3",
	"price": 6000,
	"stock": 3,
	"status": true,
	"thumbnail": [
		"coffee_table.jpeg"
	],
	"owner": "admin"
	},
	{
	"title": "Silla de oficina",
	"description": "Ergonómica",
	"code": "48j3n8f3n",
	"price": 8000,
	"stock": 1,
	"status": true,
	"thumbnail": "office_chair.jpeg"
	},
	{
	"title": "Silla de oficina",
	"description": "Ergonómica",
	"code": "48j3n8f3n",
	"price": 8000,
	"stock": 1,
	"status": true,
	"thumbnail": "office_chair.jpeg"
	},
	{
	"code": "B6A9C4D2",
	"title": "Table Lamp",
	"description": "Modern table lamp with adjustable brightness",
	"price": 500,
	"stock": 7,
	"status": true,
	"thumbnail": "table_lamp.jpg"
	},
	{
	"code": "F3E8G5H2",
	"title": "Bluetooth Speaker",
	"description": "Wireless speaker with rich sound quality",
	"price": 1000,
	"stock": 8,
	"status": true,
	"thumbnail": "bluetooth_speaker.jpg"
	},
	{
	"code": "K9R6U2Q3",
	"title": "Smart TV",
	"description": "High-definition smart TV with built-in streaming apps",
	"price": 20000,
	"stock": 2,
	"status": true,
	"thumbnail": "smart_tv.jpg"
	},
	{
	"code": "M5N8B2V9",
	"title": "Coffee Maker",
	"description": "Programmable coffee maker with multiple brewing options",
	"price": 1500,
	"stock": 5,
	"status": true,
	"thumbnail": "coffee_maker.jpg"
	},
	{
	"code": "P2L9W5T6",
	"title": "Gaming Mouse",
	"description": "High-precision gaming mouse with customizable buttons",
	"price": 800,
	"stock": 12,
	"status": true,
	"thumbnail": "gaming_mouse.jpg"
	},
	{
	"title": "Silla de madera",
	"description": "Guatambú",
	"code": "587fe69ge",
	"price": 5000,
	"thumbnail": "chair.jpeg",
	"stock": 10,
	"status": true,
	"owner": "admin"
	}
]

export {inputs}
