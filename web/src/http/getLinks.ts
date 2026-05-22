import api from "./axios";

export default async function getLinks() {
    interface resultType {
        id: string,
        linkOriginal: string,
        linkEncurtado: string,
        accessCount: number
    }

    const result = await api.get<resultType[]>("/listurls")

    return result.data
}