import React, { ReactElement } from 'react'
import { MainLayout } from '../../components/layout';
import { NextPageWithLayout } from '../_app';

const FavoritesPage:NextPageWithLayout = () => {
  return (
    <div>FavoritesPage</div>
  )
}


FavoritesPage.getLayout = function getLayout(page: ReactElement) {
  
  return (
    <MainLayout title='Favoritos'>
      {page}
    </MainLayout>
  )
}

export default FavoritesPage;