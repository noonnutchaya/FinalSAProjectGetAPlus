import React, { Component } from "react";
import NavBarVendor from "./component/NavBarVendor";
import './CSS/VendorPage.css';
import * as firebase from 'firebase';
import TestCollectDataToEmail from './TestCollectDataToEmail';

const db = firebase.firestore();
const dataCollectionName = "Orders";
const collection = db.collection(dataCollectionName);

class ReportNewPage extends Component {

  constructor() {
    super() 
      this.state = {
          data: []
      }
  }

  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || 
         !b.hasOwnProperty(key)) {
          return 0; 
      }
      
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? 
        (comparison * -1) : comparison
      );
    };
  }

  componentDidMount(){
    db.collection(dataCollectionName).where("stateWork", "==", "Order").onSnapshot(querySnapshot => {
        let userDataList = [];
        querySnapshot.forEach((doc) => {
            userDataList.push({
                Price: doc.data().Price,
                addreass: doc.data().addreass ? doc.data().addreass:"-",
                company: doc.data().company ? doc.data().company:"-",
                copies: doc.data().copies,
                days: doc.data().days,
                detailOrder: doc.data().detailOrder,
                emailUser: doc.data().emailUser,
                months: doc.data().months,
                orderDate: doc.data().orderDate,
                phoneNum: doc.data().phoneNum,
                quotationNum: doc.data().quotationNum,
                quotationPaper: doc.data().quotationPaper,
                vatNum: doc.data().vatNum ? doc.data().vatNum:"-",
                years: doc.data().years,
                stateWork: doc.data().stateWork,
                Id: doc.data().idDoc,
                workLink: doc.data().workLink
            });
        });
        userDataList.sort(this.compareValues("orderDate"))
        this.setState({ data: userDataList });
    })  
}

  renderTableHeader() {
    return <tr>
        <th> วันที่สั่งงาน </th>
        <th> หมายเลขใบเสนอราคา </th>
        <th> รายละเอียดงาน </th>
        <th> จำนวนชุด </th>
        <th> เบอร์โทรศัพท์ </th>
        <th> ที่อยู่ </th>
        <th> ชื่อบริษัท </th>
        <th> หมายเลขกำกับภาษี </th>
        <th> ราคารวม </th>
        <th> สถานะงาน </th>
        <th> Download File </th>
        <th> ส่งใบเสนอราคา </th>
    </tr>
  }

  renderContentTableOrder(){
    return this.state.data.map((orderItem, index) => {
        const { orderDate, quotationNum, detailOrder
            , copies, phoneNum, addreass
        , company, vatNum, Price, stateWork, Id, workLink} = orderItem 
        return (
            <tr>
                <td>{orderDate}</td>
                <td>{quotationNum}</td>
                <td>{detailOrder}</td>
                <td>{copies}</td>
                <td>{phoneNum}</td>
                <td>{addreass}</td>
                <td>{company}</td>
                <td>{vatNum}</td>
                <td>{Price}</td>
                <td>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {stateWork}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={this.selectState( 1, Id)}> Doing </a>
                            <a className="dropdown-item" onClick={this.selectState( 4, Id)}> Abort </a>
                        </div>
                    </div>
                </td>
                <td>
                    <a href={workLink} target="_blank" className="btn btn-secondary"> Download </a>
                </td>
                <td>
                    <TestCollectDataToEmail email={this.props.email} idDoc={Id}/>
                </td>
            </tr>
        )
    })
  }

  renderTableData() {
    if(this.state.data.length === 0){
        return (
            <tbody>
                {this.renderTableHeader()}
                <tr> 
                    <td colSpan="12">--No Data--</td>
                </tr>
            </tbody>
        );
    }else{
        return(
            <tbody>
                {this.renderTableHeader()}
                {this.renderContentTableOrder()}
            </tbody>
        );
    }
  }

  selectState = (status, idOrder) => {
    return function () {
        switch (status) {
            case 1:
                collection.doc(idOrder).update(
                    {stateWork: "Doing"}
                )
                break;
            case 4:
/*uncomment when want to hard delete order when change stateWork to "Abort" */
                // collection.doc(idOrder).delete().then(function() {
                //     alert("Delete this order complete.");
                // }).catch(function(error){
                //     console.log("Delete incomplete!");
                // })
                collection.doc(idOrder).update(
                  {stateWork: "Abort"}
                )
                break;
            
            default:
                break;
        }
    }
}

  render() {
    return (
      <div>
        <NavBarVendor/>
        <div className="layout">
          <h1 className="title"> งานสั่งใหม่ </h1>
          <div>
              <table id='students'>
                  {this.renderTableData()}
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportNewPage;

