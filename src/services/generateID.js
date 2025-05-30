import { useGetProd } from "./ProductService.js";
import { useGetUser } from "./userService.js";
import { useGetOrder } from "./orderService.js";
import { reactive } from "vue";
import { useGetReceiver } from "./receiverService.js";

const id_state = reactive({
  id: null,
  isLoading: false,
  error: null,
});

// Function to generate a new unique product ID
async function generateProductId() {
  const { state, getProd } = useGetProd();
  try {
    // Get all products
    await getProd();

    id_state.isLoading = true;
    id_state.error = null;

    if (state.products && state.products.length > 0) {
      // Find the maximum product_id
      const maxId = Math.max(
        ...state.products.map((product) => Number(product.product_id))
      );
      // Return maxId + 1 as a number
      id_state.id = maxId + 1;
    } else {
      // If no products exist, start with 1
      id_state.id = 1;
    }
    return id_state.id;
  } catch (error) {
    id_state.error = error;
    throw error;
  } finally {
    id_state.isLoading = false;
  }
}

// Function to generate a new unique User ID
async function generateUserId() {
  const { state, getUser } = useGetUser();
  try {
    // Get all users
    await getUser();

    id_state.isLoading = true;
    id_state.error = null;

    if (state.users && state.users.length > 0) {
      // Find the maximum user_id
      const maxId = Math.max(
        ...state.users.map((user) => Number(user.user_id))
      );
      // Return maxId + 1 as a number
      id_state.id = maxId + 1;
    } else {
      // If no users exist, start with 1
      id_state.id = 1;
    }
    return id_state.id;
  } catch (error) {
    id_state.error = error;
    throw error;
  } finally {
    id_state.isLoading = false;
  }
}

// Function to generate a new unique User ID
function generateOrderId() {
  const { getOrderState, getOrder } = useGetOrder();
  const orderIdState = reactive({
    order_id: null,
    isLoading: false,
    error: null,
  });
  async function orderId() {
    try {
      orderIdState.isLoading = true;
      await getOrder();

      if (getOrderState.orders && getOrderState.orders.length > 0) {
        const maxId = Math.max(
          ...getOrderState.orders.map((order) => Number(order.order_id))
        );
        orderIdState.order_id = maxId + 1;
      } else {
        orderIdState.order_id = 1;
      }
    } catch (error) {
      orderIdState.error = error.message || "Failed to generate order ID";
    } finally {
      orderIdState.isLoading = false;
    }
  }

  return { orderIdState, orderId };
}

// Function to generate a new unique Receiver ID
function generateReceiverId() {
  const { receiverState, getReceiver } = useGetReceiver();
  const receiverIdState = reactive({
    receiver_id: null,
    isLoading: false,
    error: null,
  });
  async function receiverId() {
    try {
      receiverIdState.isLoading = true;
      await getReceiver();

      if (receiverState.receiver && receiverState.receiver.length > 0) {
        const maxId = Math.max(
          ...receiverState.receiver.map((r) => Number(r.receiver_id))
        );
        receiverIdState.receiver_id = maxId + 1;
      } else {
        receiverIdState.receiver_id = 1;
      }
    } catch (error) {
      receiverIdState.error = error.message || "Failed to generate receiver ID";
    } finally {
      receiverIdState.isLoading = false;
    }
  }

  return { receiverIdState, receiverId };
}

export {
  id_state,
  generateProductId,
  generateUserId,
  generateOrderId,
  generateReceiverId,
};
