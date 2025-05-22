<template>
  <div class="sample-page">
    <h1 class="title">Sample Page</h1>

    <div class="content-section">
      <div class="card">
        <h2>Welcome to the Sample Page</h2>
        <p>This is a demonstration of various Vue features and components.</p>

        <div class="counter-section">
          <h3>Counter Example</h3>
          <p>Current count: {{ count }}</p>
          <div class="button-group">
            <button @click="increment" class="btn">Increment</button>
            <button @click="decrement" class="btn">Decrement</button>
          </div>
        </div>

        <div class="form-section">
          <h3>Form Example</h3>
          <input
            v-model="inputText"
            type="text"
            placeholder="Type something..."
            class="input-field"
          />
          <p v-if="inputText">You typed: {{ inputText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SamplePage",
  data() {
    return {
      count: 0,
      inputText: "",
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>

<style scoped>
.sample-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.content-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter-section,
.form-section {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

h2,
h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>
