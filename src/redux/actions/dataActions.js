//ACTIONS
import {
    SET_CHARACTERS,
    SET_COUNT,
    ADD_TO_FAVOURITE,
    REMOVE_FROM_FAVOURITE,
    
} from '../types';


export const setCharacters = (page, filter) => dispatch => {
    fetch(`https://rickandmortyapi.com/graphql/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
            query {
                characters(page: ${page}, filter: {
                    status: "${filter.status}",
                    gender: "${filter.gender}",
                    species: "${filter.species}",
                    name: "${filter.name}",
                }) {
                  info {
                    count
                  }
                  results {
                    name,
                    status,
                    species, 
                    type,
                    gender,
                    image,
                    created
                  }
                }
              }
            `
        })
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: SET_CHARACTERS,
            payload: data.data.characters.results
        })
        dispatch({
            type: SET_COUNT,
            payload: data.data.characters.info.count
        })}
        
    )
    .catch(err => console.log(err))
}

export const addCharacter = character => dispatch => {
    dispatch({
        type: ADD_TO_FAVOURITE,
        payload: character
    })
}

export const removeCharacter = character => dispatch => {
    dispatch({
        type: REMOVE_FROM_FAVOURITE,
        payload: character
    })
}
