import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import Team from '../team/Team'
import './search.scss'
import { connect } from 'react-redux'
import { get_search_results } from '../../redux/actions/team.action'
import SkeletonCard from '../skeletons/SkeletonCard'

const Search = ({ title, loading, searched_results, get_search_results }) => {

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (searchTerm.length >= 4) {
            get_search_results(searchTerm)
        }
    }, [searchTerm, get_search_results])

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
                        loading ?
                            <SkeletonCard count={5} width={120} height={120} />
                            : searched_results?.slice(0, 5).map(team => <Team key={team.team_id} closeSearch={closeSearch} team_id={team.team_id} name={team.name} small />)
                    }
                    {
                        !loading && searched_results?.length === 0 ?
                            <h5>No Team Found; check the team name :)</h5> : null
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.team.loading,
    searched_results: state.team.searched_results
})
export default connect(mapStateToProps, { get_search_results })(Search);