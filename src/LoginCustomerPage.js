import React, { Component } from "react";
import LoginCustomerComponent from "./component/LoginCustomerComponent";
import './CSS/VendorPage.css';

class LoginCustomerPage extends Component {
  render() {
    return (
      <div className="layout">
        <h1 className="title"> ยืนยันตัวตนลูกค้า </h1>
        <LoginCustomerComponent />
        <div className="regis-form">
          <a href="http://localhost:3000/regisCustomer">Register Account</a>
        </div>
      </div>
    );
  }
}

export default LoginCustomerPage;

