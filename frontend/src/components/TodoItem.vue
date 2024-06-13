<script setup>
import { toRefs } from 'vue';
import { useTodosStore } from '@/stores/todos';

const props = defineProps({
    todo: Object,
})
const { todo } = toRefs(props);
const todosStore = useTodosStore();

const updateTodo = async () => {
    try {
        await todosStore.updateTodo({ ...todo.value, completed: todo.value.completed });
    } catch (error) {
        console.error(error);
    }
}

const deleteTodo = async () => {
    try {
        await todosStore.deleteTodo(todo.value.id);
    } catch (error) {
        console.error(error);
    }
}

</script>


<template>
    <div class="todo-item">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="deleteTodo">Delete</button>
    </div>
</template>

<style scoped>
.todo-item {
    color: #000;
}

.completed {
    text-decoration: line-through;
}
</style>