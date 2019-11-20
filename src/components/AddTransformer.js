import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class AddTransformer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transformerName: "",
            vehicleGroup: "",
            vehicleTypeType: [],
            vehicleType: "",
            vehicleModelType: [],
            vehicleModel: "",
            gear: [],
            status: "",
            transformer: [],
            vehicles: [],
            isVehicleModelForm: true,

        }

    }

    componentDidMount() {
        this.getVehicles();

    }

    handleSubmit = event => {
        event.preventDefault();
        const transformer = {
            transformer: {
                name: this.state.transformerName,
                vehicleGroup: this.state.vehicleGroup,
                vehicleModel: this.state.vehicleModel,
                vehicleType: this.state.vehicleType,
            }

        }
        axios.post(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/transformers`, { transformer })
            .then(res => {
            })
    }

    getVehicles = () => {
        axios.get(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/vehicleTypes`)
            .then(res => {
                this.setState({
                    vehicles: res.data,
                })
            })
            .catch(error => console.log(error))
    }

    handleInputChange = (e) => {
        this.setState({
            transformerName: e.target.value
        })
    }

    handleVehicleGroup = (e) => {

        if (e.target.value === "Air") {
            this.setState({
                vehicleGroup: "Air",
                vehicleTypeType: this.getVehicleType("Air"),

            })
        }

        else if (e.target.value === "Land") {
            this.setState({
                vehicleGroup: "Land",
                vehicleTypeType: this.getVehicleType("Land")
            })
        }

        else if (e.target.value === "Sea") {
            this.setState({
                vehicleGroup: "Sea",
                vehicleTypeType: this.getVehicleType("Sea")
            })
        }

        this.setState({
            isVehicleModelForm: true,

        })
    }

    getVehicleType = (e) => {
        let definedVehiclesTypes = [];
        this.state.vehicles.map(vehicle => {
            if (vehicle.group === e) {
                if (definedVehiclesTypes.includes(vehicle.type)) {
                } else {
                    definedVehiclesTypes.push(vehicle.type)
                }
            }
        })
        return definedVehiclesTypes;

    }

    handleVehicleType = (e) => {
        this.setState({
            vehicleModelType: this.getVehicleModel(e.target.value),
            vehicleType: e.target.value,
            isVehicleModelForm: false
        })
    }

    getVehicleModel = (e) => {
        let vehicleModelTypes = [];
        this.state.vehicles.map(model => {
            if (model.type === e) {
                if (vehicleModelTypes.includes(model.model)) {

                }
                else {
                    vehicleModelTypes.push(model.model)
                }
            }

        })
        return vehicleModelTypes

    }

    handleVehicleModel = (e) => {
        console.log(e.target.value)
        this.setState({
            vehicleModel: e.target.value
        })

    }


    render() {

        return (
            < div className="container" >
                <div className="row">
                    <div className="col-sm">
                        <h4 className="text-center p-4 mt-4 mb-4">Add new transformer</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row ">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Name :</label>
                                <div className="col-6">
                                    <input type="text" className="form-control"
                                        name={this.state.transformerName}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Vehicle group :</label>
                                <div className="col-sm-10 text-left">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input
                                            type="radio"
                                            id="customRadioInline1"
                                            name="vehicleGroup"
                                            value="Air"
                                            className="custom-control-input"
                                            onChange={this.handleVehicleGroup}
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
                                            onChange={this.handleVehicleGroup}
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
                                            onChange={this.handleVehicleGroup}
                                        >
                                        </input>
                                        <label className="custom-control-label" htmlFor="customRadioInline3">Land</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="vehicleGroup" className="col-sm-2 col-form-label">Vehicle type:</label>
                                <div className="col-sm-4">
                                    <select className="custom-select" onChange={this.handleVehicleType}>
                                        <option defaultValue>Select vehicle type</option>
                                        {this.state.vehicleTypeType.map(selectType => {
                                            return <option value={selectType}>{selectType}</option>
                                        })}
                                        >
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="vehicleGroup" className="col-sm-2 col-form-label">Vehicle model:</label>
                                <div className="col-sm-4">
                                    <select className="custom-select" disabled={this.state.isVehicleModelForm}
                                        onChange={this.handleVehicleModel}>
                                        <option defaultValue>Select vehicle model</option>
                                        {this.state.vehicleModelType.map(model => {
                                            return <option value={model.id}>{model}</option>
                                        })}

                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="vehicleGroup" className="col-sm-2 col-form-label "></label>
                                <div className="col- ml-3">
                                    <Link to={"/"}>   <button type="text" className="btn btn-primary mr-4">Cancel</button></Link>
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div >
        )
    }
}
