import React from 'react'

export default function SearchBar(props) {

    return (
        <div>
            <input className="form-control " type="text" placeholder="Search Transformer" aria-label="Search" onChange={props.updateSearch}></input>
        </div>
    )
}
