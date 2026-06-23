import { apiRequest } from "./api";

function normalizeTypeValue(value) {
  if (typeof value !== "string") return "";

  return value.trim().toLowerCase();
}

function normalizeComplaint(complaint = {}) {
  const id = complaint.id ?? complaint._id ?? complaint.idDenuncia ?? null;

  return {
    ...complaint,
    id,
    titulo: complaint.titulo ?? complaint.title ?? "",
    title: complaint.title ?? complaint.titulo ?? "",
    tipo: complaint.tipo ?? complaint.type ?? "",
    type: complaint.type ?? complaint.tipo ?? "",
    descripcion: complaint.descripcion ?? complaint.description ?? "",
    description: complaint.description ?? complaint.descripcion ?? "",
    ubicacion:
      complaint.ubicacion ?? complaint.address ?? complaint.direccion ?? "",
    address:
      complaint.address ?? complaint.direccion ?? complaint.ubicacion ?? "",
    fecha: complaint.fecha ?? complaint.date ?? "",
    date: complaint.date ?? complaint.fecha ?? "",
    hora: complaint.hora ?? complaint.time ?? "",
    time: complaint.time ?? complaint.hora ?? "",
    usuarioId:
      complaint.usuarioId ??
      complaint.idUsuario ??
      complaint.userId ??
      complaint.usuario ??
      null,
    estado: complaint.estado ?? complaint.status ?? "En revisión",
    evidencias: complaint.evidencias ?? complaint.evidencia ?? [],
  };
}

function buildComplaintPayload(data, user) {
  const userId =
    data.usuarioId ??
    data.idUsuario ??
    data.userId ??
    data.usuario ??
    user?.id ??
    user?.idUsuario ??
    user?.usuarioId ??
    user?._id ??
    null;

  return {
    titulo: data.titulo ?? data.title ?? "",
    descripcion: data.descripcion ?? data.description ?? "",
    tipo: data.type ?? data.tipo ?? "",
    fecha: data.fecha ?? data.date ?? "",
    hora: data.time ?? data.hora ?? "",
    ubicacion: data.ubicacion ?? data.address ?? data.direccion ?? "",
    estado: data.estado ?? data.status ?? "En revisión",
    evidencias: data.evidencias ?? [],
    usuarioId: userId,
  };
}

export async function getComplaints(user) {
  const userId = user?.id ?? user?.idUsuario ?? user?.usuarioId ?? user?._id;

  const path =
    user?.rol === "admin" || !userId
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
  console.log("RESPUESTA BACKEND:", response);
  return normalizeComplaint(response?.denuncia ?? response);
}

export async function getComplaintsByType(tipo) {
  const normalizedTipo = normalizeTypeValue(tipo);
  const response = await apiRequest(
    `/api/denuncias/tipo/${encodeURIComponent(normalizedTipo)}`,
  );

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

export async function uploadEvidence(id, formData) {
  const response = await apiRequest(`/api/denuncias/${id}/evidencia`, {
    method: "POST",
    body: formData,
  });

  return response?.denuncia ?? response;
}
