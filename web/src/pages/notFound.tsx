import NotFoundIcon from '../assets/images/404.svg?react'
import Text from '../components/text'

export default function NotFound() {
    return (
        <div className="bg-gray-200 h-dvh flex items-center justify-center">
            <div className="bg-white flex flex-col justify-center items-center rounded-lg px-12 py-16 gap-6 max-w-145 m-3">
                <NotFoundIcon className='w-48.5 h-22'/>
                <Text variant="Text Xl">Link não encontrado</Text>
                <Text variant="Text Md" className="text-gray-500 text-center">O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em brev.ly.</Text>
            </div>
        </div>
    )    
}