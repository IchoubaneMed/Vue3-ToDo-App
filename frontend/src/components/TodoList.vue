<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTodosStore } from '@/stores/todos';
import TodoItem from './TodoItem.vue';

const todosStore = useTodosStore();

const newTodoTitle = ref('');
const newTodoDescription = ref('');
const newTodoDueDate = ref('');
const newTodoPriority = ref('medium');
const newTodoCategory = ref(null);

const todos = computed(() => todosStore.getTodos);
const categories = computed(() => todosStore.getCategories);

const addTodo = async () => {
    try {
        await todosStore.addTodo({
            title: newTodoTitle.value,
            description: newTodoDescription.value,
            due_date: newTodoDueDate.value,
            completed: false,
            priority: newTodoPriority.value,
            category_id: newTodoCategory.value,
        });
        newTodoTitle.value = '';
        newTodoDescription.value = '';
        newTodoDueDate.value = '';
        newTodoPriority.value = 'medium';
        newTodoCategory.value = null;
    } catch(error) {
        console.error(error)
    }
}

const updateTodo = async (updatedTodo) => {
    try {
        await todosStore.updateTodo(updatedTodo);
    } catch(error) {
        console.error(error)
    }
}

const deleteTodo = async (todoId) => {
    try {
        await todosStore.deleteTodo(todoId);
    } catch(error) {
        console.error(error)
    }
}

onMounted(async () => {
    try {
        await todosStore.fetchTodos();
        await todosStore.fetchCategories();
    } catch(error) {
        console.error(error);
    }
});
</script>



<template>
    <div class="todo-list">
        <h2>Create a New Todo</h2>
        <form @submit.prevent="addTodo">
            <div class="form-group">
                <label for="title">Title</label>
                <input id="title" v-model="newTodoTitle" type="text" placeholder="Title" required/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="newTodoDescription" placeholder="Description"></textarea>
            </div>
            <div class="form-group">
                <label for="due_date">Due Date</label>
                <input id="due_date" v-model="newTodoDueDate" type="date"/>
            </div>
            <div class="form-group">
                <label for="priority">Priority</label>
                <select id="priority" v-model="newTodoPriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" v-model="newTodoCategory">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <button type="submit">Add Todo</button>
        </form>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <TodoItem :todo="todo" @update="updateTodo" @delete="deleteTodo"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
.todo-list h2 {
    text-align: center;
    margin-bottom: 20px;
}
.form-group {
    margin-bottom: 15px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}
.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #218838;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin-bottom: 10px;
}
</style>