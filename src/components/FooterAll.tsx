import React from 'react'
import LinkF from './LinkF'

const FooterAll = () => {
    return (
        <ul className='flex gap-4 text-xs opacity-45 mediaFAll'>
            <li>© 2025</li>
            <li className='hover:underline transition-all'><LinkF title="Condiciones de Threads" url="/" /></li>
            <li className='hover:underline transition-all'><LinkF title="Politíca de privacidad" url="/" /></li>
            <li className='hover:underline transition-all'><LinkF title="Politíca de cookies" url="/" /></li>
            <li className='hover:underline transition-all'><LinkF title="Configuración de cookies" url="/" /></li>
            <li className='hover:underline transition-all'><LinkF title="Informar de un problema" url="/" /></li>
        </ul>
    )
}

export default FooterAll