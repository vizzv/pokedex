import  axios  from 'axios'
import React, { useState } from 'react'
import Pokemon from './Pokemon'
function PokemonList({pokemon}) {
  return (
    <div className='flex flex-col items-center justify-center md:flex-row  md:flex-wrap '>
        {
            pokemon.map(p=>(<div key={p} className='inline p-2 m-5 '> <Pokemon pname={p}/> </div>
            ))
        }
    </div>
  )
}

export default PokemonList