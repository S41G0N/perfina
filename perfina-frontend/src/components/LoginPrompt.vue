<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Sign In
        </button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
      </div>

      <div class="mt-4 text-center">
        <router-link
          :to="{ name: 'Register' }"
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          No Account Yet? Register Here!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user_store'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const userStore = useUserStore()

const handleSubmit = async () => {
  try {
    const response = await userStore.login({
      username: email.value,
      password: password.value,
    })

    // Clear the form
    email.value = ''
    password.value = ''

    if (response.status == 200) {
      // Redirect to a protected route (e.g., dashboard)
      router.push({ name: 'Dashboard' })
    }
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.'
    console.error(err)
  }
}
</script>
