<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-vue-next";
import { useGetLatestProd } from "../services/ProductService";
import { useRouter } from "vue-router";

const router = useRouter();
const { state, getLatestProd } = useGetLatestProd();
const currentSlide = ref(0);
const isTransitioning = ref(false);
const isHovering = ref(false);
const autoSlideInterval = ref(null);
const TRANSITION_DURATION = 500; // Duration of the slide animation

// Ensure we only have 6 products
const products = computed(() => {
  if (!state.products) return [];
  return state.products.slice(0, 6);
});

onMounted(async () => {
  await getLatestProd();
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    if (!isHovering.value && !isTransitioning.value) {
      nextSlide();
    }
  }, 5000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
};

const nextSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;

  // First, slide out the current slide
  const currentElement = document.querySelector(".slide-container");
  if (currentElement) {
    currentElement.classList.add("slide-out-left");
  }

  // After the slide-out animation, change the slide and slide in
  setTimeout(() => {
    if (
      products.value.length &&
      currentSlide.value < products.value.length - 1
    ) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }

    // Add slide-in animation
    if (currentElement) {
      currentElement.classList.remove("slide-out-left");
      currentElement.classList.add("slide-in-right");
    }

    // Reset transition state after animation
    setTimeout(() => {
      if (currentElement) {
        currentElement.classList.remove("slide-in-right");
      }
      isTransitioning.value = false;
    }, TRANSITION_DURATION);
  }, TRANSITION_DURATION);
};

const prevSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;

  // First, slide out the current slide
  const currentElement = document.querySelector(".slide-container");
  if (currentElement) {
    currentElement.classList.add("slide-out-right");
  }

  // After the slide-out animation, change the slide and slide in
  setTimeout(() => {
    if (currentSlide.value > 0) {
      currentSlide.value--;
    } else if (products.value.length) {
      currentSlide.value = products.value.length - 1;
    }

    // Add slide-in animation
    if (currentElement) {
      currentElement.classList.remove("slide-out-right");
      currentElement.classList.add("slide-in-left");
    }

    // Reset transition state after animation
    setTimeout(() => {
      if (currentElement) {
        currentElement.classList.remove("slide-in-left");
      }
      isTransitioning.value = false;
    }, TRANSITION_DURATION);
  }, TRANSITION_DURATION);
};

const viewProductDetails = (productId) => {
  router.push(`/products/${productId}`);
};
</script>

<template>
  <div class="relative w-full py-5 max-md:hidden">
    <!-- Section Title -->
    <div class="text-center animate-bounce uppercase">
      <h2
        class="text-5xl font-bold bg-gradient-to-r from-accent via-accent to-info bg-clip-text text-transparent animate-gradient"
      >
        Discover our newest arrivals
      </h2>
    </div>

    <!-- Loading State -->
    <div
      v-if="state.isLoading"
      class="flex justify-center items-center h-[600px]"
    >
      <div class="loading loading-spinner loading-lg text-accent"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="state.error"
      class="text-center text-error h-[600px] flex items-center justify-center"
    >
      {{ state.error }}
    </div>

    <!-- No Products State -->
    <div
      v-else-if="!products.length"
      class="text-center text-base-content/70 h-[600px] flex items-center justify-center"
    >
      No products available at the moment
    </div>

    <!-- Slider Content -->
    <div v-else class="relative h-[600px] lg:h-[700px] overflow-hidden">
      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-xl btn-accent opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft class="w-9 h-9" />
      </button>
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-xl btn-accent opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronRight class="w-9 h-9" />
      </button>

      <!-- Product Display -->
      <div
        v-if="products[currentSlide]"
        class="w-full h-full flex flex-col items-center justify-center absolute bottom-0 left-0 slide-container"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <div
          class="relative group w-full max-w-5xl mx-auto px-4 bg-accent/10 hover:bg-accent transition-all duration-300 rounded-md shadow-xl shadow-base-300"
        >
          <!-- Main Image -->
          <div
            class="relative aspect-[5/3] w-full overflow-hidden rounded-lg transform transition-all duration-500"
          >
            <div class="relative w-full h-full">
              <img
                :src="products[currentSlide].image"
                :alt="products[currentSlide].product_name"
                class="w-full h-full object-contain group-hover:scale-[0.99] transition-all duration-300"
              />
            </div>

            <!-- Floating Badge -->
            <div
              class="animate-bounce absolute top-10 right-5 ring-1 ring-base-300/15 bg-accent text-accent-content px-4 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              New Arrival
            </div>
          </div>

          <!-- Product Info Overlay -->
          <div
            class="absolute bottom-0 left-0 right-0 p-8 transition-all duration-300"
            :class="[
              isHovering
                ? 'bg-gradient-to-t from-base-300/95 via-base-300/80 to-transparent backdrop-blur-sm'
                : 'bg-gradient-to-t from-base-300/0 to-transparent',
            ]"
          >
            <div
              class="transform transition-all duration-300"
              :class="
                isHovering
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              "
            >
              <h2 class="text-3xl font-bold text-base-content">
                {{ products[currentSlide].product_name }}
              </h2>
              <p class="text-base-content/80 line-clamp-2 mt-3 text-lg">
                {{ products[currentSlide].description }}
              </p>
              <div class="flex justify-between items-center mt-6">
                <div class="flex flex-col">
                  <span class="text-sm text-base-content/70"
                    >Starting from</span
                  >
                  <span class="text-3xl font-bold text-accent">
                    ${{ products[currentSlide].price }}
                  </span>
                </div>
                <button
                  @click="viewProductDetails(products[currentSlide].product_id)"
                  class="btn btn-accent btn-lg group btn-outline"
                >
                  View Details
                  <ArrowRight
                    class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots Navigation -->
      <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-4"
      >
        <button
          v-for="(_, index) in products"
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
          :class="
            currentSlide === index
              ? 'bg-accent w-8 shadow-lg shadow-accent/50'
              : 'bg-base-content/30'
          "
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

.slide-container {
  transition: transform 0.5s ease-out;
}

.slide-out-left {
  animation: slideOutLeft 0.5s ease-out forwards;
}

.slide-out-right {
  animation: slideOutRight 0.5s ease-out forwards;
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
