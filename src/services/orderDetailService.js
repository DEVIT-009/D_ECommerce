import { reactive } from "vue";
import axios from "axios";
import config from "../supabase/supabaseConfig";

const orderDetailUrl =
  import.meta.env.VITE_SUPABASE_URL + "/rest/v1/order_details";

// GET
function useGetOrderDetail() {
  const getOrderDetailState = reactive({
    orderDetails: [],
    isLoading: false,
    error: null,
  });
  async function getOrderDetail() {
    getOrderDetailState.isLoading = true;
    getOrderDetailState.error = null;
    try {
      const response = await axios.get(orderDetailUrl, {
        ...config,
        params: {
          select: "*",
          order: "order_detail_id.desc",
        },
      });
      getOrderDetailState.orderDetails = response.data;
    } catch (err) {
      getOrderDetailState.error =
        err.message || "Failed to fetch Order Details";
    } finally {
      getOrderDetailState.isLoading = false;
    }
  }

  return { getOrderDetailState, getOrderDetail };
}

// GET by order_id
function useGetOrderDetailByOrderId() {
  const getOrderDetailState = reactive({
    orderDetails: [],
    isLoading: false,
    error: null,
  });
  async function getOrderDetailByOrderId(orderId) {
    getOrderDetailState.isLoading = true;
    getOrderDetailState.error = null;
    try {
      const response = await axios.get(orderDetailUrl, {
        ...config,
        params: {
          order_id: `eq.${orderId}`,
          select: "*",
        },
      });
      getOrderDetailState.orderDetails = response.data;
    } catch (err) {
      getOrderDetailState.error =
        err.message || "Failed to fetch Order Details";
    } finally {
      getOrderDetailState.isLoading = false;
    }
  }

  return { getOrderDetailState, getOrderDetailByOrderId };
}

/**
 * POST
 * @returns
 */
function usePostOrderDetail() {
  const postOrderDetailState = reactive({
    orderDetails: [],
    isLoading: false,
    error: null,
  });
  async function postOrderDetail(orderDetailData) {
    postOrderDetailState.isLoading = true;
    try {
      const response = await axios.post(
        orderDetailUrl,
        orderDetailData,
        config
      );
      postOrderDetailState.orderDetails = response.data;
    } catch (err) {
      postOrderDetailState.error = err.message || "Failed to add order detail";
      // console.error("Error adding order detail:", err);
    } finally {
      postOrderDetailState.isLoading = false;
    }
  }

  return { postOrderDetailState, postOrderDetail };
}

export { useGetOrderDetail, useGetOrderDetailByOrderId, usePostOrderDetail };
