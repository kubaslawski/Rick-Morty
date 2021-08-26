import React, {useEffect, useState, useRef} from 'react';
//COMPONENTS
import NewCharacter from '../components/table-character';
//MUI
import Pagination from '@material-ui/lab/Pagination';
//ICONS
import search from "../icons/search.svg";
//REDUX
import { connect } from 'react-redux';
import {setCharacter, setCharacters, setCharactersByEpisode} from '../redux/actions/dataActions';


export const Home = (props) => {

    const isMounted = useRef(false);
    const {setCharacters, setCharacter, setCharactersByEpisode} = props;
    const {characters, pages, favouriteCharacters} = props.data;


    const [params, setParams] = useState({
        page: 1,
        characters: "All"
    });

    const [filters, setFilters] = useState({
        name: "",
        id: "",
        episode: ""
    })
    
    useEffect(() => {
       setCharacters(params.page, filters);
    }, [params.page, filters.name])

    useEffect(() => {
        if(isMounted.current){
            if(filters.id){
                setCharacter(filters);
            } else {
                setCharacters(params.page, filters);
            }
        } else {
            isMounted.current = true;
        }
    }, [filters.id])

    useEffect(() => {
        if(isMounted.current){
            if(filters.episode){
                setCharactersByEpisode(filters.episode);
            } else {
                setCharacters(params.page, filters);
            }
        } else {
            isMounted.current = true;
        }
    }, [filters.episode])

    // const handlePagination = event => {
    //     console.log(event.target)
    //     setParams({
    //         ...params,
    //         page: parseInt(event.target.innerText)
    //     });
    // }

    const handlePagination = (event, value) => {
        setParams({
            ...params, 
            page: value
        });
    }

    const handleCharacters = event => {
        setParams({
            ...params,
            [event.target.name]: event.target.value
        })
    }

    const handleChange = event => {
        let option = document.getElementById("search-select").value;
        setFilters({
            ...filters, 
            [option]: event.target.value
        })
    }

    return (
        <div data-testid="home-1">
            <div className="search-container">
                <div id="container-border">
                    <div className="search-p">
                        <p>Search By</p>
                    </div>
                        <select id="search-select">
                            <option value="name">Name</option>
                            <option value="id">Identifier</option>
                            <option value="episode">Episode ID</option>
                        </select>
                    <div className="search-input">
                    <input id="input-select" onChange={handleChange} />
                    <img src={search} alt="search"/>
                    </div>
                </div>
            </div>
            <div id="character-change-div">
                <button style={params.characters === "All" ? {color: '#11B0C8', borderBottom: '3px solid #11B0C8'} : {}} name="characters" value="All" onClick={handleCharacters}>All Characters</button>
                <button style={params.characters === "Favourites" ? {color: '#11B0C8', borderBottom: '3px solid #11B0C8'} : {}} name="characters" value="Favourites" onClick={handleCharacters}>Favourites</button>
            </div>
            <table className="table-1">
                <tbody>
                <tr>
                    <td>Photo</td>
                    <td>Character ID</td>
                    <td>Name</td>
                    <td>Gender</td>
                    <td>Species</td>
                    <td>Last Episode</td>
                    <td>Add To Favorites</td>
                </tr>
                {params.characters === "All" ? (
                    <>
                    {characters.filter(character => {
                        if(!filters.name) return true;
                        if(character.name.toLowerCase().includes(filters.name.toLowerCase())){
                            return true;
                        }
                        return false;
                    })
                    .map((character, index) => {
                        return (
                            <NewCharacter key={index} character={character}/>
                        )
                    })}
                </>
                ) : (
                    <>
                        {favouriteCharacters.filter(character => {
                            if(!filters.name) return true;
                            if(character.name.toLowerCase().includes(filters.name.toLowerCase())){
                                return true;
                            }
                            return false;
                        })
                        .filter(character => {
                            if(!filters.id) return true;
                            if(character.id === filters.id){
                                return true;
                            }
                            return false;
                        })
                        .filter(character => {
                            if(!filters.episode) return true;
                            for(var i=0; i<character.episode.length; i++){
                                if(character.episode[i].id === filters.episode){
                                    return true;
                                }
                            }
                            return false;
                        })
                        .sort((a, b) => a.id - b.id)
                        .map((character) => {
                            return (
                                <NewCharacter key={character.id} character={character}/>
                            )
                        })}
                    </>
                )}
            </tbody>
            </table>
            {filters.name === "" && filters.episode === "" && filters.id === "" && params.characters === "All" ? (
                        <Pagination color="primary" count={pages} page={params.page} variant="outlined" shape="rounded" className="paginationUl" onChange={handlePagination}/>
                    ) : (
                        null
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {
    setCharacters,
    setCharactersByEpisode,
    setCharacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
