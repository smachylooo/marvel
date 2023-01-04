import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img alt='Error' src={img} style={{width: "330px", height: "240px",display: "block", margin: "0 auto"}}/>
    )
}

export default ErrorMessage;