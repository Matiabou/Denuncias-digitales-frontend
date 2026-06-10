<script setup>
</script>

<template>
  <div class="login-card">

    <h2>Iniciar sesión</h2>

    <form>

      <div class="field">
        <label>Email</label>

        <input
          type="email"
          placeholder="ejemplo@email.com"
        />
      </div>

      <div class="field">
        <label>Contraseña</label>

        <input
          type="password"
          placeholder="••••••••"
        />
      </div>

      <button type="button">
        Ingresar
      </button>

      <span class="divider">
        o
      </span>

      <router-link class="secondary" to="/registro">
        Crear cuenta
      </router-link>

    </form>

  </div>
</template>