import React from 'react';

const SearchBar = ({ setSearch, label, placeholder }) => {
    return (
        <div>
            <form onSubmit={() => { }} className="">
                <label className="label mb-2">{label}</label>
                <div className="input-group">
                        <input name="name" 
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-control border border-dark"
                            type="text"
                            placeholder={placeholder}
                            aria-describedby="search-addon"
                            aria-label="Search"
                            style={{ backgroundColor: "white" }}
                            
                        />
                         <button type="button" className="btn btn-outline-dark">
                             <i className="fas fa-search"
                             ></i>
                         </button>
                </div>
            </form>
        </div>
    );
};
export default SearchBar;