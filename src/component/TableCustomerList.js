import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../CSS/table.css';
import * as firebase from 'firebase';
const db = firebase.firestore();

class TableCustomerList extends Component {

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
          db.collection("Users").orderBy("name").onSnapshot(querySnapshot => {
              let userDataList = [];
              querySnapshot.forEach((doc) => {
                  userDataList.push({
                    name: doc.data().name.toLowerCase(),
                    email: doc.data().email,
                    phoneNumber: doc.data().phoneNumber
                  })
              });
              userDataList.sort(this.compareValues("name"))
              this.setState({ data: userDataList });
              console.log(userDataList);
          })  
     }
   
    renderTableHeader() {
        return <tr>
            <th> ชื่อ </th>
            <th> Email </th>
            <th> เบอร์โทรศัพท์ </th>
            <th> รายการสั่งงาน </th>
        </tr>
    }

    renderTableData() {
        return this.state.data.map((user, index) => {
            const { name, email, phoneNumber } = user //destructuring
            return (
                <tr key={email}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phoneNumber}</td>
                    <td>
                        <Link
                            to={{
                                pathname: "/showOrder",
                                data: email // your data array of objects
                            }}
                        >
                            <button className="btn btn-secondary">Show</button>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

   render() { 
      return (
         <div>
            <table id='students'>
               <tbody>
                {this.renderTableHeader()}
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default TableCustomerList 