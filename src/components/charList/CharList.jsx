import {useState, useEffect, useRef} from 'react';
import  PropTypes  from 'prop-types';
import MarvelService from '../../services/MarvelService';
import CharItem from '../charItem/charItem';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
const CharList =(props)=> {
    const [chars, setChars] = useState([]);
    const [newItemLOading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacter} = MarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    },[]);


    const onRequest=(offset, initial)=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacter(offset)
            .then(onCharsLoad);
    }

    const onCharsLoad=(newchars)=>{
        let ended = false;
        if(newchars.length<9){
            ended = true;
        }

        setChars(chars=>[...chars, ...newchars]);
        setNewItemLoading(newItemLOading=> false);
        setOffset(offset=> offset+9);
        setCharEnded(charEnded=> ended);

    }

    const elements = chars.map(item=>{
        return(
            <CharItem onCharSelected={props.onCharSelected} key={item.id} {...item} />
        ) 
    })
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLOading ? <Spinner/>:null;
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {elements}
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