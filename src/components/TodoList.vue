<script setup>
import { defineProps, defineEmits } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps({
    todos: Array,
})

const emits = defineEmits(['delete-todo']);

const deleteTodo = (index) => {
    emits('delete-todo', index)
};
</script>



<template>
    <ul class="todo-list">
        <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" @delete-todo="deleteTodo"/>
    </ul>
</template>

<style scoped>
    .todo-list {
        list-style: none;
        padding: 0;
    }
</style>