<template>
  <article>
    <div class="form-control mx-5 mb-5" v-for="category in categoryList" :key="category.id">
      <label class="cursor-pointer label">
        <span class="label-text">{{ category.label }}</span> 
        <input @change="handleCategory()" v-model="checkboxs[category.id]"  checked id="category" :value="category.id" type="checkbox" class="checkbox checkbox-accent">
      </label>
   </div>
  </article>
</template>

<script>
import { useCategory } from "@/use/useCategory"

export default {
  name: 'FiltersCategory',
  emits: [
      'categoriesChanged',
  ],
  data() {
    return {
      checkboxs: {},
      selectedCategories: {}
    }
  },
  methods: {
    handleCategory() {
      this.$emit('categoriesChanged', this.actualCheckbox)
    }
  },
  computed:{
    actualCheckbox(){
      const res = {};
      this.categoryList.forEach(element => {
        if(this.checkboxs[element.id]!=undefined) res[element.id] = this.checkboxs[element.id];
        else res[element.id] = true;
      });
      return res;
    }
  },
  setup() {
    const { categoryList } = useCategory()
    return { categoryList }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
