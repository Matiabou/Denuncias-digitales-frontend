<template>

  <main class="register-page">

    <div class="register-card">

      <h1>Crear cuenta</h1>

      <p class="subtitle">
        Completá tus datos para registrarte.
      </p>

      <form>

        <div class="form-row">
          <div class="field">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Juan"
            />
          </div>

          <div class="field">
            <label>Apellido</label>
            <input
              type="text"
              placeholder="Pérez"
            />
          </div>

          <div class="field">
            <label>DNI</label>
            <input
              type="text"
              placeholder="12345678"
            />
          </div>

          <div class="field">
            <label>Sexo</label>
            <select>
              <option value="" disabled selected hidden>Elegí una opción</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div class="field">
            <label>Teléfono</label>
            <input
              type="text"
              placeholder="1133698745"
            />
          </div>

          <div class="field">
            <label>Domicilio</label>
            <input
              type="text"
              placeholder="Calle Falsa 123"
            />
          </div>

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
        </div>

     <router-link class="secondary" to="/denuncias">
        Registrarse
      </router-link>

        <RouterLink
          to="/"
          class="back-link"
        >
          Volver al inicio de sesión
        </RouterLink>

      </form>

    </div>

  </main>

</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>