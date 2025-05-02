import { reactive } from "vue";
import axios from "axios";

const userUrl = import.meta.env.VITE_API_URL + "/users";
// const userUrl = "/user" + "/users";
const state = reactive({
  users: [],
  isLoading: false,
  error: "",
});

// GET
function useGetUser() {
  const getUser = async () => {
    state.isLoading = true;
    state.error = "";
    try {
      const response = await axios.get(userUrl);
      state.users = response.data;
      state.error = false;
    } catch (err) {
      state.error = "Failed getting users";
      console.error("Error during fetching data : ", err);
    } finally {
      state.isLoading = false;
    }
  };
  getUser();

  return { state, getUser };
}

// GET ONE
function useGetOneUser() {
  const getOneUser = async (id) => {
    state.isLoading = true;
    state.error = "";
    try {
      const res = await axios.get(`${userUrl}/${id}`);
      state.users = res.data;
    } catch (error) {
      state.error = "Fail Getting user...";
      console.error("Cannot getting data id, Error: ", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, getOneUser };
}

// POST
function usePostUser() {
  const postUser = async (userState) => {
    state.isLoading = true;
    state.error = "";
    try {
      const response = await axios.post(`${userUrl}`, userState);
      state.users = response.data;
    } catch (err) {
      state.error = "Fail Add user...";
      console.error("Error during Post data : ", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, postUser };
}

// PATCH with PUT
function usePatchUser() {
  const patchUser = async (id, patchData) => {
    state.isLoading = true;
    state.error = "";
    try {
      // Get data
      const { data } = await axios.get(`${userUrl}/${id}`);
      // merge data from get method with single change data
      const mergeData = { ...data, ...patchData };
      // Assign data with put method
      const response = await axios.put(`${userUrl}/${id}`, mergeData);
      state.id = response.data.id;
    } catch (err) {
      state.error = "Fail Update user...";
      console.error("Error during Put data : ", err);
    } finally {
      state.isLoading = false;
    }
  };

  return { state, patchUser };
}

// DELETE
function useDeleteUser() {
  const deleteUser = async (id) => {
    state.isLoading = true;
    state.error = "";
    try {
      await axios.delete(`${userUrl}/${id}`);
    } catch (err) {
      state.error = "Fail Delete user...";
      console.error("Error during Delete data : ", err);
    } finally {
      state.isLoading = false;
    }
  };
  return { state, deleteUser };
}

// Check User
function useCheckUser() {
  const checkUser = async (filters) => {
    state.isLoading = true;
    state.error = "";
    try {
      const response = await axios.get(userUrl, { params: filters });
      const data = response.data;

      if (data.length > 0) {
        state.users = data[0];
      } else {
        state.error = "User not found...";
      }
    } catch (err) {
      state.error = "User not found...";
      console.log(err.message || "Failed to fetch users");
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
