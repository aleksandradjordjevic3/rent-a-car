import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//components:
import Navbar from './components/Navbar';
import VehiclesList from './components/Vehicles/VehiclesList';
import EditVehicle from './components/Vehicles/EditVehicle';
import AddVehicle from './components/Vehicles/AddVehicle';
import CustomersList from './components/Customers/CustomersList';
import EditCustomer from './components/Customers/EditCustomer';
import CreateCustomer from './components/Customers/CreateCustomer';
import CreateRental from './components/Rentals/CreateRental';
import RentalsList from './components/Rentals/RentalsList';

function App() {
  return (
   <Router>
      <div className="container">
        <Navbar/>
        <Route path="/" exact component={VehiclesList}/>
        <Route path="/edit/:id" exact component={EditVehicle}/>
        <Route path="/addnew" exact component={AddVehicle}/>
        <Route path="/customers" exact component={CustomersList}/>
        <Route path="/customers/create" exact component={CreateCustomer}/>
        <Route path="/customers/edit/:id" exact component={EditCustomer}/>
        <Route path="/rent/:id" exact component={CreateRental}/>
        <Route path="/rentals" exact component={RentalsList}/>
    </div>
    </Router>
  );
}

export default App;
