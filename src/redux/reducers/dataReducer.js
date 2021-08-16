/* eslint-disable import/no-anonymous-default-export */
import {
    SET_CHARACTERS, SET_CHARACTER, SET_COUNT, ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE
} from '../types';

const initialState = {
    characters: [],
    favouriteCharacters: [],
    pages: 0
};

let index;
export default function(state=initialState, action){
    switch(action.type){
        case SET_CHARACTERS:
            return {
                ...state,
                characters: action.payload
            }
        case SET_CHARACTER:
            return {
                ...state,
                characters: [action.payload] 
            }
        case SET_COUNT:
            return {
                ...state,
                pages: Math.ceil(action.payload/20)
            }
        case ADD_TO_FAVOURITE:
            return {
                ...state, 
                favouriteCharacters: [
                    action.payload,
                    ...state.favouriteCharacters
                ]
            }
        case REMOVE_FROM_FAVOURITE: 
            index = state.favouriteCharacters.findIndex(character => character.name === action.payload.name)
            state.favouriteCharacters.splice(index, 1);
            return {
                ...state
            }
        default:
            return state;
    }
}