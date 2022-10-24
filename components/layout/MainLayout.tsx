import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'




type props =PropsWithChildren & {
  title?:string
}

export const MainLayout:FC<props>= ({children,title}) => {
  return (
    <>
    <Head>
        <title>{title || "Pokemón App"}</title>
        <meta name='author' content='Íñigo Aréjula'/>
        <meta name='description' content={`Información sobre el pokémon ${title}`}/>
        <meta name='keywords' content={`${title}, pokémon, pokedex`}/>
    </Head>
    <Navbar/>
    <main style={{
      padding: '0px 20px',
    }}>
      
      
      {children}
      
      </main>    
    </>
  )
}

 

