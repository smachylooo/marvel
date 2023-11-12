import './comicsList.scss';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ComicsItem from '../comicsItem/ComicsItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spinner';

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const {loading, error, getAllComicses} = MarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    },[])

    const onRequest = (offset,initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComicses(offset)
            .then(onComicsesLoad)
    }

    const onComicsesLoad = (newComicses) =>{
        setComics(comics=>[...comics, ...newComicses]);
        setNewItemLoading(newItemLoading=> false);
        setOffset(offset=> offset+9)
    }

    const elements = comics.map((el,index)=>{
        return <ComicsItem key={index} {...el}/>
    });
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/>:null;
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {elements}
            </ul>
            <button 
            onClick={()=>onRequest(offset)}
            disabled={newItemLoading}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;