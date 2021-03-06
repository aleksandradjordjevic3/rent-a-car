import React from 'react';

const Rental = (props) => {
    return (
        <tr>
            <td>{props.rental.vehicle}</td>
            <td>{props.rental.customer}</td>
            <td>{props.rental.startDateTime.substring(0, 10) + " " + props.rental.startDateTime.substring(11, 19)}</td>
            <td>{props.rental.endDateTime.substring(0, 10) + " " + props.rental.endDateTime.substring(11, 19)}</td>
            <td>{props.rental.totalPrice}</td>
        </tr>
    
    )
}

export default Rental;