<script setup>
import Nav from "./Nav.vue";
import { RouterLink } from "vue-router";
import ProfileCart from "./ProfileCart.vue";
import {
  Info,
  LayoutDashboard,
  LayoutPanelLeft,
  MessageCircleQuestion,
  MessageSquareShare,
  Phone,
  ShieldAlert,
  TabletSmartphone,
  Users,
} from "lucide-vue-next";

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// data display in both page : home & admin
const navLink = [
  {
    link: "/",
    label: "Home",
    icon: LayoutPanelLeft,
    isBorder: true,
  },
  {
    link: "/products",
    label: "Phones",
    icon: TabletSmartphone,
    isBorder: false,
  },
  {
    link: "/about",
    label: "About Us",
    icon: Info,
    isBorder: true,
  },
  {
    link: "/contact",
    label: "Contact Us",
    icon: Phone,
    isBorder: false,
  },
  {
    link: [
      {
        label: "Shipping | Delivery Policy",
        link: "/shipping-policy",
      },
      {
        label: "Returns & Refunds Policy",
        link: "/return-refund",
      },
      {
        label: "Privacy Policy",
        link: "/privacy-policy",
      },
    ],
    label: "Policy",
    icon: ShieldAlert,
    isBorder: true,
  },
  {
    link: "/faq",
    label: "FAQs",
    icon: MessageCircleQuestion,
    isBorder: true,
  },
  {
    link: "/feedback",
    label: "Feedback",
    icon: MessageSquareShare,
    isBorder: false,
  },
];
const navLinkAdmin = [
  {
    link: "/d-admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    isBorder: true,
  },
  {
    link: [
      {
        label: "Display Products",
        link: "/d-admin/product/display",
      },
      {
        label: "Add Products",
        link: "/d-admin/product/add",
      },
      {
        label: "Manage Products",
        link: "/d-admin/product/func",
      },
    ],
    label: "Products",
    icon: TabletSmartphone,
    isBorder: true,
  },
  {
    link: [
      {
        label: "Manage Users",
        link: "/d-admin/user/display",
      },
      {
        label: "Register | Add Users",
        link: "/d-admin/user/add",
      },
    ],
    label: "Users",
    icon: Users,
    isBorder: true,
  },
];
</script>

<template>
  <div
    class="navbar bg-base-300/50 backdrop-blur-2xl max-w-7xl w-full mx-auto sticky top-0 z-100 rounded-b-sm p-3 shadow-md shadow-base-300"
  >
    <Nav
      :isAdminView="props.isAdmin ? true : false"
      :navLink="props.isAdmin ? navLinkAdmin : navLink"
      class="w-fit"
    />

    <div class="navbar-center md:px-7 flex-1 grid place-items-center">
      <RouterLink :to="'/'" class="btn md:btn-lg btn-accent btn-soft">
        D-CAMPhone
      </RouterLink>
    </div>

    <ProfileCart />
  </div>
</template>
