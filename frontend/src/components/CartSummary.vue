<template>
  <article class="flex flex-col items-start p-3 text-neutral-content w-full">
    <ul class="flex flex-col items-start list-disc px-3 w-full">
      <li v-for="product in list" :key="product.id" class="w-full">
        <div class="flex justify-between">
          <span class="truncate text-left font-bold w-2/3">{{ product.label }}</span>
          <span class="text-right w-1/3">{{ product.price }} €</span>
        </div>
      </li>
    </ul>
    <div class="w-full divider"></div>
    <div class="flex justify-between w-full px-3">
      <span>Prix total :</span>
      <span>{{ total }} €</span>      
    </div>
    <div class="flex justify-between w-full px-3">
      <span>Solde actuel :</span>
      <span>{{ solde }} €</span>      
    </div>
    <div class="flex justify-between w-full px-3 font-bold">
      <span>Solde final :</span>
      <span>{{ solde-total }} €</span>      
    </div>
    <div class="w-full flex flex-col items-end mt-5">
      <BalanceAdd />
      <button @click="handleOrder" class="btn btn-md btn-accent mt-3">Commander</button>
    </div>
  </article>
</template>

<script>
import BalanceAdd from '@/components/BalanceAdd.vue'
import { useProduct } from "@/use/useProduct"
import { useAccount } from "@/use/useAccount"

export default {
  name: 'CartSummary',
  components: {
    BalanceAdd,
  },
  methods: {
    handleOrder() {
      const { productSumAsync, productListAsync, removeProduct } = useProduct()
      const { changeByAmount } = useAccount()

      // Quelle somme doit payer l'utilisateur
      productSumAsync({ query: {
        id_buyer: localStorage.loggedId,
      }}).then(sum => {
        // Diminuer la balance de l'utilisateur
        const amount = parseFloat(sum) * -1
        localStorage.loggedBalance = parseFloat(localStorage.loggedBalance) + parseFloat(amount) 
        changeByAmount(localStorage.loggedId, amount)

        // Recuperer les produits du panier
        productListAsync({ query: {
          id_buyer: localStorage.loggedId,
        }}).then(list => {

          // Pour chaque produit
          list.forEach(item => {

            // Donner l'argent au proprietaire
            changeByAmount(item.id_owner, item.price)

            // Supprimer le produit
            removeProduct(item.id)
          
          })
        })
      })


    }
  },
  setup() {
  const { productList, productSum } = useProduct()
  
  const list = productList({ query: {
    id_buyer: localStorage.loggedId,
  }}, "productsCart")

  const total = productSum({ query: {
    id_buyer: localStorage.loggedId,
  }})

  const solde = localStorage.loggedBalance

  return { list, total, solde}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
