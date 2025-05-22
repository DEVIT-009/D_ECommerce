<script setup>
import { reactive, ref } from "vue";
import { Mail, Phone, MapPin, Send } from "lucide-vue-next";

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isLoading = ref(false);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   isLoading.value = true;

//   try {
//     // ...
//   } catch (error) {
//     console.error("Error submitting form:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// Display data
const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    content: "Phnom Penh, Cambodia",
    link: "https://maps.app.goo.gl/5gc74Kcbyz8yHxJp9",
  },
  {
    icon: Phone,
    title: "Phone Number",
    content: "+855 96 7234 500",
    link: "tel:+855967234500",
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "support@ecommerce.com",
    link: "mailto:support@ecommerce.com",
  },
];
const formContactUs = reactive([
  {
    id: "name",
    get value() {
      return formData.name;
    },
    set value(val) {
      formData.name = val;
    },
    type: "text",
    isRequired: true,
    label: "Your Name",
  },
  {
    id: "email",
    get value() {
      return formData.email;
    },
    set value(val) {
      formData.email = val;
    },
    type: "email",
    isRequired: true,
    label: "Your Email",
  },
  {
    id: "subject",
    get value() {
      return formData.subject;
    },
    set value(val) {
      formData.subject = val;
    },
    type: "text",
    isRequired: true,
    label: "How can we help?",
  },
]);
</script>

<template>
  <div class="w-full">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
      <p class="text-base-content/70 max-w-2xl mx-auto">
        Have questions or need assistance? We're here to help! Reach out to us
        through any of the following methods.
      </p>
    </div>

    <!-- Contact Information Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div
        v-for="(info, index) in contactInfo"
        :key="index"
        class="bg-base-200 ring-1 ring-base-content/20 hover:ring-base-content/80 hover:bg-base-300 p-6 rounded-lg text-center hover:shadow-lg transition-all"
      >
        <component :is="info.icon" class="w-8 h-8 mx-auto mb-4 text-primary" />
        <h3 class="text-lg font-semibold cursor-default mb-2">
          {{ info.title }}
        </h3>
        <a
          :href="info.link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-base-content/70 hover:text-primary transition-colors"
        >
          {{ info.content }}
        </a>
      </div>
    </div>

    <!-- Contact Form and Map Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Contact Form -->
      <div class="bg-base-300 p-8 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
        <form class="space-y-6">
          <!-- User Name, Email, Subject-->
          <div
            class="relative z-0 w-full mb-5 group"
            v-for="item in formContactUs"
            :key="item.label"
          >
            <input
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              :id="item.id"
              v-model="item.value"
              :type="item.type"
              placeholder=" "
              required
            />
            <label
              :for="item.id"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {{ item.label }}
            </label>
          </div>
          <!-- Message -->
          <div class="relative z-0 w-full mb-5 group">
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="4"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            ></textarea>
            <label
              for="message"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Hi, what is your message for us?
            </label>
          </div>

          <button
            type="button"
            class="btn btn-primary w-full"
            :disabled="isLoading"
          >
            <Send class="w-5 h-5 mr-2" />
            Send Message
          </button>
        </form>
      </div>

      <!-- Map Section -->
      <div class="bg-base-300 p-8 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6">Our Location</h2>
        <div
          class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ring-1 ring-info-content"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3908.9961680993856!2d104.864804!3d11.552132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDMzJzA3LjciTiAxMDTCsDUxJzUzLjMiRQ!5e0!3m2!1sen!2skh!4v1747890457668!5m2!1sen!2skh"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="flex w-full justify-end mt-5">
          <a
            href="https://www.google.com/maps?ll=11.552132,104.864804&z=16&t=m&hl=en&gl=KH&mapclient=embed&q=11%C2%B033%2707.7%22N+104%C2%B051%2753.3%22E+11.552132,+104.864804@11.552132,104.864804"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary gap-2"
          >
            <MapPin class="w-5 h-5" />
            Open with Google Maps
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
