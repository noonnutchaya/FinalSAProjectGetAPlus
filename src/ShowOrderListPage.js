import React, { Component } from "react";
import TableReportStatus from "./component/TableReportStatus";
import NavBarVendor from "./component/NavBarVendor";
import './CSS/VendorPage.css';

class ShowOrderListPage extends Component {


  render() {
    const { data } = this.props.location
    return (
      <div>
        <NavBarVendor/>
        <div className="layout">
          <h1 className="title"> แสดงรายการสั่งงาน </h1>
          <TableReportStatus email={data}/>
        </div>
      </div>
    );
  }
}

export default ShowOrderListPage;

