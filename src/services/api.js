const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function buildUrl(path) {
    if (!apiBaseUrl) {
        throw new Error("VITE_API_URL no está configurada");
    }

    return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseResponse(response) {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    return response.text();
}

export async function apiRequest(path, options = {}) {
    const hasFormData = options.body instanceof FormData;
    const response = await fetch(buildUrl(path), {
        headers: hasFormData
            ? { ...(options.headers || {}) }
            : {
                  "Content-Type": "application/json",
                  ...(options.headers || {}),
              },
        ...options,
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
        const message =
            typeof payload === "string"
                ? payload
                : payload?.message || payload?.error || `Error HTTP ${response.status}`;

        throw new Error(message);
    }

    return payload;
}