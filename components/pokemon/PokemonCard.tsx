import { Card, Grid, Row ,Text} from "@nextui-org/react"
import router from "next/router"
import Router from "next/router"
import { FC } from "react"
import { SmallPokemon } from "../../interfaces"

interface Props{
    pokemon:SmallPokemon
}


export const PokemonCard:FC <Props> = ({pokemon}) => {

  const onClick = ()=>{
    router.push(`/pokemon/name/${pokemon.name}`)

  }

  return (
     //hay 12 epacios en la pantalla, este número indica
          //cuatos usará un elemento, de tal forma que si usamos 
          // un valor de 6 solo habrá dos elementos por pantalla
          <Grid xs={6} sm={3} md={2} xl={2} key={pokemon.id}>
            <Card isHoverable isPressable onClick={onClick}>

              <Card.Body css={{p:1}}>
                <Card.Image
                  src={pokemon.image}
                  width="100%"
                  height={240}
                  objectFit="contain"
                  alt={`${pokemon.name} image`}

               />
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row justify='space-between'>
                  <Text transform='capitalize'>{pokemon.name}</Text>
                  <Text>{"#"+pokemon.id}</Text>
                  
                </Row>
              </Card.Footer>
            </Card>
            
          </Grid>
  )
}
