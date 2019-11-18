import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ShowWelcomePage from './ShowWelcomePage';
import DownloadFile from './DownloadFile';
import './CSS/setImg.css';
import VendorPage from './VendorPage';
import ReportOrderPage from './ReportOrderPage';
import RegistrationForm from './RegistrationForm';
import ShowOrderListPage from './ShowOrderListPage';
import OrderFormWithCheck from './OrderFormWithCheck';
import CheckCustomerOrderPage from './CheckCustomerOrderPage';
import LoginWithCheck from './LogInWithCheck';
import TestUserProfile from './TestUserProfile';
import ShowWelcomeVendorPage from './ShowWelcomeVendorPage';
import LoginCustomerPage from './LoginCustomerPage'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/'   component = {ShowWelcomePage} />
          <Route path='/order'    component = {OrderFormWithCheck} />
          <Route path='/check'  component = {DownloadFile} />
          <Route path='/vendor' component = {VendorPage} />
          <Route path="/reportOrderPage" component = {ReportOrderPage} />
          <Route path="/portalCustomer" component ={LoginWithCheck}/>
          <Route path="/regisCustomer" component ={RegistrationForm}/>
          <Route path="/showOrder" component ={ShowOrderListPage}/>
          <Route path="/CheckCustomerOrderPage" component={CheckCustomerOrderPage}/>
          <Route path='/UserAccount'  component = {TestUserProfile} />
          <Route path='/HomeVendor' component ={ShowWelcomeVendorPage}/>
        </Switch>
       </Router>


  );
}

export default App;
