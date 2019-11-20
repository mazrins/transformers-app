import React, { Component } from 'react'
import axios from 'axios'
import { MdModeEdit, MdTrackChanges } from 'react-icons/md'
import { Link } from 'react-router-dom'
export default class TransformerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transformer: {},
            isEditMode: true,
            vehicleGroup: "",
            vehicles: [],
            vehicleType: [],
        }
        this.getTransformer = this.getTransformer.bind(this)
        this.handleEditMode = this.handleEditMode.bind(this)
        this.getVehicles = this.getVehicles.bind(this)
        this.handleVehicleTypes = this.handleVehicleTypes.bind(this)
    }

    componentDidMount() {
        this.getTransformer();
        this.getVehicles();
    }

    getTransformer() {
        const id = this.props.match.params.id
        axios.get(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/transformers/${id}`)
            .then(res =>
                this.setState({
                    transformer: res.data
                })
            )
            .catch(error => console.log(error))

    }

    getVehicles() {
        axios.get(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/vehicleTypes`)
            .then(res => {
                this.setState({
                    vehicles: res.data
                })
            })
            .catch(error => console.log(error))
    }

    changeTransformer() {
        const id = this.props.match.params.id
        const transformer = {}
        axios.put(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/transformers/${id}`, { transformer })
    }

    handleEditMode(e) {

        this.setState({
            isEditMode: !this.state.isEditMode,
        })
    }

    handleVehicleTypes(e) {
        const type = e.target.value
        this.getVehicleTypes(type);

    }

    getVehicleTypes(vehicleTypeSelected) {
        const vehicles = this.state.vehicles
        let vehicleType = [];
        vehicles.forEach(type => {
            if (type.group === vehicleTypeSelected) {
                if (vehicleType.includes(type.type)) {
                    return;
                }
                else {
                    vehicleType.push(type.type)
                }
            }

        })
        this.setState({
            vehicleType: vehicleType
        })
    }

    render() {
        const { transformer, isEditMode } = this.state

        return (
            <div className="details-class">
                <div className="container">
                    <h3> {isEditMode ? transformer.name :
                        <input className="form-control col-8 mx-auto "
                            defaultValue={transformer.name} type="text"
                            onChange={this.renderView}>
                        </input>}  <MdModeEdit onClick={this.handleEditMode} /></h3>

                    <div className="transformer-info">
                        <div className="group-class">

                            {isEditMode ? <h6>Vehicle group : {transformer.vehicleGroup}</h6> :
                                <div className="form-group row ">
                                    <label htmlFor="name" className="col-3 col-form-label">Vehicle group : </label>
                                    <div className=" select-radio col-4">
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="customRadioInline1"
                                                name="vehicleGroup"
                                                value="Air"
                                                className="custom-control-input"
                                                onChange={this.handleVehicleTypes}
                                            >
                                            </input>
                                            <label className="custom-control-label" htmlFor="customRadioInline1">Air</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="customRadioInline2"
                                                name="vehicleGroup"
                                                value="Sea"
                                                className="custom-control-input"
                                                onChange={this.handleVehicleTypes}
                                            >
                                            </input>
                                            <label className="custom-control-label" htmlFor="customRadioInline2">Sea</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="customRadioInline3"
                                                name="vehicleGroup"
                                                value="Land"
                                                className="custom-control-input"
                                                onChange={this.handleVehicleTypes}
                                            >
                                            </input>
                                            <label className="custom-control-label" htmlFor="customRadioInline3">Land</label>
                                        </div>
                                    </div>
                                </div>
                            }


                            {isEditMode ? <h6>Vehicle type : {transformer.vehicleType}</h6> :
                                (<div className="form-group row">
                                    <label htmlFor="vehicleGroup" className="col-sm-3 col-form-label ">Vehicle type:</label>
                                    <div className="col-4">
                                        <select className="custom-select" onChange={this.handleVehicleType}>
                                            <option >{transformer.vehicleType}</option>
                                            {/* {this.state.vehicleTypeType.map(selectType => {
                                            return <option value={selectType}>{selectType}</option>
                                        })} */}
                                            >
                                    </select>
                                    </div>
                                </div>)
                            }

                            {isEditMode ? <h6>Vehicle model :{transformer.vehicleModel}</h6> :
                                (<div className="form-group row">
                                    <label htmlFor="vehicleGroup" className="col-sm-3 col-form-label">Vehicle model:</label>
                                    <div className="col-sm-4">
                                        <select className="custom-select" disabled={this.state.isVehicleModelForm} onChange={this.handleVehicleModel}>
                                            <option defaultValue>{transformer.vehicleModel}</option>
                                            {/* {this.state.vehicleModelType.map(model => {
                                                return <option value={model.id}>{model}</option>
                                            })} */}

                                        </select>
                                    </div>
                                </div>)
                            }

                        </div>

                        {isEditMode ? (<h6>Gear : {transformer.gear}</h6>) :
                            <div>
                                <div className="form-group row ">
                                    <label htmlFor="name" className="col-sm-3 col-form-label">Gear :</label>
                                    <div className="col-6">
                                        <input type="text" className="form-control"
                                            defaultValue={transformer.name}
                                            name={this.state.transformerName}
                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to={"/"}> <button type="text" className="btn btn-dark ">Return</button></Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
