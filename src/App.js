import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ShowWelcomePage from './ShowWelcomePage';
import ShowSeccessPage from './ShowSeccessPage';
import DownloadFile from './DownloadFile';
import './CSS/setImg.css';
import SignUp from './SignUp';
import VendorPage from './VendorPage';
import ReportOrderPage from './ReportOrderPage';
import RegistrationForm from './RegistrationForm';
import LoginCustomerPage from './LoginCustomerPage';
import ShowOrderListPage from './ShowOrderListPage';
import OrderFormWithCheck from './OrderFormWithCheck';
import TestCollectDataToEmail from './TestCollectDataToEmail';
import CheckCustomerOrderPage from './CheckCustomerOrderPage';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/'   component = {TestCollectDataToEmail} />
          <Route path='/home'     component = {HomePage} />
          <Route path='/order'    component = {OrderFormWithCheck} />
          <Route path='/confirm'  component = {ShowSeccessPage} />
          <Route path='/signup' component = {SignUp} />
          <Route path='/check'  component = {DownloadFile} />
          <Route path='/vendor' component = {VendorPage} />
          <Route path="/reportOrderPage" component = {ReportOrderPage} />
          <Route path="/portalCustomer" component ={LoginCustomerPage}/>
          <Route path="/regisCustomer" component ={RegistrationForm}/>
          <Route path="/showOrder" component ={ShowOrderListPage}/>
          <Route path="/CheckCustomerOrderPage" component={CheckCustomerOrderPage}/>
        </Switch>
       </Router>


  );
}

export default App;
