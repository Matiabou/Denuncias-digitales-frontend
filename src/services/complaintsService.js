import { apiRequest } from "./api";

function normalizeComplaint(complaint = {}) {
    return {
        ...complaint,
        id: complaint.id,
        title: complaint.title ?? complaint.titulo ?? "",
        type: complaint.type ?? complaint.tipo ?? "",
        description: complaint.description ?? complaint.descripcion ?? "",
        address: complaint.address ?? complaint.direccion ?? "",
        date: complaint.date ?? complaint.fecha ?? "",
        time: complaint.time ?? complaint.hora ?? "",
        estado: complaint.estado ?? complaint.status ?? "En revisión",
        usuarioId:
            complaint.usuarioId ?? complaint.idUsuario ?? complaint.userId ?? null,
    };
}

function buildComplaintPayload(data, user) {
    const userId = user?.id ?? data.usuarioId ?? data.idUsuario ?? data.userId;

    return {
        title: data.title,
        titulo: data.title,
        type: data.type,
        tipo: data.type,
        description: data.description,
        descripcion: data.description,
        address: data.address,
        direccion: data.address,
        date: data.date,
        fecha: data.date,
        time: data.time,
        hora: data.time,
        usuarioId: userId,
        idUsuario: userId,
    };
}

export async function getComplaints(user) {
    const path = user?.rol === "admin" || !user?.id
        ? "/api/denuncias"
        : `/api/denuncias/usuario/${user.id}`;

    const response = await apiRequest(path);

    if (Array.isArray(response)) {
        return response.map(normalizeComplaint);
    }

    if (Array.isArray(response?.denuncias)) {
        return response.denuncias.map(normalizeComplaint);
    }

    if (response?.denuncia) {
        return [normalizeComplaint(response.denuncia)];
    }

    return [];
}

export async function getComplaintById(id) {
    const response = await apiRequest(`/api/denuncias/${id}`);

    return normalizeComplaint(response?.denuncia ?? response);
}

export async function createComplaint(data, user) {
    const response = await apiRequest("/api/denuncias", {
        method: "POST",
        body: JSON.stringify(buildComplaintPayload(data, user)),
    });

    return normalizeComplaint(response?.denuncia ?? response);
}

export async function updateComplaint(id, data, user) {
    const response = await apiRequest(`/api/denuncias/${id}`, {
        method: "PUT",
        body: JSON.stringify(buildComplaintPayload(data, user)),
    });

    return normalizeComplaint(response?.denuncia ?? response);
}