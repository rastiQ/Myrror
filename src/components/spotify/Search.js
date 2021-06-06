import React, { useState, useEffect } from 'react'
import SearchResult from './SearchResult'
import { MdClose } from 'react-icons/md'

export default function Search({ SpotifyApi, accessToken, setQueue }) {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (!search) {
            setSearchResults([])
            return
        }
        if (!accessToken) return

        SpotifyApi.searchTracks(search, { limit: 10 }).then(res => {
            setSearchResults(res.body.tracks.items)
        })
    }, [search, accessToken])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleShowKeyboard = () => { //TODO univerzelnejsie do buducna
        document.getElementById("keyboard").style.opacity = 1;
        document.getElementById("keyboard").style.pointerEvents = 'all'
    }

    return (
        <div className="search">
            <input
                id="searchInput"
                type="text"
                className="searchBar"
                placeholder="Hľadať..."
                value={search}
                onChange={handleSearch}
                onClick={handleShowKeyboard}
            />
            {search && <span className="closeSearch"><MdClose onClick={() => setSearch('')} /></span>}
            {searchResults.length ?
                <div className="searchResults">
                    {searchResults.map(track =>
                        <SearchResult track={track} key={track.id} setQueue={setQueue} setSearch={setSearch} />
                    )}
                </div> :
                <></>
            }
        </div>
    )
}
