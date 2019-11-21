import React, { Component } from 'react'
import SearchBar from './SearchBar'
import NavigationBar from './NavigationBar'
import axios from 'axios'
import TransformersCard from './TransformersCard'

export default class Transformers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transformers: [],
            search: "",
            allTransformers: [],


        }
        this.getTransformers = this.getTransformers.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
        this.handleStatusDropdown = this.handleStatusDropdown.bind(this)
        this.filterByFaction = this.filterByFaction.bind(this)
    }

    componentDidMount() {
        this.getTransformers();
    }


    getTransformers() {
        axios.get(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/transformers`)
            .then(res =>
                this.setState({
                    transformers: res.data,
                    allTransformers: res.data
                }),

            )

            .catch(error => console.log(error))

    }

    updateStatus(id, status) {
        axios.patch(`https://my-json-server.typicode.com/DyslexicDcuk/transformers-api/transformers/${id}`,
            {
                status: status
            }

        )
            .then(res => console.log(res.data))
            .catch(error => console.log(error))

    }

    updateSearch(e) {

        this.setState({
            search: e.target.value
        })
    }

    handleStatusDropdown = (e) => {
        const status = e.target.name
        const id = e.target.id
        this.updateStatus(id, status)
    }

    filterByFaction(key) {
        const land = "Land"
        const air = "Air"
        const sea = "Sea"

        if (key === "Autobots") {
            this.setState({
                transformers: this.state.allTransformers.filter(transformer =>
                    transformer.vehicleGroup === land)
            })
        }
        else if (key === "Decepticons") {
            this.setState({
                transformers: this.state.allTransformers.filter(transformer =>
                    transformer.vehicleGroup === air || transformer.vehicleGroup === sea)
            })
        } else if (key === "All") {
            this.setState({
                transformers: this.state.allTransformers
            })
        }

    }

    render() {
        const { transformers, search } = this.state
        let filteredTransformers = transformers.filter(transformer => {
            return transformer.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return (
            <div className="transformers-class">
                <NavigationBar filterByFaction={this.filterByFaction} />
                <SearchBar updateSearch={this.updateSearch} />
                {
                    filteredTransformers.map(transformer => <TransformersCard transformer={transformer}
                        key={transformer.id} handleStatusDropdown={this.handleStatusDropdown} />)
                }
            </div>
        )
    }
}
