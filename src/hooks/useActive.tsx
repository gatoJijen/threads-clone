import React, { useState } from 'react'

const useActive = () => {
    const [active, setActive] = useState<boolean>(true)
    const isActive = ()=> setActive(true)
    const notActive = ()=> setActive(false)
  return (
    {
        active,
        setActive,
        isActive,
        notActive
    }
  )
}

export default useActive