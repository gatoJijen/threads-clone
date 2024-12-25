import { useState } from 'react'

const useActive = () => {
    const [active, setActive] = useState<boolean>(true)
    const [activeSearch, setActiveSearch] = useState<boolean>(true)
    const [activeHeart, setActiveHeart] = useState<boolean>(true)
    const [activeProfile, setActiveProfile] = useState<boolean>(true)
    const isActive = ()=> setActive(true)
    const notActive = ()=> setActive(false)
    const isActiveS = ()=> setActiveSearch(true)
    const notActiveS = ()=> setActiveSearch(false)
    const isActiveH = ()=> setActiveHeart(true)
    const notActiveH = ()=> setActiveHeart(false)
    const isActiveP = ()=> setActiveProfile(true)
    const notActiveP = ()=> setActiveProfile(false)
  return (
    {
        active,
        setActive,
        isActive,
        notActive,
        isActiveS,
        notActiveS,
        isActiveH,
        notActiveH,
        isActiveP,
        notActiveP,
        activeHeart,
        setActiveHeart,
        activeProfile,
        setActiveProfile,
        activeSearch,
        setActiveSearch
    }
  )
}

export default useActive