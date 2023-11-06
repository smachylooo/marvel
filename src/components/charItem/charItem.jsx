
const CharItem =({thumbnail,name,onCharSelected,id})=>{
    return (
        <li className="char__item" onClick={()=> onCharSelected(id)}>
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharItem;