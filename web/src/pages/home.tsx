import NewLink from '../components/newLink'
import Logo from '../assets/images/Logo.svg?react'
import MyLinks from '../components/myLinks'
import { Toaster } from 'sonner'
import { useEffect, useState } from 'react'
import getLinks from '../http/getLinks'

export default function Home() {
    type linksType = {
        id: string,
        linkOriginal: string,
        linkEncurtado: string,
        accessCount: number
    }

    const [links, setLinks] = useState<linksType[]>([])

    async function loadData() {
        const linksReturn = await getLinks()
        setLinks(linksReturn)            
    }

    useEffect(() => {
      loadData()
    }, [])

  return (
    <main className='h-dvh bg-gray-200 flex flex-col justify-center items-center p-2'>
      <Toaster richColors/>
      <div className="flex flex-col items-center md:items-start max-w-245 w-full gap-8">
        <Logo className="fill-blue-base w-24.5 h-6"/>
        <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-5">
          <NewLink onCreate={loadData}/>
          <MyLinks links={links} onDelete={loadData}/>
        </div>
      </div>
    </main>
  )
}