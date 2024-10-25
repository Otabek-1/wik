import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./search.css";
import axios from 'axios';

export default function Search() {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [error404, seterror404] = useState("");
    const navigate = useNavigate();

    function getSearchResult() {
        setResults([]);
        seterror404("");
        axios.post("https://wik-backend.onrender.com/search", { text: searchText }) 
            .then(res => {
                setResults(res.data);
            })
            .catch(err => {
                console.log(err); 
                seterror404("Ma'lumot topilmadi.");
            });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getSearchResult();
        }
    };

    const openPdf = (pdfUrl) => {
        navigate('/book'); // PDF sahifasiga navigatsiya
    };

    return (
        <div className='search-table' style={{"position":"absolute","top":"10px"}}>
            <div className="search">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search here...'
                    onChange={(e) => { setSearchText(e.target.value); }}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={getSearchResult}>Search</button>
            </div>
            <div className="search-results">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    {
                        results.map((res, index) => {
                            if (results.length > 0) {
                                return (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header" id={`panelsStayOpen-heading-${index}`}>
                                            <button className="accordion-button bg-dark" type="button" onClick={() => openPdf(res.pdfUrl)}>
                                                <span className="title">{res.title}</span>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapse-${index}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-heading-${index}`}>
                                            <div className="accordion-body">
                                                {res.data}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })
                    }
                    <h1 className="err404">{error404}</h1>
                </div>
            </div>
        </div>
    );
}
