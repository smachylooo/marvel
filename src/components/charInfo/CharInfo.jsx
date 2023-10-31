import './charInfo.scss';
import { Component } from 'react';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {

    constructor(props){
        super(props);
    }

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps,prevState){   
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    onCharLoaded=(char)=>{
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading=()=>{
        this.setState({
            loading: true
        })
    }

    onError=()=>{
        this.setState({
            loading:false,
            error: true
        })
    }

    updateChar=()=>{
        const {charId} = this.props;
        if(!charId){
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getOneCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render(){
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Spinner/>

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/>: null;
        const content = !(loading||error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
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