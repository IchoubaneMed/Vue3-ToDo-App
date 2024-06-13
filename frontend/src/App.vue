<script setup>
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login');
}
</script>


<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login" v-if="!authStore.isAuthenticated">Login</RouterLink>
        <RouterLink to="/signup" v-if="!authStore.isAuthenticated">Signup</RouterLink>
        <button @click="logout" v-if="authStore.isAuthenticated">Logout</button>
      </nav>
    </header>
    <RouterView></RouterView>
    <!-- <div class="welcome">
      <h1>Welcome to the Todo App</h1>
      <p>This is a todo application built with Vue3, Pinia, and Django REST Framework.</p>
    </div> -->
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
header {
  background-color: #4CAF50;
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #d32f2f;
}
.welcome {
  text-align: center;
  padding: 20px;
}
.welcome h1 {
  font-size: 2em;
  margin-bottom: 10px;
}
.welcome p {
  font-size: 1.2em;
}
</style>