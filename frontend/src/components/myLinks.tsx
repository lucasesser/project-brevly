import Button from "./button";
import Text from "./text";
import Download from '../assets/icons/download-simple.svg?react'
import NoLinks from "./noLinks";
import LinkItem from "./linkItem";
import { useState } from "react";
import axios from "axios";
import exportLinks from "../http/exportLinks";
import { toast } from "sonner";
import { ScrollArea } from "radix-ui";

type linksType = {
    id: string,
    linkOriginal: string,
    linkEncurtado: string,
    accessCount: number
}

export default function MyLinks({links, onDelete}: {links: linksType[], onDelete: () => void}) {
    const [subVariantButton, setSubVariantButton] = useState<"default" | "hover" | "disabled">("default")

    async function handleDownload() {
        try {
            setSubVariantButton("disabled")
            const url = await exportLinks()   
            if(url) {
                const response = await axios.get(url, {
                    responseType: 'blob',
                })
                const blobUrl = window.URL.createObjectURL(response.data)
                const link = document.createElement('a')
                link.href = blobUrl
                link.download = 'links.csv'
                link.click()
                window.URL.revokeObjectURL(blobUrl)
            }
        } catch {            
            toast.error("Erro ao baixar o arquivo.")
        } finally {
            setSubVariantButton("default")
        }
    }

    return(
        <div className="flex flex-col justify-center p-6 pr-5 md:p-8 bg-white rounded-lg max-w-95 md:max-w-145 w-full h-max gap-4 md:gap-5">
            <div className="w-full flex justify-between items-center">
                <Text variant="Text Lg">Meus links</Text>
                <Button
                    variant="secondary"
                    subVariant={subVariantButton}
                    svg={Download}
                    onMouseEnter={() => subVariantButton != "disabled" && setSubVariantButton("hover")}
                    onMouseLeave={() => subVariantButton != "disabled" && setSubVariantButton("default")}
                    onClick={() => subVariantButton != "disabled" && handleDownload()}
                >
                    Baixar CSV
                </Button>
            </div>
            <div>
                <ScrollArea.Root className="overflow-hidden" type="hover">
                    <ScrollArea.Viewport className="max-h-63 md:max-h-130">
                        {links.length > 0 ? (
                            links.map((link) => (
                                <LinkItem key={link.id} id={link.id} linkEncurtado={
                                link.linkEncurtado} linkOriginal={link.linkOriginal} accessCount={link.accessCount} onDelete={onDelete}/>
                            ))
                        ) : (
                            <NoLinks />
                        )}
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex w-1.5 touch-none select-none bg-gray-200 p-0.5"
                        orientation="vertical"
                    >
			            <ScrollArea.Thumb className="flex-1 rounded-[10px] bg-blue-base " />
		            </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </div>
    )
}

