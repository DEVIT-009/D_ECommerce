import { getCurrentInstance, reactive } from "vue";
import axios from "axios";

const prodUrl = import.meta.env.VITE_API_URL + "/products";
// const prodUrl = "/product" + "/products";

const state = reactive({
  products: [],
  isLoading: false,
  error: "",
});

// Get
function useGetProd() {
  async function getProd() {
    state.isLoading = true;
    try {
      const response = await axios.get(prodUrl);
      state.products = response.data;
    } catch (err) {
      state.error = err.message || "Failed to fetch phones";
      console.error("Cannot fetching data : ", err);
    } finally {
      state.isLoading = false;
    }
  }

  getProd();

  return { state, getProd };
}

// GET ONE
function useGetOneProd() {
  const getOneProd = async (id) => {
    state.isLoading = true;
    state.error = "";
    try {
      const res = await axios.get(`${prodUrl}/${id}`);
      state.products = res.data;
    } catch (error) {
      state.error = err.message || "Failed to get phones by ID";
      console.error("Cannot getting data id, Error: ", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, getOneProd };
}

// POST
function usePostProd() {
  const postProd = async (prodAdd) => {
    state.isLoading = true;
    state.error = "";
    try {
      const response = await axios.post(prodUrl, prodAdd);
      state.products = response.data;
    } catch (err) {
      console.error("Cannot Add data : ", err);
      state.error = err.message || "Failed to Added(Post) product";
    } finally {
      state.isLoading = false;
    }
  };

  return { state, postProd };
}

// DELETE
function useDeleteProd() {
  const deleteProd = async (id) => {
    state.isLoading = true;
    state.error = "";
    try {
      await axios.delete(`${prodUrl}/${id}`);
    } catch (err) {
      state.error = err.message || "Failed to Delete products";
      console.error("Cannot delete data : ", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { deleteProd };
}

// PUT
function usePutProd() {
  const putProd = async (id, dataUpdata) => {
    state.isLoading = true;
    state.error = "";
    try {
      await axios.put(`${prodUrl}/${id}`, dataUpdata);
    } catch (error) {
      console.error("Cannot Update data : ", error);
      state.error = error.message || "Failed to Update products";
    } finally {
      state.isLoading = false;
    }
  };
  return { state, putProd };
}

// Patching Method using PUT to update quantity of Product
function usePatchProd() {
  const patchProd = async (id, patchData) => {
    state.isLoading = true;
    state.error = "";
    try {
      // Get data
      const { data } = await axios.get(`${prodUrl}/${id}`);
      // merge data from get method with single change data
      const mergeData = { ...data, ...patchData };
      // Assign data with put method
      await axios.put(`${prodUrl}/${id}`, mergeData);
    } catch (error) {
      console.error("Cannot Update data : ", error);
      state.error = "Failed to Update products";
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
  useGetOneProd,
  usePostProd,
  useDeleteProd,
  usePutProd,
  usePatchProd,
};
