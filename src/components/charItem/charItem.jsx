import React, {Component} from 'react';

class CharItem extends Component{
   render(){
    const{name, thumbnail, id}=this.props;
    return (
        <li className="char__item" onClick={()=> this.props.onCharSelected(id)}>
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
   }
}

export default CharItem;