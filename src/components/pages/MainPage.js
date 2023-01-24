import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharUpdate = (id) => {
        setChar(id)
    }

    return (
        <>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharUpdate}/>
                    </ErrorBoundary>
                    <div>
                        <ErrorBoundary>
                                <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                                <CharSearchForm/>
                        </ErrorBoundary>
                    </div>


                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </>
    )
}

export default MainPage;