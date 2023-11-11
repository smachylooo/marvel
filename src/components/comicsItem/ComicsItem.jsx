import uw from '../../resources/img/UW.png';

const ComicsItem = ({thumbnail, price, name})=>{

    return(
        <li className="comics__item">
            <a href="#">
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{name}</div>
                <div className="comics__item-price">{price}$</div>
            </a>
        </li>
    )
} 

export default ComicsItem;