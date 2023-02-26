<template>
  <article class="flex justify-end">
  <label for="balance-add-modal" class="btn btn-sm btn-info text-accent-content">
    Ajouter solde
  </label>
    <input type="checkbox" id="balance-add-modal" class="modal-toggle">   
    <div class="modal">
      <div class="modal-box">
        <!-- Ajout solde -->
        <div class="form-control">
          <label class="input-group">
            <input v-model="amount" type="text" placeholder="9,99" class="input input-accent input-bordered text-accent-content" pattern="^\d+(.\d{1,2})?$" required>
            <span class="bg-accent text-accent-content font-bold">EUR</span>
          </label>
        </div>
        <ul>
          <li></li>
        </ul>
        <div class="modal-action flex justify-around">
          <label @click="addToBalance(amount)" for="balance-add-modal" class="btn btn-accent">Ajouter au solde</label> 
          <label for="balance-add-modal" class="btn btn-danger">Fermer</label>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { useAccount } from '@/use/useAccount'

export default {
  name: 'BalanceAdd',
  methods: {
    addToBalance(amount) {
      const { changeByAmount } = useAccount()
      console.log(typeof(localStorage.loggedBalance))
      console.log(typeof(amount))
      localStorage.loggedBalance = parseFloat(localStorage.loggedBalance) + parseFloat(amount) 
      changeByAmount(localStorage.loggedId, amount)
    }
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
