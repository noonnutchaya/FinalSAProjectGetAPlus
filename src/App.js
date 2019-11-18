import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import './CSS/setImg.css';
import VendorPage from './VendorPage';
import ReportOrderPage from './ReportOrderPage';
import RegistrationForm from './RegistrationForm';
import ShowOrderListPage from './ShowOrderListPage';
import ShowWelcomeVendorPage from './ShowWelcomeVendorPage';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/'   component = {ShowWelcomeVendorPage} />
          <Route path='/vendor' component = {VendorPage} />
          <Route path="/reportOrderPage" component = {ReportOrderPage} />
          <Route path="/regisCustomer" component ={RegistrationForm}/>
          <Route path="/showOrder" component ={ShowOrderListPage}/>
        </Switch>
       </Router>


  );
}

export default App;
