<template>
  <article class="sm:flex sm:flex-wrap p-3">
    <!-- Exemple article 1 -->
    <div class="sm:px-1 sm:w-1/2 lg:w-1/3 xl:w-1/4" v-for="product in list" :key="product.id">
      <div class="card bordered mb-3">
        <div class="card-body bg-neutral-content">
          <div class="flex flex-col items-start justify-between">
            <h3 class="card-title mb-0">{{product.label}}</h3> 
            <p class="mb-3">{{product.price}}€</p>
          </div>
            <p class="text-justify truncate">{{product.description}}</p> 
          <div class="card-actions flex justify-around items-center sm:justify-end">
            <button v-if="logged" @click="handleCart(product)" class="btn btn-sm btn-accent">Ajouter au panier</button>
          </div>
        </div>
      </div> 
    </div>
  </article>
</template>


<script>
import { useProduct } from "@/use/useProduct"
import { useCategorise } from "@/use/useCategorise"

export default {
  name: 'ProductCardsList',
  props: {
    categories: Object
  },
  watch: {
    categories(categories) {
      // Get all product Id with a category id in the list
      let categoryIds = []
      for (const category in categories) {
        if(categories[category]) {
          categoryIds.push(parseInt(category))
        }
      }
      this.updateProducts(categoryIds, this.logged, localStorage.loggedId)
    },
  },
  methods: {
    handleCart(product) {
      const { setBuyer } = useProduct()

      setBuyer(product, localStorage.loggedId)
    },
    async updateProducts(categories, logged, userId) {
      const { productList } = useCategorise()

      this.list = productList(categories, logged, userId)

    }
  },
  setup() {

    // Load products
    const logged = localStorage.logged == "true"
    const { productList } = useProduct()

    let list = []
    if(localStorage.loggedId != "null") {
      list = productList({ query: {
        id_buyer: null,
        id_owner: {
          $ne: localStorage.loggedId
        }
      }}, "productsHome")
    } else  {
      list = productList({ query: {
        id_buyer: null,
      }}, "productsHome")
    }


    return { list, logged }
  }
}
</script>

<style scoped>

</style>
