<template>
  <main class="login-page">
    <section class="hero">
      <div class="hero-content">
        <h1>Denuncias Digitales</h1>

        <p>
          Creá tu cuenta para completar tus datos y empezar a gestionar denuncias.
        </p>
      </div>
    </section>

    <section class="login-section">
      <RegisterForm />
    </section>
  </main>
</template>

<script setup>
import RegisterForm from "@/components/RegisterForm.vue";
</script>