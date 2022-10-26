const FavKey= "favorites"

const toggleFavorite = (id: number) =>{

    let favorites: number[] = JSON.parse(localStorage.getItem(FavKey) || "[]");
    if (favorites.includes(id)){
        favorites = favorites.filter(pokeId=> pokeId != id)
    }else{
        favorites.push(id)
    }

    localStorage.setItem(FavKey,JSON.stringify(favorites) );

}

const existInFavorites = (id:number):boolean=>{

    //evitar que se ejecute en el server
    if(typeof window === "undefined") return false

    //estamos seguros que estamos en el cliente
    let favorites: number[] = JSON.parse(localStorage.getItem(FavKey) || "[]");
    return favorites.includes(id)


        
    

    

}

const pokemons = (): number[] => {
    return JSON.parse( localStorage.getItem('favorites') || '[]' );
}


export default {
    toggleFavorite,
    existInFavorites,
    pokemons
}