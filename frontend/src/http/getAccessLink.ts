import api from "./axios";

export default async function getAccessLink(linkEncurtado: string) {
    try {
        const result = await api.get(`/accesslink/${linkEncurtado}`)
        return result.data?.originalUrl
    } catch {
        return undefined   
    }
}