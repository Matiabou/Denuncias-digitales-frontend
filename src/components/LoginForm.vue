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

      <button
        class="secondary"
        type="button"
      >
        Crear cuenta
      </button>

    </form>

  </div>
</template>