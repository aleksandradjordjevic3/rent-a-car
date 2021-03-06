import React from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'

export default class CreateRental extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            startDateTime: new Date(),
            endDateTime: new Date(),
            customer: '',
            vehicle: {},
            numOfAvailable: 0,
            numOfRented: 0,
            vehicleInfo: '',
            totalPrice: 0,
            customers: [],
            disableSubmit: true
        }

        this.calculatePrice = this.calculatePrice.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/vehicles/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    vehicle: response.data,
                    numOfAvailable: response.data.numOfAvailable,
                    numOfRented: response.data.numOfRented,
                    vehicleInfo: response.data.brand + " " + response.data.carModel
                });
            })
            .catch(err => console.log(err));

            axios.get('http://localhost:5000/customers/')
                .then(response => {
                    if (response.data.length > 0){
                        this.setState({
                            customers: response.data.map(customer => customer.firstName + " " + customer.lastName),
                            customer: response.data[0].firstName + " " + response.data[0].lastName
                        })
                    }
                })
    }

    onChangeStartDate(value){
        this.setState({
            startDateTime: value
        })
    }

    onChangeEndDate(value){
        this.setState({
            endDateTime: value
        })
    }

    onChangeCustomer(e){
        this.setState({
            customer: e.target.value
        })
    }

    calculatePrice(){
        let start = this.state.startDateTime;
        let end = this.state.endDateTime;

        let duration = end.getTime()  - start.getTime();
        let days =  (duration/1000/60/60)/24;
        let price = this.state.vehicle.pricePerDay;

        let discount = 0;
          if(days > 3){
            discount = 5;
        }
        
        if(days > 5){
            discount = 7;
        }

        if(days > 10){
            discount = 10;
        }

        let totalPrice = days * price;
        totalPrice = totalPrice - ((totalPrice/100)*discount);
        totalPrice = totalPrice.toFixed(2);

        if(totalPrice > 0){
            this.setState({
                totalPrice,
                disableSubmit: false
            });
        }

    }

    onSubmit(e){
        e.preventDefault();

        const rental = {
            startDateTime: this.state.startDateTime,
            endDateTime: this.state.endDateTime,
            vehicle: this.state.vehicleInfo,
            customer: this.state.customer,
            totalPrice: this.state.totalPrice
        }

        const vehicle = {...this.state.vehicle,
                            numOfAvailable: this.state.numOfAvailable - 1,
                            numOfRented: this.state.numOfRented + 1};
        
            //add rental
        axios.post('http://localhost:5000/rentals/add', rental)
        .then(res => console.log(res.data))
            //update vehicle count
        axios.post('http://localhost:5000/vehicles/update/' + this.props.match.params.id, vehicle)

        window.location = "/rentals/";
    }

    render(){
        return (
            <div className="container mt-4">
                <h2>Rent Details: </h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Vehicle</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Create Rental</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{this.state.vehicleInfo}</td>
                        <td> <button className="btn btn-info mt-2 mb-2" onClick={this.calculatePrice}>Calculate price</button></td>
                        <td>{this.state.totalPrice}</td>
                        <td>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Select Customer: </label>
                                    <select required 
                                            className="form-control"
                                            value={this.state.customer}
                                            onChange={this.onChangeCustomer}>
                                                {
                                                    this.state.customers.map((customer) => {
                                                        return <option value={customer}
                                                                        key={customer}>{customer}
                                                                </option>
                                                    })
                                                }
                                        </select>
                                </div>
                                <div className="form-group">
                                    <label>Start date and time: </label>
                                    <div>
                                            <DateTimePicker
                                            value={this.state.startDateTime}
                                            onChange={this.onChangeStartDate}
                                            />
                                    </div>
                                </div>
                                    <div className="form-group">
                                    <label>End date and time: </label>
                                    <div>
                                            <DateTimePicker
                                            value={this.state.endDateTime}
                                            onChange={this.onChangeEndDate}
                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit"
                                            value="Save this rental"
                                            className="btn btn-success"
                                            disabled={this.state.disableSubmit} /> 
                                </div>
                            </form>
                       </td>
                    </tr>
                 </tbody>
             </table>
         </div>
        )
    }
}