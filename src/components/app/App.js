import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import { MainPage, ComicsPage } from '../pages'
import AppHeader from "../appHeader/AppHeader";

const App = () => { 

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                    <Route exact path="/comics">
                        <ComicsPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
    
}

App.propTypes = {
    selectedChar: PropTypes.number
}

export default App;