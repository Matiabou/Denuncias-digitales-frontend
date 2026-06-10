<template>
  <main class="login-page">
    <section class="hero">
      <div class="hero-content">
        <h1>Denuncias Digitales</h1>

        <p>
          Realizá denuncias desde cualquier lugar y hacé seguimiento
          de tus trámites de forma segura.
        </p>
      </div>
    </section>

    <section class="login-section">
      <LoginForm />
    </section>
  </main>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>