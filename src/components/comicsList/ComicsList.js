import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const { getAllComics, process, setProcess } = useMarvelService();

    const setContent = (process, Component) => {
        switch (process) {
            case 'waiting':
                return <Spinner/>;
            case 'loading':
                return newItemLoading ? <Component/> : <Spinner/>;
            case 'confirmed': 
                return <Component/>;
            case 'error':
                return <ErrorMessage/>;
            default:
                throw new Error('Unexpected process state');
        }
    }

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onComicsLoaded = (newComicsList) => {
        setComics(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
    }

    function renderItems () {
        return comicsList.map((item, i) => {
            return (
                <li  className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
    }

    return (
        <div className="comics__list">

            <ul className="comics__grid">
                {setContent(process, () => renderItems(comicsList), newItemLoading)}
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