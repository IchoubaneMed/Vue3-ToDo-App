<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const username = ref('');
const email = ref('');
const password = ref('');

const signup = async () => {
    try {
        await authStore.signup({username: username.value, email: email.value, password: password.value});
        toast.success('Signup successful! Welcome!');
        router.push('/');
    } catch(error) {
        console.error(error);
        toast.error('Signup failed. Please check your details and try again.');
    }
}

</script>



<template>
    <div class="signup">
        <h2>Signup</h2>
        <form @submit.prevent="signup">
            <input v-model="username" type="text" placeholder="Username" required/>
            <input v-model="email" type="email" placeholder="Email" required/>
            <input v-model="password" type="password" placeholder="Password" required/>
            <button type="submit">Signup</button>
        </form>
    </div>
</template>

<style scoped>
.signup {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
.signup h2 {
    text-align: center;
    margin-bottom: 20px;
}
.signup form {
    display: flex;
    flex-direction: column;
}
.signup input {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.signup button {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.signup button:hover {
    background-color: #218838;
}
</style>