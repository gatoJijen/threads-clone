import SearchInput from '@/app/public/SearchInput'
import React from 'react'

const Search = () => {
  return (
    <article className='flex items-center background-2 h-[45px] px-6 py-2 w-[90vw] mt-[24px] border border-white border-opacity-20  rounded-2xl gap-[10px]'>
        <button>
          <SearchInput/>
        </button>
        <input placeholder='Buscar' className='bg-transparent h-[20px] focus:opacity-100 opacity-70 text-sm w-full text-white focus:outline-none' type="text" />
    </article>
  )
}

export default Search