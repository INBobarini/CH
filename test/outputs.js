let outputs = {}

//PRODUCTS
outputs.products = {}
outputs.products.getMany = {
    "status": 200,
    "payload": [
        {
            "_id": "64e4f6edc9f774015f04eaa1",
            "title": "Silla de madera",
            "description": "Guatambú",
            "code": "587fe69ge",
            "price": 5000,
            "thumbnail": [
                "chair.jpeg"
            ],
            "stock": 10,
            "status": true,
            "owner": "admin"
        }
    ],
    "totalPages": 1,
    "prevPage": null,
    "nextPage": null,
    "page": 1,
    "hasPrevPage": null,
    "hasNextPage": null,
    "prevLink": null,
    "nextLink": null,
    "limit": 10
}

outputs.products.postSingle = {
    "title": "Silla de madera",
    "description": "Guatambú",
    "code": "587fe69ge",
    "price": 5000,
    "thumbnail": [
        "chair.jpeg"
    ],
    "stock": 10,
    "status": true,
    "owner": "admin",
    "_id": "64e4ea67c9f774015f04ea9f"
}

export {outputs}
