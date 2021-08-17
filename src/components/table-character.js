import React from 'react';
//ICONS
import blueStar from "../icons/star.svg";
import whiteStar from "../icons/white_star.svg";
import female from "../icons/female.svg";
import male from "../icons/male.svg";
import close from "../icons/close.svg";
import remove from "../icons/remove.svg";
//REDUX
import {connect} from 'react-redux';
import {addCharacter, removeCharacter} from '../redux/actions/dataActions';

const NewCharacter = props => {

    const {character, addCharacter, removeCharacter} = props;
    const {favouriteCharacters} = props.data;


    const addFavourite = () => {
        addCharacter(character);
    }

    const removeFavourite = () => {
        removeCharacter(character);
    }

    return (
        <tr>
            <td style={{width: "10%"}}>
                <img src={character.image} alt="char" className="char-photo"/>
            </td>
            <td>{character.id}</td>
            <td>{character.name}</td>
            <td>
            <div style={{display: "flex"}}>
            {character.gender === "Male" ? (
                <>
                <img className="genderIcon" alt="gender" src={male}></img>
                Male
                </>
            ) : (
                character.gender === "Female" ? (
                <>
                <img className="genderIcon" alt="gender" src={female}></img>
                Female
                </>
                ) : (
                    character.gender === "Unknown" ? (
                        <>
                        <img className="genderIcon" alt="gender" src={remove}></img>
                        Genderless
                        </>
                    ) : (
                        <>
                        <img className="genderIcon" alt="gender" src={close}></img>
                        Unknown
                        </>
                    )
                )
            )}
            </div>
            </td>
            <td>{character.species}</td>
            <td style={{width: "20%"}}>{character.episode.at(-1).id} - {character.episode.at(-1).name}</td>
            <td>
                <div className="star-image">
                {favouriteCharacters.includes(character)  ? (
                    <img src={blueStar} alt="star"  onClick={removeFavourite} />
                ) : (
                    <img src={whiteStar} alt="star" style={{background: "#11B0C8"}} onClick={addFavourite} />
                )}
                </div>
                
            </td>
        </tr>
    )
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = ({
    addCharacter,
    removeCharacter
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
