import { pokeApi } from "../api";
import { PokemonInfo } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string)=>{


  try {

    const {data} = await pokeApi.get<PokemonInfo>("pokemon/"+nameOrId);

    return  {
      id: data.id,
      name: data.name,
      sprites: data.sprites


  }
    
  } catch (error) {
      return null
  }



}