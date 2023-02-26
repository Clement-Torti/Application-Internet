<template>
  <article class="p-3">
    <!-- Exemple article 1 -->
    <div v-for="product in list" :key="product.id" class="card bordered mb-3" >
      <div class="flex p-3 justify-between bg-neutral-content">
        <div class="flex flex-col items-start justify-center">
          <h3 class="text-left text-md font-bold">{{ product.label }}</h3>
          <p>{{ product.price }} €</p>
        </div>
        <div class="flex flex-col items-start sm:flex-row sm:items-center">
          <button @click="removeP(product.id)" class="btn btn-sm btn-danger ml-3 mt-2 sm:mt-0">Supprimer</button>
        </div>
      </div>
    </div> 
  </article>
</template>


<script>
import { useProduct } from "@/use/useProduct"

export default {
  name: 'ProductList',
  props: {
    query : Object,
  },
  methods: {
    removeP(idProduct) {
      console.log(idProduct)
      const { removeProduct } = useProduct()
      removeProduct(idProduct)
    }
  },
  setup(props) {
    const { productList } = useProduct()

    console.log(props.query)
    
    const list = productList(props.query, "productsDashboard")

    return { list }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
