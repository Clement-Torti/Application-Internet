import { reactive, computed } from "vue"

import app from "@/feathers-client"


const productState = reactive({
    productListReady: false,
    products: {}
})

async function productWithCategories(categories) {

    let categoriseIds = await app.service('categorise').find({query: {
        id_category: {
            $in: categories
        }
    }})
    let products = []
    
    for(const item in categoriseIds) {
        const categorise = categoriseIds[item]
        let product = await app.service('product').find({
            query: {
                id: categorise.id_product
            }
        })

        products.push(product)

    }
 
    return products
}



function productList(categories, logged, userId) {
    productState.productListReady = false
    return computed(() => {
    if (!productState.productListReady) {
        app.service('categorise').find({query: {
            id_category: {
                $in: categories
            }
        }}).then((categoriseIds) => {
            productState.products = []
            for(const item in categoriseIds) {
                const categorise = categoriseIds[item]
                let query = {}

                if(!logged) {
                    query = { query: {
                        id: categorise.id_product,
                        id_buyer: null
                    }}
                } else {
                    query = { query: {
                        id: categorise.id_product,
                        id_buyer: null,
                        id_owner: {
                            $ne: userId
                        }
                    }}
                }
                
                
                app.service('product').find(query).then((product) => {
                    productState.products[product[0].id] = product[0]
                })        
            }
            productState.productListReady = true
        })
        
       return []
    }
    return Object.values(productState.products)
 })
 }

export function useCategorise() {
    return {
        productWithCategories, productList
    }
}

