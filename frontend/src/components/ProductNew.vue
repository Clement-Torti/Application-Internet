<template>
  <article class="flex justify-end mr-5">
    <label for="new-product-modal" class="btn btn-accent">
      Ajouter un nouveau produit
    </label>
    <input type="checkbox" id="new-product-modal" class="modal-toggle">   
    <div class="modal">
      <div class="modal-box">
        <!-- Titre -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nom de l'article</span>
          </label> 
          <input v-model="label" type="text" placeholder="Nom de l'article" class="input input-accent input-bordered text-accent-content" required>
        </div> 
        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Description de l'article</span>
          </label> 
          <textarea v-model="description" class="textarea h-24 textarea-bordered textarea-accent text-accent-content" placeholder="Description..." required></textarea>
        </div>
        <!-- Prix -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Prix (en euros)</span>
          </label> 
          <label class="input-group">
            <input v-model="price" type="text" placeholder="9,99" class="input input-accent input-bordered text-accent-content" pattern="^\d+(.\d{1,2})?$" required>
            <span class="bg-accent text-accent-content font-bold">EUR</span>
          </label>
        </div>
        <!-- Categories -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Catégorie de l'article</span>
          </label> 
          <select v-model="selectCategories" class="select select-bordered select-accent text-accent-content w-full " multiple>
            <option v-for="category in categoryList" :key="category" :value="category.id">{{ category.label }}</option> 
          </select>       
        </div>
        
        <div class="modal-action flex justify-around">
          <label @click="handleCreate" for="new-product-modal" class="btn btn-accent">Ajouter l'article</label> 
          <label for="new-product-modal" class="btn btn-danger">Fermer</label>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { useProduct } from '@/use/useProduct'
import { useCategory } from '@/use/useCategory'

export default {
  name: 'ProductList',
  data() {
    return {
      label: '',
      price: '',
      description: '',
      selectCategories: [],
    }
  },
  setup() {
    const { categoryList } = useCategory()
    return { categoryList }
  },
  methods: {
    handleCreate() {
      console.log(this.selectCategories)
      
      // Data existence
      if(!this.label ||
      !this.price||
      !this.description) {
        return;
      }

      const data = {
        price: parseFloat(this.price),
        description: this.description,
        label: this.label,
        id_owner: localStorage.loggedId
      }

      
      
      const { addProduct } = useProduct()
      addProduct(data, this.selectCategories)
      this.price = ''
      this.description = ''
      this.label = ''
      this.selectCategories = []
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  height: 6rem;
}
</style>
