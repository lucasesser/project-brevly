import api from "./axios";

export default async function exportLinks() {
    try {
        const result = await api.post("/exportlinks", {})
        const url: string = result.data?.url
        return url
    } catch {
        return undefined
    }
}