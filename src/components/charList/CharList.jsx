import React, {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import CharItem from '../charItem/charItem';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
class CharList extends Component {
    constructor(props){
        super(props);
    }

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onCharsLoad=(chars)=>{
        this.setState({chars, loading:false})
    }

    onError=()=>{
        this.setState({loading:false, error: true})
    }

    updateChars=()=>{
        this.marvelService
            .getAllCharacter()
            .then(res=> this.onCharsLoad(res))
            .catch(this.onError)
    }

    render(){
        const {chars, loading, error} = this.state;
        const elements = chars.map(item=>{
            return(
                <CharItem onCharSelected={this.props.onCharSelected} key={item.id} {...item} />
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;