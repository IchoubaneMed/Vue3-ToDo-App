<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';


const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const username = ref('');
const password = ref('');

const login = async () => {
    try {
        await authStore.login({ username: username.value, password: password.value });
        toast.success('Successfully logged in!');
        router.push('/');
    } catch (error) {
        console.error(error);
        toast.error('Login failed. Please check your credentials.');
    }

}

</script>


<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login form {
    display: flex;
    flex-direction: column;
}
.login input {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.login button {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.login button:hover{
    background-color: #0056b3;
}
</style>