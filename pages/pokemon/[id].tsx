import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { pokeApi } from '../../api'
import { MainLayout } from '../../components/layout'
import { PokemonInfo } from '../../interfaces'
import { NextPageWithLayout } from '../_app'
import { Button, Card, Container, Grid, Text ,Image} from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../utils'

import confetti from "canvas-confetti"
import { redirect } from 'next/dist/server/api-utils'



interface Props {

  pokemon:PokemonInfo

}

const PokemonPage: NextPageWithLayout<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) );

 

  const onToggleFav = ()=>{
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites );

    if(!isInFavorites){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      })

    }
    
  }

  useEffect(() => {
    console.log("use effect", localStorage.getItem("favorites"));
    
  
  
  }, [])
  

  return (
    <Grid.Container css={{marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>

        <Card>
          <Card.Body>
            <Card.Image 
            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
            alt={pokemon.name}
            width="100%"
            height={200}
            />
              
            
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>

        <Card>
          <Card.Header css={{display:'flex', justifyContent:"space-between"}}>
            <Text h1 transform="capitalize" >{pokemon.name}</Text>
            <Button 
                      color="gradient"
                      ghost={ !isInFavorites }
                      onClick={ onToggleFav }
                    >
                      { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                    </Button>


          </Card.Header>
          <Card.Body>
            <Text>Sprites</Text>

            <Container direction='row'  display='flex'>
              <Image 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
              />
              <Image 
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
              width={150}
              height={100}
              />
              <Image 
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              width={100}
              height={100}
              />

              <Image 
              src={pokemon.sprites.back_shiny}
              alt={pokemon.name}
              width={100}
              height={100}
              />
            </Container>
           
              
            
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  )
}


PokemonPage.getLayout = function getLayout(page: ReactElement) {
    const {name} = page.props.pokemon as PokemonInfo
    return (
      <MainLayout title={name}>
        {page}
      </MainLayout>
    )
  }


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemonList = [...Array(151)].map((value,index)=>""+(index+1))
  //la cantidad de path que tenga en el array seran las paginas
  //que se crean en build
  return {
    paths: pokemonList.map((id)=>({
      params:{id:id}

    })),
    //con esto logramos que se generen en tiempo de ejecución las pantallas
    fallback: "blocking"
  }
}




export const getStaticProps: GetStaticProps = async ({params}) => {
  //const { data } = await  // your fetch function here 
  const { id } = params as {id : string}
  const pokemon = await getPokemonInfo(id);
  //si no existe volvemos al home
  if (!pokemon){
    return {
      redirect:{
        destination:"/",
        permanent:false
      }
    }
  }

  
  return {
    props: {
      pokemon
      
    },
    revalidate: 86400 //las paginas se evaluan cada 24 h  (24 *60 *60 s)
}


}


  export default PokemonPage