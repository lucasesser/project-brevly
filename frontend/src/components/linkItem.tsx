import IconButton from "./iconButton";
import Text from "./text";
import Copy from "../assets/icons/copy.svg?react"
import Trash from "../assets/icons/trash.svg?react"
import deleteLink from "../http/deleteLink";
import { toast } from "sonner";
import { Link } from "react-router";

interface itemInputs {
    id: string
    linkOriginal: string,
    linkEncurtado: string,
    accessCount: number,
    onDelete: () => void
}

export default function LinkItem({id, linkOriginal, linkEncurtado, accessCount, onDelete}: itemInputs) {

    async function onClickDelete (id: string) {
        try {
            await deleteLink(id)
            toast.success("Link excluido!")
        } catch {
            toast.error("Falha ao excluir link!")
        } finally {
            onDelete()
        }
    }

    return(
        <div className="flex border-t-2 border-gray-200 py-4 justify-between items-center">
            <Link to={"/"+linkEncurtado} ><div className="flex flex-col">
                <Text variant="Text Md" className="text-blue-base">{"brev.ly/" + linkEncurtado}</Text>
                <Text variant="Text Sm">{linkOriginal}</Text>
            </div></Link>
            <div className="flex flex-row items-center gap-5">
                <Text variant="Text Sm">{accessCount} acessos</Text>
                <div className="flex flex-row gap-1">
                    <IconButton svg={Copy} onClick={async () => {await navigator.clipboard.writeText(linkEncurtado); toast("Link copiado")}}/>
                    <IconButton svg={Trash} onClick={async () => onClickDelete(id)}/>
                </div>
            </div>
        </div>
    )
}