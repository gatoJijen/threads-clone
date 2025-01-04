import Link from 'next/link'
import React from 'react'

interface LinkFProps {
    title: string,
    url: string
}

const LinkF:React.FC<LinkFProps> = ({title, url}) => {
  return (
    <Link href={url}><h1>{title}</h1></Link>
  )
}

export default LinkF