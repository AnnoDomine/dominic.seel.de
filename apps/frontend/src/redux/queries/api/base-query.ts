/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getCsrfToken(): string | null {
    let cookieValue: string | null = null;
    if (typeof document !== "undefined" && document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, "csrftoken".length + 1) === "csrftoken" + "=") {
                cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.VITE_API_URL || import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    prepareHeaders: (headers, { type }) => {
        if (type === "mutation") {
            const csrftoken = getCsrfToken();
            if (csrftoken) {
                headers.set("X-CSRFToken", csrftoken);
            }
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
    credentials: "include", // Include cookies in requests
    responseHandler: async (response) => {
        if (response.status === 204) {
            return null;
        }
        return response.json();
    },
});

export default baseQuery;
