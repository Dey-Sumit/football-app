import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import Team from '../team/Team'
import './search.scss'
import { useDispatch, useSelector } from 'react-redux'
import { get_search_results } from '../../redux/actions/team.action'
import SkeletonCard from '../skeletons/SkeletonCard'

const Search = ({ title }) => {


    const { searchedResults, loading } = useSelector(state => state.apiData)
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [openSearch, setOpenSearch] = useState(false)

    useEffect(() => {
        if (searchTerm.length >= 4) {
            dispatch(get_search_results(searchTerm))
        }
    }, [searchTerm, dispatch])

    const search = (e) => {
        setSearchTerm(e.target.value)
    }


    // const openSearch = () => {
    //     document.querySelector(".search__box").classList.add("open")
    // }
    // const closeSearch = () => {
    //     document.querySelector(".search__box").classList.remove("open")
    // }
    return (
        <div className="search">
            <button className="search__button" onClick={() => setOpenSearch(true)}>{title} <FaSearch className="search__icon" /> </button>
            <div className={openSearch ? 'search__box open' : 'search__box'}>
                <form className="form__area">
                    <input type="text" placeholder="Start typing eg: Ajax" value={searchTerm} onChange={e => search(e)} />
                    <button> Search </button>
                </form>
                <FaTimesCircle className="search__close-icon" onClick={() => setOpenSearch(false)} />
                {/* show the results here */}
                <div className="search__results mt-4">
                    {
                        loading ?
                            <SkeletonCard count={5} width={120} height={120} />
                            : searchedResults?.slice(0, 5).map(team => <Team key={team.teamId} closeSearch={() => setOpenSearch(false)} team={team} small showName />)
                    }
                    {
                        !loading && searchedResults?.length === 0 ?
                            <h5>No Team Found; check the team name :)</h5> : null
                    }
                </div>
            </div>
        </div>
    );
};

// const mapStateToProps = state => ({
//     loading: state.team.loading,
//     searchedResults: state.team.searchedResults
// })
// export default connect(mapStateToProps, { get_search_results })(Search);
export default Search;