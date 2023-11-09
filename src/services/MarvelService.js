class MarvelService {
    _apiBase = 'apikey=28d2dc4d2c15cfee43fb78f78da8000d';
    url = 'https://gateway.marvel.com:443/v1/public/';
    _baseOffset = 210;

    getRecurce= async (url)=>{
        let res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacter= async (offset = this._baseOffset)=>{
        const res = await this.getRecurce(`${this.url}characters?limit=9&offset=${offset}&${this._apiBase}`);
        return res.data.results.map(this._transformCharacter);
    }

    getOneCharacter = async (id) =>{
        const res = await this.getRecurce(`${this.url}characters/${id}?${this._apiBase}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) =>{
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
}

export default MarvelService;