import { reactive } from "vue";
import axios from "axios";
import config from "../supabase/supabaseConfig";

const prodUrl = import.meta.env.VITE_SUPABASE_URL + "/rest/v1/products";
// const prodUrl = "/product" + "/products";

const state = reactive({
  products: [],
  isLoading: false,
  error: null,
});

// Get all products
function useGetProd() {
  async function getProd() {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(prodUrl, {
        ...config,
        params: {
          select: "*",
          order: "product_id.asc",
        },
      });
      state.products = response.data;
    } catch (err) {
      state.error = err.message || "Failed to fetch products";
      // console.error("Error fetching products:", err);
    } finally {
      state.isLoading = false;
    }
  }

  getProd();
  return { state, getProd };
}

function useGetLatestProd() {
  async function getLatestProd() {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(prodUrl, {
        ...config,
        params: {
          select: "*",
          order: "release_date.desc",
          limit: 6,
        },
      });
      // Ensure we only get 6 products
      state.products = response.data.slice(0, 6);
    } catch (err) {
      state.error = err.message || "Failed to fetch products";
      console.error("Error fetching products:", err);
    } finally {
      state.isLoading = false;
    }
  }

  getLatestProd();
  return { state, getLatestProd };
}

// Get single product
function useGetOneProd() {
  const getOneProd = async (product_id) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(prodUrl, {
        ...config,
        params: {
          product_id: `eq.${product_id}`,
          select: "*",
        },
      });
      state.products = response.data;
    } catch (err) {
      state.error = err.message || "Failed to get product";
      console.error("Error getting product:", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, getOneProd };
}

// Add new product
function usePostProd() {
  const postProd = async (prodAdd) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.post(prodUrl, prodAdd, config);
      // Set state to only contain the new product
      state.products = response.data;
    } catch (err) {
      state.error = err.message || "Failed to add product";
      console.error("Error adding product:", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, postProd };
}

// Delete product
function useDeleteProd() {
  const deleteProd = async (product_id) => {
    state.isLoading = true;
    state.error = null;
    try {
      await axios.delete(prodUrl, {
        ...config,
        params: {
          product_id: `eq.${product_id}`,
        },
      });
    } catch (err) {
      state.error = err.message || "Failed to delete product";
      console.error("Error deleting product:", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { deleteProd };
}

// Update product
function usePutProd() {
  const putProd = async (product_id, dataUpdate) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.put(prodUrl, dataUpdate, {
        ...config,
        params: {
          product_id: `eq.${product_id}`,
        },
      });
      // Set state to only contain the updated product
      state.products = response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      state.error = error.message || "Failed to update product";
    } finally {
      state.isLoading = false;
    }
  };
  return { state, putProd };
}

// Update product quantity
function usePatchProd() {
  const patchProd = async (product_id, patchData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.patch(prodUrl, patchData, {
        ...config,
        params: {
          product_id: `eq.${product_id}`,
        },
      });
      // Set state to only contain the updated product
      state.products = response.data;
    } catch (error) {
      // console.error("Error updating product quantity:", error);
      state.error = error.message || "Failed to update product quantity";
    } finally {
      state.isLoading = false;
    }
  };

  return { state, patchProd };
}

export {
  state, // Data
  prodUrl,
  useGetProd,
  useGetLatestProd,
  useGetOneProd,
  usePostProd,
  useDeleteProd,
  usePutProd,
  usePatchProd,
};
