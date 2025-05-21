import { useGetProd } from "./ProductService.js";
import { useGetUser } from "./userService.js";
import { reactive } from "vue";

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

export { id_state, generateProductId, generateUserId };
