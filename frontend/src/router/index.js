import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Login from "@/components/Login.vue";
import TodoList from "@/components/TodoList.vue";
import Signup from "@/components/Signup.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


// the 'router.beforeEach' navigation guard is used to control access to routes that require authentication 
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the authentication store store to check the user's authentication status.
  
  // Check if the router requires authentication and if the user is not authenticated.
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    next("/login"); // Redirect to the login page if the user is not authenticated.
  } else {
    next(); // Allow access to the route if the user is authenticated or the route does not require authentication.
  }
});

export default router;