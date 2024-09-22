import React, { useState } from 'react'
import "./search.css"
import axios from 'axios';

export default function Search() {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [error404, seterror404] = useState("")

    function getSearchResult() {
        setResults([]);
        seterror404("");
        axios.post("http://localhost:4000/search", { text: searchText }) 
            .then(res => {
                setResults(res.data);
            })
            .catch(err => {
                console.log(err); 
                seterror404("Ma'lumot topilmadi.");
            });
    }

    return (
        <div className='search-table' style={{"position":"absolute","top":"10px"}}>
            <div className="search">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search here...'
                    onChange={(e) => { setSearchText(e.target.value) }} // Update searchText on input change
                />
                <button onClick={getSearchResult}>Search</button>
            </div>
            <div className="search-results">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    {
                        results.map(res => {
                            if (results.length > 0) {
                                return (
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                            <button className="accordion-button bg-dark " type="button" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                <span className="title">{res.title}</span>
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body">
                                                {res.data}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        })
                    }
                    <h1 className="err404">{error404}</h1>

                </div>
            </div>
        </div>
    )
}
