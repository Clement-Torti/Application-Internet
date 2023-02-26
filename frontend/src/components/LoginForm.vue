<template>
  <article class="p-4">
    <div v-if="errorLabel" class="alert alert-warning">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"> 
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>                         
        </svg> 
        <label>{{errorLabel}}</label>
      </div>
    </div>
    <form @submit.prevent="handleLogin">
    <!-- Username -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Adresse email :</span>
      </label> 
      <input type="email" v-model="email" placeholder="example@enseeiht.fr" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    <!-- Password -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Mot de passe :</span>
      </label> 
      <input type="password" v-model="password" placeholder="password" class="input input-accent input-bordered text-accent-content" required>
    </div>
    <button class="btn btn-accent mt-5">Se connecter</button> 
    </form>
  </article>
</template>

<script>
import { useAccount } from "@/use/useAccount"

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errorLabel: ''
    }
  },

 methods: {
    handleLogin() {
      const data = {
        mail: this.email,
        password: this.password,
      }

      // Data existence
      if(!data.mail ||
        !data.password) {
          this.errorLabel = "Absence de données"
          console.log("Absence de données");
          return
      }


      this.errorLabel = ''
      const { accountExist } = useAccount()
      // Persistence de l'id
      accountExist(data.mail, data.password).then(account => {
        if(account.id == -1) {
          localStorage.logged = false
          localStorage.loggedName = null
          localStorage.loggedId = null
          localStorage.loggedEmail = null
          localStorage.loggedBalance = null
          this.errorLabel = "Email ou mot de passe incorrect."
        } else {
          localStorage.logged = true
          localStorage.loggedName = account.firstname
          localStorage.loggedId = account.id
          localStorage.loggedEmail = account.mail
          localStorage.loggedBalance = account.account_balance
          window.location.href = '/'
        }
      })
    }
 }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
