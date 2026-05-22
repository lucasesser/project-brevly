import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './pages/home'
import Redirecting from './pages/redirecting'
import NotFound from './pages/notFound'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path=':linkEncurtado' element={<Redirecting/>}/>
            <Route path='notfound' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
)
