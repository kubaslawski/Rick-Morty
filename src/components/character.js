import React, {useState} from 'react';
//MUI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//REDUX
import {connect} from 'react-redux';
import {addCharacter, removeCharacter} from '../redux/actions/dataActions';

const Character = props => {

    const {character, addCharacter, removeCharacter} = props;
    const {favouriteCharacters} = props.data;


    const addFavourite = () => {
        addCharacter(character);
    }

    const removeFavourite = () => {
        removeCharacter(character);
    }


    return (
        <Grid item xs={12} sm={6} md={3} lg={2} xl={1} data-testid="character-1">
            <Card className="character-card">
                <CardContent className="character-cardContent">
                <div>
                    <img src={character.image} alt="car" className="offer-photo"/>
                </div>
                <div className="character-detailsDiv">
                    <Typography className="character-name"> 
                        {character.name} 
                    </Typography>
                    <Typography className="character-details">
                        Race: {character.species} <br/>
                        Gender: {character.gender} <br/>
                        Status :{character.status}  <br/>
                        {character.type && (
                            <span>Type: {character.type}</span> 
                        )}
                    </Typography>
                </div>

                
                </CardContent>
                <CardActions className="character-cardActions">
                    <div className="buttonContainer">
                        {favouriteCharacters.includes(character)  ? (
                            <Button variant="contained" color="secondary" className="btn" type="submit" onClick={removeFavourite}>
                              Remove from favourites
                          </Button>
                        ) : (
                            <Button variant="contained" color="primary" className="btn" type="submit" onClick={addFavourite}>
                                Add to favourite
                            </Button>
                        )}
                    </div>
                </CardActions>
            </Card>
        </Grid>

    )
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = ({
    addCharacter,
    removeCharacter
})

export default connect(mapStateToProps, mapDispatchToProps)(Character);
