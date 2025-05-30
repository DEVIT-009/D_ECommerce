import { reactive } from "vue";
import axios from "axios";
import config from "../supabase/supabaseConfig";
import { useReceiverStore } from "../stores/receiverStore.js";

const orderUrl = import.meta.env.VITE_SUPABASE_URL + "/rest/v1/orders";

// GET
function useGetOrder() {
  const getOrderState = reactive({
    orders: [],
    isLoading: false,
    error: null,
  });
  async function getOrder() {
    getOrderState.isLoading = true;
    getOrderState.error = null;
    try {
      const response = await axios.get(orderUrl, {
        ...config,
        params: {
          select: "*",
          order: "order_date.desc",
        },
      });
      getOrderState.orders = response.data;
    } catch (err) {
      getOrderState.error = err.message || "Failed to fetch Orders";
      // console.error("Error fetching Orders:", err);
    } finally {
      getOrderState.isLoading = false;
    }
  }

  return { getOrderState, getOrder };
}

// POST
function usePostOrder() {
  const postOrderState = reactive({
    orders: [],
    isLoading: false,
    error: null,
  });
  async function postOrder(orderData) {
    postOrderState.isLoading = true;
    try {
      const response = await axios.post(orderUrl, orderData, config);
      postOrderState.orders = response.data;
    } catch (err) {
      postOrderState.error = err.message || "Failed to add order";
      // console.error("Error adding order:", err);
    } finally {
      postOrderState.isLoading = false;
    }
  }

  return { postOrderState, postOrder };
}

export { useGetOrder, usePostOrder };
