<template>
  <div class="md:flex">
    <aside class="bg-neutral pt-3 m-3 rounded-box md:w-1/3 lg:w-1/4">
      <h2 class="text-xl mt-2 text-neutral-content font-bold">Catégories</h2>
      <div class="divider"></div>
      <FiltersCategory @categoriesChanged="categoriesChanged"/>
    </aside>
    <section class="bg-neutral pt-3 m-3 rounded-box md:w-2/3 lg:w-3/4">
      <h2 class="text-xl mt-2 text-neutral-content font-bold">Listes des produits</h2>
      <div class="divider"></div>
      <ProductCardsList :categories="categories"/>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import FiltersCategory from '@/components/FiltersCategory.vue'
import ProductCardsList from '@/components/ProductCardsList.vue'

export default {
  name: 'Accueil',
  components: {
    FiltersCategory,
    ProductCardsList
  },
  data() {
    return {
      categories: {}
    }
  },
  methods: {
    categoriesChanged(newCategories) {
      this.categories = newCategories
    }
  },
  setup() {
    console.log("Home")
  }
}
</script>

