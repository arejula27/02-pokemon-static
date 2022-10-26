import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'




type props =PropsWithChildren & {
  title?:string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const MainLayout:FC<props>= ({children,title}) => {
  return (
    <>
    <Head>
        <title>{title || "Pokemón App"}</title>
        <meta name='author' content='Íñigo Aréjula'/>
        <meta name='description' content={`Información sobre el pokémon ${title}`}/>
        <meta name='keywords' content={`${title}, pokémon, pokedex`}/>

        {/* meta tags para que quede bonito al compartir*/}
        <meta property="og:title" content={`Información sobre ${ title }`} />
        <meta property="og:description" content={`La info sobre ${ title } en la pokedex más pocha que verás`} />
        <meta property="og:image" content={`${ origin }/img/banner.png`} />

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

 

