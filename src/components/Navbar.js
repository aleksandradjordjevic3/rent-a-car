import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

    render(){
        return (

            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Fast Rent A Car</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Vehicles</Link>
                        </li>
                         <li className="navbar-item">
                            <Link to="/customers" className="nav-link">Customers</Link>
                        </li>
                         <li className="navbar-item">
                            <Link to="/rentals" className="nav-link">Rentals</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}