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
  <form @submit.prevent="handleSubmit">
    <!-- Username -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Adresse email :</span>
      </label> 
      <input type="email" v-model="email" placeholder="example@enseeiht.fr" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    <!-- Name -->
    <div class="sm:flex sm:justify-between">
      <div class="form-control sm:w-1/2 sm:mr-5">
      <label class="label">
        <span class="label-text">Nom :</span>
      </label> 
      <input type="text" v-model="lastName" placeholder="Nom" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    <div class="form-control sm:w-1/2">
      <label class="label">
        <span class="label-text">Prénom :</span>
      </label> 
      <input type="text" v-model="firstname" placeholder="Prénom" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    </div>
    <!-- Password -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Mot de passe :</span>
      </label> 
      <input type="password" v-model="password" placeholder="Mot de passe" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    <!-- Password Confirm -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Confirmation mot de passe :</span>
      </label> 
      <input type="password" v-model="passwordConfirmation" placeholder="Mot de passe" class="input input-accent input-bordered text-accent-content" required>
    </div> 
    <button class="btn btn-accent mt-5">S'inscrire</button> 
    </form>
  </article>
</template>

<script>
import { useAccount } from "@/use/useAccount"

export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      firstname: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      errorLabel: ''
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        mail: this.email,
        password: this.password,
        name: this.lastName,
        firstname: this.firstname,
      }

      // Data existence
      if(!data.firstname ||
        !data.name ||
        !data.mail ||
        !data.password ||
        !this.passwordConfirmation) {
          this.errorLabel = "Absence de données"
          console.log("Absence de données");
          return
        }

      // Data coherence
      if(data.password != this.passwordConfirmation) {
        this.errorLabel = "Les mots de passe ne correspondent pas"
        console.log("passwords not matching")
        return;
      }

      console.log(data)
      this.errorLabel = ''
      const { addAccount } = useAccount()
      addAccount(data)
      window.location.href = '/login'
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
