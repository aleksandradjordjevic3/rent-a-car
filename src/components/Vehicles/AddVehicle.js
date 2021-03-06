import React from 'react';
import axios from 'axios';

export default class AddVehicle extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                type: '',
                brand: '',
                carModel: '',
                year: '',
                fuelType: '',
                numOfSeats: '',
                image: '',
                pricePerDay: 0,
                numOfAvailable: 0,
                numOfRented: 0
            };

            this.onChangeType = this.onChangeType.bind(this);
            this.onChangeBrand = this.onChangeBrand.bind(this);
            this.onChangeCarModel = this.onChangeCarModel.bind(this);
            this.onChangeYear = this.onChangeYear.bind(this);
            this.onChangeFuelType = this.onChangeFuelType.bind(this);
            this.onChangeNumOfSeats= this.onChangeNumOfSeats.bind(this);
            this.onChangeImage = this.onChangeImage.bind(this);
            this.onChangePrice = this.onChangePrice.bind(this);
            this.onChangeNumOfAvailable = this.onChangeNumOfAvailable.bind(this);
            this.onChangeNumOfRented = this.onChangeNumOfRented.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        onChangeType(e){
            this.setState({
                type: e.target.value
            })
        }

        onChangeBrand(e){
            this.setState({
                brand: e.target.value
            });
        }

        onChangeCarModel(e){
            this.setState({
                carModel: e.target.value
            });
        }

        onChangeYear(e){
            this.setState({
                year: e.target.value
            });
        }

        onChangeFuelType(e){
            this.setState({
                fuelType: e.target.value
            });
        }

        onChangeImage(e){
            this.setState({
                image: e.target.value
            });
        }

        onChangeNumOfSeats(e){
            this.setState({
                numOfSeats: e.target.value
            });
        }

        onChangePrice(e){
            this.setState({
                pricePerDay: e.target.value
            });
        }

        onChangeNumOfAvailable(e){
            this.setState({
                numOfAvailable: e.target.value
            });
        }

        onChangeNumOfRented(e){
            this.setState({
                numOfRented: e.target.value
            });
        }

        onSubmit(e){
            e.preventDefault();

            const vehicle = {
                type: this.state.type,
                brand: this.state.brand,
                carModel: this.state.carModel,
                year: this.state.year,
                fuelType: this.state.fuelType,
                numOfSeats: this.state.numOfSeats,
                image: this.state.image,
                pricePerDay: this.state.pricePerDay,
                numOfAvailable: this.state.numOfAvailable,
                numOfRented: this.state.numOfRented
            }

            console.log(vehicle);

            axios.post('http://localhost:5000/vehicles/add', vehicle)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            
            window.location = "/";
        }

    render(){

        return (
            <div>
                <h3>Add New Vehicle</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Type of vehicle:</label>
                            <select className="form-control"
                                    required
                                    value={this.state.type}
                                    onChange={this.onChangeType}>
                                <option value="Economy">Economy</option>
                                <option value="Estate">Estate</option>
                                <option value="Luxury">Luxury</option>
                                <option value="SUV">SUV</option>
                                <option value="Cargo">Cargo</option>    
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand: </label>
                            <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.brand}
                                    onChange={this.onChangeBrand}/>
                        </div>
                        <div className="form-group">
                            <label>Model: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.carModel}
                                    onChange={this.onChangeCarModel}/>
                        </div>
                        <div className="form-group">
                            <label>Year of production: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.year}
                                    onChange={this.onChangeYear}/>
                        </div>
                        <div className="form-group">
                            <label>Fuel type:</label>
                            <select className="form-control"
                                    required
                                    value={this.state.fuelType}
                                    onChange={this.onChangeFuelType}>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Number of seats: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.numOfSeats}
                                    onChange={this.onChangeNumOfSeats}/>
                        </div>
                        <div className="form-group">
                            <label>Link to image: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.image}
                                    onChange={this.onChangeImage}/>
                        </div>
                        <div className="form-group">
                            <label>Price per day: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.pricePerDay}
                                    onChange={this.onChangePrice}/>
                        </div>
                        <div className="form-group">
                            <label>Number of available vehicles: </label>
                             <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.numOfAvailable}
                                    onChange={this.onChangeNumOfAvailable}/>
                        </div>
                        <div className="form-group">
                            <label>Number of rented vehicles: </label>
                             <input type="text"
                                    placeholder="0"
                                    required
                                    className="form-control"
                                    value={this.state.numOfRented}
                                    onChange={this.onChangeNumOfRented}/>
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                    value="Save Vehicle"
                                    className="btn btn-success"/>
                        </div>
                    </form>
            </div>
        )
    }
}