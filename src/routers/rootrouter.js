// Router Vue
import { createRouter, createWebHistory } from "vue-router";
// Views
import {
  HomeView,
  ProductView,
  NotFoundPage,
  PaymentView,
  CheckOutView,
  SuccessOrder,
  Login,
  Register,
  AdminView,
  Unauthorized,
} from "../views/index.js";
// Page site
import {
  Home,
  About,
  Contact,
  ShippingPolicy,
  PrivacyPolicy,
  ReturnRefund,
  FAQ,
  Products,
  ProductDetail,
  ShoppingCart,
  PaymentInfoDetail,
  PaymentPay,
  Profile,
  ManageAccount,
} from "../pages/index.js";
// Admin Site Page
import {
  Dashboard,
  // Product
  Prod_Display,
  Prod_Add,
  Prod_Func,
  Prod_Edit,
  // User
  User_Display,
  User_Add,
  User_Detail,
} from "../pages/Admin/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: "/",
      name: "homelayout",
      component: HomeView,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "about",
          name: "about",
          component: About,
        },
        {
          path: "contact",
          name: "contact",
          component: Contact,
        },
        {
          path: "shipping-policy",
          name: "shippingPolicy",
          component: ShippingPolicy,
        },
        {
          path: "privacy-policy",
          name: "privacy-policy",
          component: PrivacyPolicy,
        },
        {
          path: "faq",
          name: "faq",
          component: FAQ,
        },
        {
          path: "return-refund",
          name: "returnRefund",
          component: ReturnRefund,
        },
        {
          path: "products/",
          name: "products-view",
          component: ProductView,
          children: [
            {
              path: "",
              name: "product",
              component: Products,
            },
            {
              path: ":id",
              name: "product-detail",
              component: ProductDetail,
            },
          ],
        },
        {
          path: "cart",
          name: "cart",
          component: ShoppingCart,
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: "manage-account",
          name: "manage-account",
          component: ManageAccount,
          meta: { requiresAuth: true },
        },
      ],
    },
    // Admin
    {
      path: "/d-admin",
      name: "d-admin",
      component: AdminView,
      meta: { requiresAuth: true, allowedRoles: ["admin"] },
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "product/display",
          name: "prod-display",
          component: Prod_Display,
        },
        {
          path: "product/add",
          name: "prod-add",
          component: Prod_Add,
        },
        {
          path: "product/func", // Having option to edit, editAdvance, remove
          name: "prod-func",
          component: Prod_Func,
        },
        {
          path: "product/edit/:id", // Also call detail products
          name: "prod-edit",
          component: Prod_Edit,
        },
        {
          path: "user/display",
          name: "user-display",
          component: User_Display,
        },
        {
          path: "user/add",
          name: "user-add",
          component: User_Add,
        },
        {
          path: "user/:id",
          name: "user-detail",
          component: User_Detail,
        },
      ],
    },
    // Login
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresAuth: false },
    },
    // Register
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresAuth: false },
    },
    // Payment, Paymentinfodetail, Pay-method
    {
      path: "/payment/",
      name: "paymentview",
      component: PaymentView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "paymentinfodetail",
          component: PaymentInfoDetail,
        },
        {
          path: "pay-method",
          name: "payment-method",
          component: PaymentPay,
        },
      ],
    },
    // Check-out
    {
      path: "/payment/checkout",
      name: "checkout",
      component: CheckOutView,
      meta: { requiresAuth: true },
    },
    // Pay Success
    {
      path: "/payment/success-order",
      name: "successorder",
      component: SuccessOrder,
      meta: { requiresAuth: true },
    },
    // Not-Found
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
      meta: { requiresAuth: false },
    },
    // Unauthorized
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: Unauthorized,
      meta: { requiresAuth: false },
    },
  ],
});

export default router;
