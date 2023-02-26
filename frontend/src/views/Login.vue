<template>
  <div class="flex justify-center">
    <section class="bg-neutral pt-3 m-3 rounded-box w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h2 class="text-4xl mt-2 text-neutral-content">Connexion</h2>
        <div class="divider"></div> 
        <LoginForm />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>
