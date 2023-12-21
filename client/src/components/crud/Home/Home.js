import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import swal from 'sweetalert';
import Customer from "../Customer/Customer"

class TotalCustomer extends Component {
  state = {
    data: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const customers = await axios("http://localhost:9002/customers/");
      this.setState({ data: customers.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeCustomer = async id => {
    try {
      const customerRemoved = await axios.delete(`http://localhost:9002/customers/${id}`);
      const customers = await axios("http://localhost:9002/customers/");
      this.setState({ data: customers.data });
      swal("Deleted!", "Successfully!", "success");
    } catch (err) {
      this.setState({ error: err.message });
      swal("Deleted!", "Error!", "success");
    }
  };


  render() {
    let customers;

    if (this.state.data)
    customers =
        this.state.data.customers &&
        this.state.data.customers.map(customer => (
          <Customer key={customer._id} {...customer} removeCustomer={this.removeCustomer} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    return (
      <div className="Table-Wrapper">
        <h1>Customers</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>{customers}</tbody>
        </table>
      </div>
    );
  }
}

export default TotalCustomer;
