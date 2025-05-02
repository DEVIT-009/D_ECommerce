<script setup>
import axios from "axios";
import { defineProps } from "vue";
import { userUrl } from "../stores/userData";

const props = defineProps({
  id: String,
  valueName: String,
  newValue: String,
});

async function handleSubmit() {
  try {
    await axios.patch(`${userUrl}/users/${props.id}`, {
      [props.valueName]: props.newValue,
    });
  } catch (err) {
    console.error("Error, cannot fix error: ", err);
  }
}
</script>
