import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (newComicsList) => {
        setComics(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
    }

    function renderItems () {
        return comicsList.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })
    }

    const items = renderItems();
    const errorMessage = error ? <ErrorMessage/> : null; 
    const spinner = loading && !newItemLoading ? <Spinner/> : null; 


    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {items}
            </ul>
            <button 
                disabled={newItemLoading}
                className="button button__main button__long">
                <div className="inner" onClick={() => onRequest(offset)} >load more</div>
            </button>
        </div>
    )
}

export default ComicsList;