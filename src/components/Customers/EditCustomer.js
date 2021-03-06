import React from 'react';
import axios from 'axios';

export default class EditCustomer extends React.Component {
 constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };
    
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){
        axios.get('http://localhost:5000/customers/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phone: response.data.phone
                })
            })
            .catch(err => console.log(err));
    }
     onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }

     onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        });
    }

     onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

     onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

     onSubmit(e){
        e.preventDefault();

        const customer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone
        }

        axios.post('http://localhost:5000/customers/update/' + this.props.match.params.id, customer)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        window.location = "/customers/";      
      
    }

    render(){
        return (
            <div>
                <h3>Edit Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                         <label>First Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}/>
                    </div>
                    <div className="form-group">
                         <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}/>
                    </div>
                    <div className="form-group">
                         <label>Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                         <label>Phone: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}/>
                    </div>
                     <div className="form-group">
                         <input type="submit"
                            value="Save Changes"
                            className="btn btn-success" /> 
                 </div>
                </form>
            </div>
        )
    }
}