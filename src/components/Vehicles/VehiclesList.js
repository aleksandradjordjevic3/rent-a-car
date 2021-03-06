import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Vehicle from './Vehicle';

export default class VehiclesList extends React.Component {
    constructor(props){
        super(props);

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.filteredVehiclesList = this.filteredVehiclesList.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.state = {
                    vehicles: [],
                    filteredVehicles: [],
                    searchTerm: ''
                }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/vehicles/')
        .then(response => {
            this.setState({ vehicles: response.data})
        })
        .catch(err => console.log(err))
    }

    deleteVehicle(id){
        axios.delete('http://localhost:5000/vehicles/' + id)
        .then(res => console.log(res.data));

        this.setState({
            vehicles: this.state.vehicles.filter(vehicle => vehicle._id !== id)
        });
    }

    onChangeSearchTerm(e){
            this.setState({
                searchTerm: e.target.value
            });
    }

    onSubmit(e){
            e.preventDefault();

            let search = this.state.searchTerm.toLowerCase();
            let newVehicles = []
            this.state.vehicles.map((vehicle) => {
                if(vehicle.carModel.toLowerCase() === search || vehicle.brand.toLowerCase() === search || vehicle.type.toLowerCase() === search){
                    newVehicles.push(vehicle);
                    this.setState({
                        filteredVehicles: newVehicles
                    });
                }
                 return this.state.filteredVehicles;
            });       
    }

    filteredVehiclesList(){
          if(this.state.filteredVehicles.length > 0){
                return this.state.filteredVehicles.map(currVehicle => {
            return   <Vehicle vehicle={currVehicle} deleteVehicle={this.deleteVehicle} key={currVehicle.carModel}/>
             });
        }
    }

    vehicleList(){
        return this.state.vehicles.map(currVehicle => {
            return <Vehicle vehicle={currVehicle} deleteVehicle={this.deleteVehicle} key={currVehicle._id}/>
        });
    }

    render(){
        return (
            <div>
                <Link to="/addnew" className="btn btn-info mt-4 mb-4">Add New Vehicle</Link>
               <h3>Vehicles for Rent</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                <label>Look for a vehicle:</label>
                 <input type="text"
                        className="form-control"
                        placeholder="Enter brand, model or type..."
                        value={this.state.searchTerm}
                        onChange={this.onChangeSearchTerm}/>
                </div>
                <div className="form-group">
                    <input type="submit"
                            value="Search"
                            className="btn btn-info"/>
                </div>
               </form>
               <table>
                   <tbody>
               {this.filteredVehiclesList()}
                 </tbody>
               </table>
               <h3 className="mt-4">All Vehicles</h3>
               <div className="container">
                   <div className="row">
                       <div className="col-12">
                        <table className="table table-image">
                            <thead className="thead-light">
                                <tr>
                                    <th>Image</th>
                                    <th>Type</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Number of Seats</th>
                                    <th>Fuel Type</th>
                                    <th>Price Per Day</th>
                                    <th>Count</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.vehicleList()}
                            </tbody>
                        </table>
                      </div>
                     </div>
                 </div>
            </div>
        )
    }
}