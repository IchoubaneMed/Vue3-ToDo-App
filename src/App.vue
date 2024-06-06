<script setup>
import { ref } from 'vue';

import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

import { useToast } from 'vue-toastification';

const todos = ref([]);
const toast = useToast();

const AddTodo = (todo) => {
  todo.value.push(todo);
  toast.success('Todo added!');
};

const deleteTodo = (index) => {
  todos.value.splice(index, 1);
  toast.error('Todo deleted!');
}

</script>


<template>
  <header>
    <h1>Vue 3 ToDo App</h1>
  </header>
  <main>
    <AddTodo @add-todo="AddTodo" />
    <TodoList :todos="todos" @delete-todo="deleteTodo"/>
  </main>
</template>