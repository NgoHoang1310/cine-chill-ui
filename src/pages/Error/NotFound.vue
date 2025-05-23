<template>
  <div class="not-found">
    <h1 class="error-code">404</h1>
    <p class="error-message">Oops! The page you are looking for does not exist.</p>
    <router-link to="/home" class="back-home">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #333;
}

.error-code {
  font-size: 100px;
  font-weight: bold;
  margin: 0;
}

.error-message {
  font-size: 24px;
  margin: 10px 0;
}

.back-home {
  text-decoration: none;
  color: #007bff;
  font-size: 18px;
  margin-top: 20px;
}

.back-home:hover {
  text-decoration: underline;
}
</style>
