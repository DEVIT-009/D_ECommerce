import { createApp } from "vue";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// CSS
import "./style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Component
import App from "@/App.vue";
// Router & Store
import router from "./routers/rootrouter.js";
import { useUserStore } from "./stores/userData.js";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Toast);

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.allowedRoles;

  // ✅ If route requires auth and user is not logged in
  if (requiresAuth && !userStore.isActive) {
    next("/login");
  }
  // ✅ If roles are limited and user doesn't match
  else if (allowedRoles && !allowedRoles.includes(userStore.position)) {
    // next({ name: "not-found" });
    next("/unauthorized");
  }
  // ✅ If route is public or user is allowed
  else {
    next();
  }
});

// Mount the app
app.mount("#app");
