import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    return (
        <tr>
            <td className="w-25">
            <img src={props.vehicle.image} alt={props.vehicle.brand + "|" + props.vehicle.carModel} className="img-fluid img-thumbnail"/>
            </td>
            <td>
                {props.vehicle.type}
            </td>
            <td>
                {props.vehicle.brand}
            </td>
            <td>
                {props.vehicle.carModel}
            </td>
             <td>
                {props.vehicle.year}
            </td>
             <td>
                {props.vehicle.numOfSeats}
            </td>
             <td>
                {props.vehicle.fuelType}
            </td>
             <td>
                {props.vehicle.pricePerDay}
            </td>
             <td>
                {props.vehicle.numOfAvailable}
            </td>
            <td>
                <Link to={"/edit/" + props.vehicle._id} className="btn btn-info mb-2 w-100">Edit</Link>
                <Link to={"/rent/" + props.vehicle._id} className="btn btn-secondary mt-2 w-100 mr-3 mb-2">Rent</Link> 
                <button className="btn btn-danger" type="button mt-2" onClick={() => props.deleteVehicle(props.vehicle._id)}>Delete</button>
            </td>
        </tr>
    );
};

export default Vehicle;