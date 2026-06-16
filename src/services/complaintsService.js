import { apiRequest } from "./api";

function normalizeComplaint(complaint = {}) {
    const id = complaint.id ?? complaint._id ?? complaint.idDenuncia ?? null;

    return {
        ...complaint,
        id,
        title: complaint.title ?? complaint.titulo ?? "",
        type: complaint.type ?? complaint.tipo ?? "",
        description: complaint.description ?? complaint.descripcion ?? "",
        address: complaint.address ?? complaint.direccion ?? complaint.ubicacion ?? "",
        date: complaint.date ?? complaint.fecha ?? "",
        time: complaint.time ?? complaint.hora ?? "",
        usuarioId: complaint.usuarioId ?? complaint.idUsuario ?? complaint.userId ?? complaint.usuario ?? null,
        descripcion: complaint.descripcion ?? complaint.description ?? "",
        fecha: complaint.fecha ?? complaint.date ?? "",
        ubicacion: complaint.ubicacion ?? complaint.address ?? complaint.direccion ?? "",
        estado: complaint.estado ?? complaint.status ?? "En revisión",
    };
}

function buildComplaintPayload(data, user) {
    const userId =
        user?.id ??
        user?.idUsuario ??
        user?.usuarioId ??
        user?._id ??
        data.usuarioId ??
        data.idUsuario ??
        data.userId ??
        data.usuario ??
        null;

    return {
        descripcion: data.descripcion ?? data.description ?? "",
        fecha: data.fecha ?? data.date ?? "",
        ubicacion: data.ubicacion ?? data.address ?? data.direccion ?? "",
        estado: data.estado ?? data.status ?? "En revisión",
        usuarioId: userId,
    };
}

export async function getComplaints(user) {
    const userId = user?.id ?? user?.idUsuario ?? user?.usuarioId ?? user?._id;

    const path = user?.rol === "admin" || !userId
        ? "/api/denuncias"
        : `/api/denuncias/usuario/${userId}`;

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
    const response = await apiRequest("/api/denuncias", 
        { method: "POST", body: JSON.stringify(buildComplaintPayload(data, user)), });
         return normalizeComplaint(response?.denuncia ?? response); }

export async function updateComplaint(id, data, user) {
    const response = await apiRequest(`/api/denuncias/${id}`, {
        method: "PUT",
        body: JSON.stringify(buildComplaintPayload(data, user)),
    });

    return normalizeComplaint(response?.denuncia ?? response);
}

export async function exportComplaintPDF(id) {
    const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    const url = `${apiBaseUrl}/api/denuncias/${id}/pdf`;
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error al descargar PDF: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `denuncia-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
}