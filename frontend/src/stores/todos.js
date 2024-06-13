import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "./auth";

const toast = useToast();

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
    categories: [],
  }),
  actions: {
    async fetchTodos() {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        const response = await axios.get("/api/todos/");
        this.todos = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
        toast.error("Error fetching todos");
      }
    },
    async addTodo(todo) {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        const response = await axios.post("/api/todos/", todo);
        this.todos.push(response.data);
      } catch (error) {
        console.error("Error adding todo:", error.response);
        toast.error("Error adding todo");
      }
    },
    async updateTodo(todo) {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        // Transform the todo object to send category_id instead of category object
        const transformedTodo = {
            ...todo,
            category_id: todo.category.id,
        }
        // Remove the category object from the transformedTodo
        delete transformedTodo.category;
        console.log("Payload being sent:", transformedTodo);

        const response = await axios.put(`/api/todos/${todo.id}/`, transformedTodo);
        console.log("Update response", response.data);
        const index = this.todos.findIndex((t) => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        toast.error("Error updating todo");
      }
    },
    async deleteTodo(todoId) {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        const response = await axios.delete(`/api/todos/${todoId}/`);
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      } catch (error) {
        console.error("Error deleting todo:", error);
        toast.error("Error deleting todo");
      }
    },
    async fetchCategories() {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        const response = await axios.get("/api/categories/");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    },
    async addCategory(category) {
      try {
        const authStore = useAuthStore();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authStore.token}`;

        const response = await axios.post("/api/categories/", category);
        this.categories.push(response.data);
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("Error adding category");
      }
    },
  },
  getters: {
    getTodos: (state) => state.todos,
    getCategories: (state) => state.categories,
  },
});
