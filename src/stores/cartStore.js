// stores/cartStore.js
import { defineStore } from "pinia";
// CSS import
import { useToast } from "vue-toastification";

// Notification CSS
const Toast = useToast();

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [], // [{ product_id, product_name, qty, quantity (max stock), ... }]
    isDelivery: true, // default true
  }),
  actions: {
    clearCartItems() {
      this.cartItems = []; // Clear the cart items
    },
    addToCart(product) {
      if (product.quantity == 0) {
        Toast.error("This " + product.product_name + " is out of stock!", {
          timeout: 1500,
          position: "bottom-right",
        });
        return;
      }
      const existing = this.cartItems.find(
        (item) => item.product_id == product.product_id
      );
      if (existing) {
        if (existing.qty < existing.quantity) {
          existing.qty++;
        } else {
          Toast.error("This " + product.product_name + " is out of stock!", {
            timeout: 1500,
            position: "bottom-right",
          });
        }
      } else {
        this.cartItems.push({
          ...product,
          qty: 1, // first time added
        });
        Toast.success("Added " + product.product_name + " to cart!", {
          timeout: 1500,
          position: "bottom-right",
        });
      }
    },
    removeOneFromCart(id) {
      const item = this.cartItems.find((item) => item.product_id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty--;
        } else {
          // Optionally remove the item from cart if qty becomes 0
          Toast.error(
            "Removed " +
              this.cartItems.find((i) => i.product_id == id).product_name +
              " from cart!",
            {
              timeout: 1500,
              position: "bottom-right",
            }
          );
          this.cartItems = this.cartItems.filter((i) => i.product_id !== id);
        }
      }
    },
    removeProdFromCart(id) {
      Toast.error(
        "Removed " +
          this.cartItems.find((i) => i.product_id == id).product_name +
          " from cart!",
        {
          timeout: 1500,
          position: "bottom-right",
        }
      );
      this.cartItems = this.cartItems.filter((i) => i.product_id !== id);
    },
    setIsDelivery(value) {
      this.isDelivery = value;
    },
    getItemQty(id) {
      const item = this.cartItems.find((i) => i.product_id === id);
      return item ? item.qty : 0;
    },
  },
  getters: {
    totalCount: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.qty, 0),
    subTotalPrice: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.qty * item.price, 0),
    grandTotal: (state) =>
      state.subTotalPrice + state.taxValue + state.delivery_price,
    delivery_price: (state) => {
      if (state.subTotalPrice === 0 || !state.isDelivery) return 0;
      else if (state.subTotalPrice < 1000) return 5;
      else if (state.subTotalPrice < 1500) return 10;
      else return 15;
    },
    taxRate: (state) => {
      if (state.subTotalPrice == 0) {
        return 0;
      } else if (state.subTotalPrice < 1000) {
        return 3;
      } else {
        return 5;
      }
    },
    taxValue: (state) => (state.subTotalPrice * state.taxRate) / 100,
  },
  persist: true,
});

// This store manages the cart count in the application.
