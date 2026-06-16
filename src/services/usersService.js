import { apiRequest } from "./api";

function normalizeUser(user = {}) {
    return {
        ...user,
        id: user.id,
        nombre: user.nombre ?? user.name ?? user.username ?? "",
        apellido: user.apellido ?? "",
        email: user.email ?? "",
        dni: user.dni ?? "",
        telefono: user.telefono ?? "",
        domicilio: user.domicilio ?? "",
        sexo: user.sexo ?? "",
        password: user.password ?? "",
        contrasenia: user.contrasenia ?? user.password ?? "",
        rol: user.rol ?? user.role ?? "ciudadano",
    };
}

export async function getUsers() {
    const response = await apiRequest("/api/usuarios");

    if (Array.isArray(response)) {
        return response.map(normalizeUser);
    }

    if (Array.isArray(response?.usuarios)) {
        return response.usuarios.map(normalizeUser);
    }

    if (response?.usuario) {
        return [normalizeUser(response.usuario)];
    }

    return [];
}

export async function createUser(data) {
    const response = await apiRequest("/api/usuarios", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return normalizeUser(response?.usuario ?? response);
}

export async function loginUser({ dni, contrasenia }) {
    const response = await apiRequest("/api/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ dni, contrasenia }),
    });

    return normalizeUser(response?.usuario ?? response);
}