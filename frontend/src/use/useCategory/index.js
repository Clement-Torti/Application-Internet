import { reactive, computed } from "vue"

import app from "@/feathers-client"


const categoryState = reactive({
   categoryListReady: false,
   categories: {},
})

const categoryList = computed(() => {
   if (!categoryState.categoryListReady) {
    app.service('category').find({}).then(list => {
         list.forEach(item => { categoryState.categories[item.id] = item })
         categoryState.categoryListReady = true
      })
      return []
   }
   return Object.values(categoryState.categories)
})

export function useCategory() {
    return {
        categoryList
    }
}
