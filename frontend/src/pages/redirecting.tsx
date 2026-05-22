import LogoIcon from '../assets/icons/Logo_Icon.svg?react'
import Text from '../components/text'
import { useParams, useNavigate } from 'react-router'
import getAccessLink from '../http/getAccessLink'
import { useEffect, useState } from 'react'

export default function Redirecting() {
    const linkEncurtado = useParams().linkEncurtado
    const [linkOriginal, setLinkOriginal] = useState("")
    let navigate = useNavigate()

    async function accessLink(linkEncurtado: string) {
        const originalLink = await getAccessLink(linkEncurtado)
        console.log(originalLink);
        setLinkOriginal(originalLink)
        if(originalLink){
            window.location.href = originalLink
        }else{
            navigate("/notfound")
        }
    }

    useEffect(() => {
        linkEncurtado && accessLink(linkEncurtado)
    }, [])

    return(
        <div className="h-dvh bg-gray-200 flex justify-center items-center">
            <div className="bg-white flex flex-col justify-center items-center py-16 px-12 rounded-lg gap-6 m-3 max-w-145 w-full">
                <LogoIcon className="size-12"/>
                <Text variant="Text Xl">Redirecionando...</Text>
                <div className="flex flex-col items-center justify-center gap-1">
                    <Text variant="Text Md" className="text-gray-500 text-center">O link será aberto automaticamente em alguns instantes.</Text>
                    <Text variant="Text Md" className="text-gray-500">Não foi redirecionado? <a href={linkOriginal} className="text-blue-base underline">Acesse aqui</a></Text>
                </div>
            </div>
        </div>
    )
}