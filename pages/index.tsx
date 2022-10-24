import { Button } from '@nextui-org/react'
import type { GetStaticProps } from 'next'
import { ReactElement } from 'react'
import { MainLayout } from '../components/layout'
import type { NextPageWithLayout } from './_app'
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces';


interface Props{
  pokemons: SmallPokemon[]
}


const HomePage: NextPageWithLayout<Props> = ({pokemons}) => {


  
  return (
    <>
      <ul>

        {pokemons.map((pok)=>{

          return <li key={pok.id}>{pok.name +" "+pok.id}</li>
        })}
        

      </ul>
    </>
  )
}


HomePage.getLayout = function getLayout(page: ReactElement) {
  
  return (
    <MainLayout title='Listado pokémon'>
      {page}
    </MainLayout>
  )
}



// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.



// las props de esta función se mandan a la página de arriba
export const getStaticProps: GetStaticProps = async (ctx) => {
  //esta función solo se ejecuta en build time, no veremos sus logs en el navegador
  console.log("hola mundo");

  const {data} = await pokeApi.get<PokemonListResponse>("pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((pokemon,index)=>{
    pokemon.id= index +1
    pokemon.image=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    return pokemon

  });
  
  return {
    props: {
      pokemons: pokemons
      
    }
  }
}


export default HomePage
