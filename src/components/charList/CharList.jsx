import React, {Component} from 'react';
import  PropTypes  from 'prop-types';
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
        error: false,
        newItemLOading: false,
        offset: 210,
        charEnded: false

    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onRequest=(offset)=>{
        this.onCharListLoading();
        this.marvelService.getAllCharacter(offset)
            .then(this.onCharsLoad)
            .catch(this.onError)
    }

    onCharListLoading=()=>{
        this.setState({
            newItemLOading:true
        })
    }

    onCharsLoad=(newchars)=>{
        let ended = false;
        if(newchars.length<9){
            ended = true;
        }

        this.setState(({offset,chars})=>({
            chars: [...chars, ...newchars], loading:false, newItemLOading: false, offset: offset +9, charEnded: ended
        }))

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
        const {chars, loading, error, offset, newItemLOading, charEnded} = this.state;
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
                <button 
                    className="button button__main button__long"
                    disabled={newItemLOading}
                    style={{'display': charEnded ? 'none': 'block'}}
                    onClick={()=> this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes ={
    onCharSelected: PropTypes.func,
    
}

export default CharList;