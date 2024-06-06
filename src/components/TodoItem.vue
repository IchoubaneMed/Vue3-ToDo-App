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

<style scoped>
.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
}

.todo-item button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
}

.todo-item button:hover {
    background-color: #c0392b;
}
</style>