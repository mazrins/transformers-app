import React, { Component } from 'react'
import Logo from '../assets/img/transformers-icon.jpg';
import { Link } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'

export default class TransformersCard extends Component {

    render() {
        const { transformer, handleStatusDropdown } = this.props
        return (
            <div className="card-class mx-auto">
                <div className="card mb-3 " >
                    <div className="row no-gutters">
                        <div className="col-md-3 ">
                            <img src={Logo} className="card-img" alt="Transformers"></img>
                        </div>
                        <div className="col-md-5 ">
                            <div className="card-body text-left">
                                <h5 className="card-title mb-1 text">{transformer.name}</h5>
                                <p className="card-text mb-1">Vehicle group : {transformer.vehicleGroup}</p>
                                <p className="card-text mb-1">Vehicle type : {transformer.vehicleType}</p>
                                <p className="card-text mb-1">Vehicle model : {transformer.vehicleModel}</p>
                                <p className="card-text mb-1">Gear : {transformer.gear.map((gear, index) => <span key={index}>{gear} </span>)}</p>
                                <span className="card-buttons">
                                    <div className="row">
                                        <p className="ml-3">Status :</p>
                                        <div className="dropdown-card ml-2 mr-2">
                                            <DropdownButton title={transformer.status} variant="info" value={transformer.id}>
                                                <Dropdown.Item id={transformer.id} name={"OK"} onClick={handleStatusDropdown}>OK</Dropdown.Item>
                                                <Dropdown.Item id={transformer.id} name="INJURED" onClick={handleStatusDropdown}>INJURED</Dropdown.Item>
                                                <Dropdown.Item id={transformer.id} name="MIA" onClick={handleStatusDropdown}>MIA</Dropdown.Item>
                                            </DropdownButton>
                                        </div>

                                        <Link to={`/details/${transformer.id}`} transformer={transformer}>
                                            <button className="details-button btn btn-secondary" >Details</button>
                                        </Link>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
