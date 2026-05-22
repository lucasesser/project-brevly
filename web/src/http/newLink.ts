import api from "./axios";

interface newLinkInputs {
    originalLink: string,
    shortLink: string
}

export default async function newLink({originalLink, shortLink}: newLinkInputs) {
    const result = await api.post("/newlink", {original: originalLink, shortLink: shortLink})
    console.log(result);
    
}