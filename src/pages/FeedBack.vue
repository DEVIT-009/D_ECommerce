<script setup>
import { ref } from "vue";
import { Star, MessageSquare, AlertCircle, ChevronDown } from "lucide-vue-next";

const rating = ref(0);
const feedbackType = ref("");
const message = ref("");

const feedbackTypes = [
  { value: "suggestion", label: "Suggestion" },
  { value: "complaint", label: "Complaint" },
  { value: "praise", label: "Praise" },
  { value: "bug", label: "Bug Report" },
];

const submitFeedback = () => {
  // TODO: Implement feedback submission
  //   console.log({
  //     rating: rating.value,
  //     type: feedbackType.value,
  //     message: message.value,
  //   });
};
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">
        We Value Your Feedback
      </h1>

      <div class="bg-base-300 rounded-2xl p-8 shadow-lg">
        <form @submit.prevent="submitFeedback" class="space-y-6">
          <!-- Rating -->
          <div class="text-center">
            <label class="block text-lg font-semibold mb-4"
              >How would you rate your experience?</label
            >
            <div class="flex justify-center gap-2">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="rating = star"
                class="p-2 hover:scale-110 transition-transform"
              >
                <Star
                  :class="[
                    'w-8 h-8',
                    star <= rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-base-content/30',
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Feedback Type -->
          <div class="relative">
            <label for="type" class="absolute inset-y-2 right-2.5">
              <ChevronDown class="w-5 h-5 text-base-content/50" />
            </label>
            <select
              v-model="feedbackType"
              id="type"
              required
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="" disabled>
                What type of feedback do you have?
              </option>
              <option
                v-for="type in feedbackTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>

          <!-- Message -->
          <div class="relative z-0 w-full mb-5 group">
            <textarea
              v-model="message"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer min-h-32"
              placeholder=" "
              required
            ></textarea>
            <label
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 left-0 origin-[0] peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Please share your thoughts with us...
            </label>
          </div>

          <!-- Submit Button -->
          <div class="text-center">
            <button type="submit" class="btn btn-accent btn-lg">
              <MessageSquare class="w-5 h-5 mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center text-base-content/70">
        <p class="flex items-center justify-center gap-2">
          <AlertCircle class="w-5 h-5" />
          Your feedback helps us improve our services
        </p>
      </div>
    </div>
  </div>
</template>
