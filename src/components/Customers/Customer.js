import React from 'react';
import { Link } from 'react-router-dom';

const Customer = (props) => {
    return (
        <tr>
            <td>
                {props.customer.firstName}
            </td>
            <td>
                {props.customer.lastName}
            </td>
            <td>
                {props.customer.email}
            </td>
            <td>
                {props.customer.phone}
            </td>
            <td>
                <Link to={"/customers/edit/" + props.customer._id} className="btn btn-info mb-2 ">Edit</Link>  
                <button className="btn btn-danger mb-2 ml-4" type="button" onClick={() => props.deleteCustomer(props.customer._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Customer;