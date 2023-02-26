<template>
  <section class="bg-neutral pt-3 m-3 rounded-box">
    <h2 class="text-xl mt-2 text-neutral-content font-bold">Dashboard</h2>
    <div class="divider"></div>
    <ProductNew />
    <ProductList :query="{ query: {
        id_buyer: null,
        id_owner: loggedId
    }}"/>
    <!-- <LoginForm /> -->
  </section>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import ProductNew from '@/components/ProductNew.vue'

export default {
  name: 'Tableau de bord',
  components: {
    ProductList,
    ProductNew
    // 
  },
  setup() {
    const loggedId = localStorage.loggedId

    return { loggedId}
  }
}
</script>
