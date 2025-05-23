<script setup>
import { ShoppingBag, Shield, Truck, Headphones } from "lucide-vue-next";
</script>

<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h1
        class="text-5xl font-bold mb-6 bg-gradient-to-r from-info to-accent bg-clip-text text-transparent"
      >
        About Our E-Commerce Platform
      </h1>
      <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
        We're revolutionizing online shopping with cutting-edge technology and
        exceptional customer service. Join thousands of satisfied customers who
        trust us for their shopping needs.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="mb-16">
      <div class="bg-base-300 rounded-2xl p-8 shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p
          class="text-lg text-base-content/80 leading-relaxed max-w-4xl mx-auto text-center"
        >
          We are dedicated to transforming the online shopping experience by
          providing a seamless, secure, and enjoyable platform where customers
          can discover quality products and sellers can grow their businesses.
          Our commitment to innovation and customer satisfaction drives
          everything we do.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          class="bg-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <ShoppingBag class="w-12 h-12 text-accent mb-4 animate-bounce" />
          <h3 class="text-xl font-semibold mb-3">Wide Selection</h3>
          <p class="text-base-content/70">
            Browse through thousands of products from trusted sellers
          </p>
        </div>
        <div
          class="bg-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Shield class="w-12 h-12 text-accent mb-4 animate-bounce" />
          <h3 class="text-xl font-semibold mb-3">Secure Shopping</h3>
          <p class="text-base-content/70">
            Your security is our priority with advanced protection
          </p>
        </div>
        <div
          class="bg-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Truck class="w-12 h-12 text-accent mb-4 animate-bounce" />
          <h3 class="text-xl font-semibold mb-3">Fast Delivery</h3>
          <p class="text-base-content/70">
            Quick and reliable shipping to your doorstep
          </p>
        </div>
        <div
          class="bg-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Headphones class="w-12 h-12 text-accent mb-4 animate-bounce" />
          <h3 class="text-xl font-semibold mb-3">24/7 Support</h3>
          <p class="text-base-content/70">
            Our dedicated team is always here to help you
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-base-300 p-8 rounded-xl shadow-md">
          <h3 class="text-2xl font-semibold mb-4 text-accent animate-bounce">
            Quality First
          </h3>
          <p class="text-base-content/80">
            We maintain the highest standards in product quality and service
            delivery. Every item on our platform undergoes rigorous quality
            checks to ensure customer satisfaction.
          </p>
        </div>
        <div class="bg-base-300 p-8 rounded-xl shadow-md">
          <h3 class="text-2xl font-semibold mb-4 text-accent animate-bounce">
            Innovation
          </h3>
          <p class="text-base-content/80">
            We continuously evolve our platform with cutting-edge technology to
            provide the best shopping experience possible.
          </p>
        </div>
        <div class="bg-base-300 p-8 rounded-xl shadow-md">
          <h3 class="text-2xl font-semibold mb-4 text-accent animate-bounce">
            Customer Focus
          </h3>
          <p class="text-base-content/80">
            Your satisfaction is our top priority. We listen to feedback and
            constantly improve our services to meet your needs.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="">
      <h2 class="text-3xl font-bold text-center mb-8">Our Achievements</h2>
      <div
        class="bg-base-300 rounded-2xl px-8 py-14 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        <div>
          <h3 class="text-4xl font-bold text-accent mb-2 animate-bounce">
            10K+
          </h3>
          <p class="text-base-content/80">Happy Customers</p>
        </div>
        <div>
          <h3 class="text-4xl font-bold text-accent mb-2 animate-bounce">
            50K+
          </h3>
          <p class="text-base-content/80">Products Available</p>
        </div>
        <div>
          <h3 class="text-4xl font-bold text-accent mb-2 animate-bounce">
            24/7
          </h3>
          <p class="text-base-content/80">Customer Support</p>
        </div>
      </div>
    </section>
  </div>
</template>
