import { faker } from '@faker-js/faker'
import ProductEntity from '../models/entities/productsEntity.js'

export function createMockProduct(num,page,limit){
    let products = []
    page = page??1
    limit = limit??10
    num = num??100;
    for(let i=1;i<=num;i++){
        products.push(
            new ProductEntity({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                thumbnail: faker.image.url(),
                code: faker.string.alpha(12),
                stock: faker.number.int({max:50})
            })
        )
    }

    let totalPages = Math.ceil(num/limit)
    let result = {
        docs: products.slice(page*limit-limit,page*limit),
        page: page,
        limit: limit,
        totalPages: totalPages,
        hasPrevPage: !(page===1),
        hasNextPage: !(page===totalPages),
        prevPage: page-1,
        nextPage: page+1
    }
    return result
}
