<template>
  <div>
    <div class="flex flex-col md:flex-row">
      <section class="bg-neutral pt-3 m-3 rounded-box md:w-2/3 lg:w-3/4 order-last md:order-first">
        <h2 class="text-xl mt-2 text-neutral-content font-bold">Produits dans le panier</h2>
        <div class="divider"></div>
        <ProductListCart :query="{ query: {
        id_buyer: loggedId,
        }}"/>
      </section>
      <aside class="bg-neutral pt-3 m-3 rounded-box md:w-1/3 lg:w-1/4">
        <h2 class="text-xl mt-2 text-neutral-content font-bold">Résumé</h2>
        <div class="divider"></div>
        <CartSummary />
      </aside>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductListCart from '@/components/ProductListCart.vue'
import CartSummary from '@/components/CartSummary.vue'

export default {
  name: 'Cart',
  components: {
    ProductListCart,
    CartSummary,
  },

  setup() {
    const loggedId = localStorage.loggedId

    return {loggedId}
  }
}
</script>
