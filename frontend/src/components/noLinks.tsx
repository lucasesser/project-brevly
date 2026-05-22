import Link from '../assets/icons/link.svg?react'
import Text from './text'

export default function NoLinks() {
    return(
        <div className="flex flex-col justify-center items-center border-t-2 border-gray-200 pt-9 pb-6 gap-3">
            <Link className="fill-gray-400 size-8"/>
            <Text variant="Text Xs" className="justify-center">AINDA NÃO EXISTEM LINKS CADASTRADOS</Text>
        </div>
    )
}