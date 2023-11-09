import './charInfo.scss';
import { useState, useEffect } from 'react';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getOneCharacter, clearError} = MarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getOneCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Spinner/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View=({char})=>{
    const comicsesLength = char.comicses.length;
    return(
        <>
            <div className="char__basics">
                <img src={char.thumbnail} style={(char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? {objectFit: 'contain'}: null}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description ? char.description : 'The description is not up to data'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            {comicsesLength != 0 ? char.comicses.slice(0,10).map((res,i)=>{
                        return(
                            <li key={i} className="char__comics-item">{res.name}</li>
                        )
                    }):"Comics not found"}
            </ul>
        </>
    )
}

export default CharInfo;