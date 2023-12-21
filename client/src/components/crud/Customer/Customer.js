import React from 'react';
import './Customer.css';
import { Link } from 'react-router-dom';

const Customer = ({ _id, name, email, phone, removeCustomer }) => {

  return(
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ phone }</td>
      <td>
        <button onClick={ () => removeCustomer(_id) } className="Action-Button delete">Delete</button>
        <Link to={{ pathname: '/edit', search: _id }}>
         <button className="Action-Button  edit">Edit</button>
        </Link>
      </td>

    </tr>
  );
};

export default Customer;
