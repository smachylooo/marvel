import uw from '../../resources/img/UW.png';
import { Link } from 'react-router-dom';

const ComicsItem = ({thumbnail, price, title, id})=>{

    return(
        <li className="comics__item">
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>
    )
} 

export default ComicsItem;