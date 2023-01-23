import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet} from "react-router-dom";
import PropTypes from 'prop-types';

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => { 

    return (
        <Router>
            <div className="app">
                <Suspense fallback={<Spinner/>}>
                    <AppHeader/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>

                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div>
            <Outlet/>

        </Router>
     )
    
}

App.propTypes = {
    selectedChar: PropTypes.number
}

export default App;