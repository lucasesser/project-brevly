import api from "./axios";

export default async function deleteLink(id: string) {
    await api.post("/deletelink", {uuid: id})
}