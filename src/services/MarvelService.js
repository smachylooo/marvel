import { useHttp } from "../hooks/http.hook";

const MarvelService =()=> {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'apikey=28d2dc4d2c15cfee43fb78f78da8000d';
    const url = 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;

    // getRecurce= async (url)=>{
    //     let res = await fetch(url);
    //     if(!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };
 

    const getAllCharacter= async (offset = _baseOffset)=>{
        const res = await request(`${url}characters?limit=9&offset=${offset}&${_apiBase}`);
        return res.data.results.map(_transformCharacter);
    }

    const getOneCharacter = async (id) =>{
        const res = await request(`${url}characters/${id}?${_apiBase}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) =>{
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            id: char.id,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicses: char.comics.items
        }
    }

    return {
        getAllCharacter,
        getOneCharacter,
        loading,
        error,
        clearError
    }
}

export default MarvelService;