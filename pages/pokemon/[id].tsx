import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { pokeApi } from '../../api'
import { MainLayout } from '../../components/layout'
import { PokemonInfo } from '../../interfaces'
import { NextPageWithLayout } from '../_app'
import { Button, Card, Container, Grid, Text ,Image} from '@nextui-org/react';



interface Props {

  pokemon:PokemonInfo

}

const PokemonPage: NextPageWithLayout<Props> = ({pokemon}) => {


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
            <Button color="gradient" ghost>Añadir a favoritos</Button>


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
    fallback: false
  }
}




export const getStaticProps: GetStaticProps = async ({params}) => {
  //const { data } = await  // your fetch function here 
  const { id } = params as {id : string}
  const {data} = await pokeApi.get<PokemonInfo>("pokemon/"+id);

  
  return {
    props: {
      pokemon: data
      
    }
  }
}


  export default PokemonPage