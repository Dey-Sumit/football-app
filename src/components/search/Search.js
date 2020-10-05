import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { api_with_cancel_token } from '../../axios/axios';
import Team from '../team/Team'
import './search.scss'
const Search = ({ title }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchedResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const callback = (results) => {
            setSearchResults(results.teams)
            setLoading(false)
        }
        if (searchTerm.length >= 4) {
            setLoading(true)
            // const results = api(`teams/search/${searchTerm}`, callback)
            // setSearchResults(results)

            api_with_cancel_token(`teams/search/${searchTerm}`, callback)


        }
    }, [searchTerm])

    const search = (e) => {
        setSearchTerm(e.target.value)
    }


    const openSearch = () => {
        document.querySelector(".search__box").classList.add("open")
    }
    const closeSearch = () => {
        document.querySelector(".search__box").classList.remove("open")
    }
    return (
        <div className="search">
            <button className="search__button" onClick={openSearch}>{title} <FaSearch className="search__icon" /> </button>
            <div className="search__box">
                <form className="form__area">
                    <input type="text" placeholder="Start typing eg: Ajax" value={searchTerm} onChange={e => search(e)} />
                    <button> Search </button>
                </form>
                <FaTimesCircle className="search__close-icon" onClick={closeSearch} />
                {/* show the results here */}
                <div className="search__results mt-4">
                    {
                        searchTerm.length >= 4 && loading &&
                        <h4>Loading....</h4>
                    }
                    {
                        searchedResults && searchedResults.length > 0 && !loading &&
                        searchedResults.slice(0, 5).map(team => <Team key={team.team_id} team={team} small />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;