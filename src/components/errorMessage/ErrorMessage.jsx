import img from './error.gif'
import './ErrorMessage.scss'
const ErrorMessage = () =>{
    return (
        <img className='error' src={img} alt='Error' />
    )
}

export default ErrorMessage;