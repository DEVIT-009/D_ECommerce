import axios from "axios";
import { reactive } from "vue";
import config from "../supabase/supabaseConfig";

const receiverUrl = import.meta.env.VITE_SUPABASE_URL + "/rest/v1/receivers";

// GET
function useGetReceiver() {
  const receiverState = reactive({
    receiver: [],
    isLoading: false,
    error: null,
  });
  const getReceiver = async () => {
    receiverState.isLoading = true;
    try {
      const response = await axios.get(receiverUrl, config);
      receiverState.receiver = response.data;
    } catch (error) {
      receiverState.error = error.message || "Fail get Receivers...";
    } finally {
      receiverState.isLoading = false;
    }
  };
  return { receiverState, getReceiver };
}

// POST
function usePostReceiver() {
  const receiverState = reactive({
    receiver: [],
    isLoading: false,
    error: null,
  });
  const postReceiver = async (receiverData) => {
    receiverState.isLoading = true;
    try {
      const response = await axios.post(receiverUrl, receiverData, {
        ...config,
        headers: {
          ...config.headers,
          // Prefer: "return=representation",
        },
      });
      receiverState.receiver = response.data;
    } catch (error) {
      receiverState.error = error.message || "Fail to post Receiver";
    } finally {
      receiverState.isLoading = false;
    }
  };
  return { receiverState, postReceiver };
}

export { useGetReceiver, usePostReceiver };
