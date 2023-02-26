import { reactive, computed } from "vue"

import app from "@/feathers-client"


const productState = reactive({
   productListReady: false,
   productsHome: {
      ListReady: false,
      listProducts: {}
   },
   productsDashboard: {
      ListReady: false,
      listProducts: {}
   },
   productsCart: {
      ListReady: false,
      listProducts: {}
   },
})

const productSumState = reactive({
   totalReady: false,
   total: 0.0,
})




function setBuyer(product, idAccount) {
   const newProduct = product
   newProduct.id_buyer = idAccount
   app.service('product').update(product.id, newProduct).then(() => {
      productState.productsHome.ListReady = false
      productState.productsCart.ListReady = false
   })
}



function productList(query, productListName) {
   return computed(() => {
   if (!productState[productListName].ListReady) {
    app.service('product').find(query).then(list => {
      productState[productListName].listProducts = []
         list.forEach(item => { productState[productListName].listProducts[item.id] = item })
         productState[productListName].ListReady = true
      })
      return []
   }
   return Object.values(productState[productListName].listProducts)
})
}


async function productListAsync(query) {
   let tmpList = await app.service('product').find(query)
   let list = []
   
   tmpList.forEach(item => { list[item.id-1] = item })

   return list
}


function productSum(query) {
   return computed(() => {
   if (!productSumState.totalReady) {
    app.service('product').find(query).then(list => {
         list.forEach(item => { productSumState.total = parseFloat(productSumState.total) + parseFloat(item.price) })
         productSumState.totalReady = true
      })
      return 0
   }
   return productSumState.total
})
}


async function productSumAsync(query) {
   let sum = 0.0
   const list = await app.service('product').find(query)
   list.forEach(item => { sum = parseFloat(sum) + parseFloat(item.price)})

   return sum
}

const addProduct = (data, selectedCategories) => {
   app.service('product').create(data).then((product) => {
      productState.productsDashboard.ListReady = false
      console.log(product)
      // Ajout des categories
      for(let index in selectedCategories) {
         const dataCategorise = {
            id_category: selectedCategories[index],
            id_product: product.id
         }
         app.service('categorise').create(dataCategorise)
      }
   })
}

function removeProduct(idProduct) {
   app.service('categorise').find({query: {
      id_product: idProduct
   }}).then(list => {
      list.forEach(item => {
         app.service('categorise').remove(item.id)
      })

      app.service('product').remove(idProduct).then(() => {
         productState.productsDashboard.ListReady = false
         productState.productsCart.ListReady = false
      }) 
   })
   
}

export function useProduct() {
    return {
        productList, productListAsync,
        addProduct, removeProduct,
        productSum, productSumAsync,
        setBuyer,
    }
}
