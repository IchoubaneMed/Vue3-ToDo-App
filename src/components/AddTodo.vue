<script setup>
import { ref, defineEmits } from 'vue';

const newTodo = ref('');
const emits = defineEmits(['add-todo']);

const submitTodo = () => {
    if(newTodo.value.trim() !== '') {
        emits('add-todo', newTodo.value);
        newTodo.value = '';
    }
};


</script>


<template>
    <div class="add-todo">
        <input v-model="newTodo" @keyup.enter="submitTodo" placeholder="Add a new todo"/>
        <button @click="submitTodo">Add</button>
    </div>
</template>