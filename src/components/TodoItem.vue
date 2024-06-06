<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    todo: String,
});

const emit = defineEmits(['delete-todo']);

const deleteTodo = () => {
    emits('delete-todo');
};

</script>


<template>
    <li class="todo-item">
        {{ todo }}
        <button @click="deleteTodo">Delete</button>
    </li>
</template>