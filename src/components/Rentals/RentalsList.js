import React from 'react';
import axios from 'axios';
import Rental from './Rental';

export default class RentalsList extends React.Component {
    constructor(props){
        super(props);

        this.rentalList = this.rentalList.bind(this);
        this.state = { rentals: [] }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/rentals/')
        .then(response => {
            this.setState({ rentals: response.data })
        })
         .catch(err => console.log(err))
    }

    rentalList(){
        return this.state.rentals.map(currRental => {
            return <Rental rental={currRental} key={currRental._id}/>
        });
    }

    render(){
        return (
            <div className="container mt-4">
                <h3>Saved Rentals</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Vehicle</th>
                            <th>Customer</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rentalList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

