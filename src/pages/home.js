import React, {useEffect, useState} from 'react';
//COMPONENTS
import Character from '../components/character';
//MUI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
//REDUX
import { connect } from 'react-redux';
import {setCharacters} from '../redux/actions/dataActions';
import character from '../components/character';


export const Home = (props) => {

    
    const {setCharacters} = props;
    const {characters, pages, favouriteCharacters} = props.data;

    const [params, setParams] = useState({
        page: 1,
        characters: "All"
    });

    const [filters, setFilters] = useState({
        gender: "",
        species: "",
        status: "",
        name: ""
    })
    
    useEffect(() => {
       setCharacters(params.page, filters);
    }, [params.page, filters])

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
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div data-testid="home-1">
            <div className="navbar">
                <Grid container id="navbar-container">
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            id="search-field"
                            name="name"
                            label="Character name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="grid-filter">
                        <FormControl className="filter-option" id="character-filter">
                            <InputLabel>Characters</InputLabel>
                            <Select
                            onChange={handleCharacters}
                            defaultValue=""
                            value={params.characters}
                            name="characters"
                            >
                                <option value="All">All</option>
                                <option value="Favourite">Favourites</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <Typography variant="h4" className="filterTitle">
                OPTIONS:
            </Typography>
            <Grid container id="filter-container">
                <Grid item xs={12} sm={6} md={4} className="grid-filter">
                    <FormControl className="filter-option">
                        <InputLabel>Gender</InputLabel>
                        <Select
                        onChange={handleChange}
                        defaultValue=""
                        value={filters.gender}
                        name="gender"
                        >
                            <option value="">All</option>
                            <option value="Unknown">Unknown</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className="grid-filter">
                    <FormControl className="filter-option">
                        <InputLabel>Species</InputLabel>
                        <Select
                        onChange={handleChange}
                        defaultValue=""
                        value={filters.species}
                        name="species"
                        >
                            <option value="">All</option>
                            <option value="Human">Human</option>
                            <option value="Alien">Alien</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className="grid-filter">
                    <FormControl className="filter-option">
                        <InputLabel>Status</InputLabel>
                        <Select
                        onChange={handleChange}
                        defaultValue=""
                        value={filters.status}
                        name="status"
                        >
                            <option value="">All</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                        </Select>
                    </FormControl>  
                </Grid>          
            </Grid>
            {params.characters === "All" ? (
                <>
                <Grid container className="main-grid">
                {characters.map((character, index) => {
                    return (
                        <Character key={index} character={character}/>
                    )
                    })}
                </Grid>
                <Pagination count={pages} page={params.page} variant="outlined" color="primary" className="paginationUl"onChange={handlePagination}/>
                </>
            ) : (
                <Grid container className="main-grid">
                    {favouriteCharacters.filter(character => {
                        if(!filters.name) return true;
                        if(character.name.toLowerCase().includes(filters.name.toLowerCase())){
                            return true;
                        }
                        return false;
                    })
                    .map((character, index) => {
                        return (
                            <Character key={index} character={character}/>
                        )
                    })}
                </Grid>
            )}

           
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {
    setCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
