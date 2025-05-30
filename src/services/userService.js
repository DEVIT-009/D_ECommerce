import { reactive } from "vue";
import axios from "axios";
import config from "../supabase/supabaseConfig";

const userUrl = import.meta.env.VITE_SUPABASE_URL + "/rest/v1/users";
// const userUrl = "/user" + "/users";

const state = reactive({
  users: [],
  isLoading: false,
  error: null,
});

/**
 * GET
 */
function useGetUser() {
  const getUser = async () => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(userUrl, {
        ...config,
        params: {
          select: "*",
          order: "user_id.asc",
        },
      });
      state.users = response.data;
    } catch (err) {
      state.error = err.message || "Failed to fetch users";
      // console.error("Error fetching users:", err);
    } finally {
      state.isLoading = false;
    }
  };
  getUser();

  return { state, getUser };
}

/**
 * Get One
 */
function useGetOneUser() {
  const getOneUser = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(userUrl, {
        ...config,
        params: {
          user_id: `eq.${id}`,
          select: "*",
        },
      });
      state.users = response.data;
    } catch (err) {
      state.error = err.message || "Failed to get user";
      // console.error("Error getting user:", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, getOneUser };
}

/**
 * POST
 */
function usePostUser() {
  const postUser = async (userState) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.post(userUrl, userState, {
        ...config,
        headers: {
          ...config.headers,
          // Prefer: "return=representation",
        },
      });
      state.users = response.data;
    } catch (err) {
      state.error = err.message || "Failed to add user";
      // console.error("Error adding user:", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, postUser };
}

/**
 * PATCH
 * @returns
 */
function usePatchUser() {
  const patchUser = async (id, patchData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.patch(userUrl, patchData, {
        ...config,
        params: {
          user_id: `eq.${id}`,
        },
        headers: {
          ...config.headers,
          // Prefer: "return=representation",
        },
      });
      state.users = response.data;
    } catch (err) {
      state.error = err.message || "Failed to update user";
      // console.error("Error updating user:", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, patchUser };
}

/**
 * DELETE
 * @returns
 */
function useDeleteUser() {
  const deleteUser = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      await axios.delete(userUrl, {
        ...config,
        params: {
          user_id: `eq.${id}`,
        },
      });
    } catch (err) {
      state.error = err.message || "Failed to delete user";
      // console.error("Error deleting user:", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, deleteUser };
}

/**
 * GET CHECK USER example check email & password of user
 * @returns
 */
function useCheckUser() {
  const checkUser = async (filters) => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios.get(userUrl, {
        ...config,
        params: {
          ...filters,
          select: "*",
        },
      });
      const data = response.data;

      if (data.length > 0) {
        state.users = data;
      } else {
        state.error = "User not found...";
      }
    } catch (err) {
      state.error = err.message || "Failed to check user";
      // console.error("Error checking user:", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, checkUser };
}

export {
  state,
  userUrl,
  useGetUser,
  useGetOneUser,
  usePostUser,
  usePatchUser,
  useDeleteUser,
  useCheckUser,
};
