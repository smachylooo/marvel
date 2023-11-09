import {useState, useEffect, useRef} from 'react';
import  PropTypes  from 'prop-types';
import MarvelService from '../../services/MarvelService';
import CharItem from '../charItem/charItem';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
const CharList =(props)=> {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLOading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(()=>{
        onRequest();
    },[]);


    const onRequest=(offset)=>{
        onCharListLoading();
        marvelService.getAllCharacter(offset)
            .then(onCharsLoad)
            .catch(onError)
    }

    const onCharListLoading=()=>{
        setNewItemLoading(true);
    }

    const onCharsLoad=(newchars)=>{
        let ended = false;
        if(newchars.length<9){
            ended = true;
        }

        setChars(chars=>[...chars, ...newchars]);
        setLoading(loading=> false);
        setNewItemLoading(newItemLOading=> false);
        setOffset(offset=> offset+9);
        setCharEnded(charEnded=> ended);

    }

    const onError=()=>{
        setLoading(loading=> false);
        setError(true);
    }

    const elements = chars.map(item=>{
        return(
            <CharItem onCharSelected={props.onCharSelected} key={item.id} {...item} />
        ) 
    })
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/>:null;
    const content = !(loading||error) ? elements: null
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLOading}
                style={{'display': charEnded ? 'none': 'block'}}
                onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes ={
    onCharSelected: PropTypes.func,
    
}

export default CharList;