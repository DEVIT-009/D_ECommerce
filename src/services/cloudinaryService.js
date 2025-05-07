import axios from "axios";
import { reactive } from "vue";

const imgState = reactive({
  imgUrl: "",
  isLoading: false,
  error: null,
});

function useUploadCloudinary() {
  const uploadCloudinary = async (uploadUrl, file, uploadPreset) => {
    imgState.isLoading = true;
    imgState.error = null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(uploadUrl, formData);
      imgState.imgUrl = response.data.secure_url;
    } catch (err) {
      imgState.error = err;
      console.error("Cloudinary upload failed:", err);
    } finally {
      imgState.isLoading = false;
    }
  };

  return { uploadCloudinary };
}

export { imgState, useUploadCloudinary };
