import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Customer from './Customer';

export default class CustomersList extends React.Component {
    constructor(props){
        super(props);

        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.state = {customers: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/customers/')
        .then(response => {
            this.setState({ customers: response.data})
        })
        .catch(err => console.log(err))
    }

    deleteCustomer(id){
        axios.delete('http://localhost:5000/customers/' + id)
        .then(res => console.log(res.data));

        this.setState({
            customers: this.state.customers.filter(customer => customer._id !== id)
        });
    }
    
    customerList(){
        return this.state.customers.map(currCustomer => {
            return <Customer customer={currCustomer} deleteCustomer={this.deleteCustomer} key={currCustomer._id}/>
        });
    }

    render(){
        return (
            <div>
                <Link to="/customers/create" className="btn btn-info mt-4 mb-4">Add New Customer</Link>
               <h3>Our Customers</h3>
               <div>
                   <div className="row">
                       <div className="container">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.customerList()}
                            </tbody>
                        </table>
                      </div>
                     </div>
                 </div>
            </div>
        )
    }
}
