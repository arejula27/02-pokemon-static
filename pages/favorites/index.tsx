import React, { ReactElement, useEffect, useState } from 'react'
import { MainLayout } from '../../components/layout';
import { NextPageWithLayout } from '../_app';
import { NoFavs } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';
import { FC } from 'react';

const FavoritesPage:FC = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );
  }, []);


  return (
    <MainLayout title='Favoritos'>
     {
          favoritePokemons.length === 0 
            ? ( <NoFavs /> )
            : ( <FavoritePokemons pokemons={favoritePokemons} /> )
              }
    </MainLayout>
  )
}



export default FavoritesPage;