//ACTIONS
import {
    SET_CHARACTERS,
    SET_CHARACTER,
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
                    name: "${filter.name}",
                }) {
                  info {
                    count
                  }
                  results {
                    name,
                    id,
                    status,
                    species, 
                    type,
                    gender,
                    image,
                    created,
                    episode {
                        id,
                        name
                    }
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

export const setCharacter = (filter) => dispatch => {
    if(filter.id !== ""){
        fetch(`https://rickandmortyapi.com/graphql/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                query {
                    character(id: "${filter.id}"){
                      id,
                      name,
                      gender,
                      species,
                      image,
                      episode {
                        id,
                        name
                    }
                    }
                  }              
                `
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: SET_CHARACTER,
                payload: data.data.character
            })
        })
        .catch(err => console.log(err))
    } else {
        setCharacters();
    }
}

export const setCharactersByEpisode = episode => dispatch => {
    if(episode !== ""){
        fetch(`https://rickandmortyapi.com/graphql/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                query {
                    episode(id: "${episode}") {
                      id,
                      name, 
                      air_date, 
                      episode, 
                      characters {
                        id,
                        name,
                        status, 
                        species,
                        type,
                        gender,
                        image,
                        episode {
                            id, 
                            name
                        }
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
                payload: data.data.episode.characters
            })
        })
        .catch(err => console.log(err))
    } 
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
