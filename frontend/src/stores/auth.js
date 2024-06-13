import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router"; //Ensure you have your router imported to handle navigation on logout


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async signup(userData) {
      try {
        const response = await axios.post("/api/auth/users/", userData);
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post("/api/token/", credentials);
        this.token = response.data.access; // Assuming the response contains a token 
        localStorage.setItem("token", response.data.access);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        const userResponse = await axios.get("api/auth/users/me/");
        this.user = userResponse.data;
      } catch(error) {
        console.error('Error during login:', error);
        throw error;
      }
      
    },
    logout() {
      this.user = null;
      this.token = "";
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      router.push({name: 'Login'}) // Assuming you have a 'Login route'
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});
