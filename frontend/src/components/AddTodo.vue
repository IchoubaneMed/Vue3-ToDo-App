<script setup>
import { ref } from 'vue';

const newTodo = ref('');
const emits = defineEmits(['add-todo']);

const submitTodo = () => {
    if (newTodo.value.trim() !== '') {
        emits('add-todo', newTodo.value);
        newTodo.value = '';
    }
};


</script>


<template>
    <div class="add-todo">
        <input v-model="newTodo" @keyup.enter="submitTodo" placeholder="Add a new todo" />
        <button @click="submitTodo">Add</button>
    </div>
</template>

<style>
.add-todo {
    display: flex;
    margin-bottom: 1rem;
}

.add-todo input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-todo button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-left: 0.5rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-todo button:hover {
    background-color: #38a373;
}
</style>