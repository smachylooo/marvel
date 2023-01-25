import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"


const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta name="description" content="404 | Koliada.fr" />
                <title>Oups.. | 404</title>
            </Helmet>
            <ErrorMessage/>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;