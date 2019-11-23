import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import './CSS/setImg.css';
import VendorPage from './VendorPage';
import ReportOrderPage from './ReportOrderPage';
import RegistrationForm from './RegistrationForm';
import ShowOrderListPage from './ShowOrderListPage';
import ShowWelcomeVendorPage from './ShowWelcomeVendorPage';
import ReportNewPage from './ReportNewPage';
import WorkDoingPage from './WorkDoingPage';
import WorkDonePage from './WorkDonePage';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/'   component = {ShowWelcomeVendorPage} />
          <Route path='/vendor' component = {VendorPage} />
          <Route path="/reportOrderPage" component = {ReportOrderPage} />
          <Route path="/regisCustomer" component ={RegistrationForm}/>
          <Route path="/showOrder" component ={ShowOrderListPage}/>
          <Route path="/ReportNewPage" component ={ReportNewPage}/>
          <Route path="/WorkDoingPage" component ={WorkDoingPage}/>
          <Route path="/WorkDonePage" component ={WorkDonePage}/>
        </Switch>
      </Router>


  );
}

export default App;
