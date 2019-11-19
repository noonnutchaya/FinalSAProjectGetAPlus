import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import TableCustomerList from './component/TableCustomerList';
import NavBarVendor from './component/NavBarVendor';
import { Link } from "react-router-dom";
import './CSS/VendorPage.css';

const auth = firebase.auth();
const firestore = firebase.firestore();


class ReportOrderPage extends React.Component {
  
  constructor(){
    super()

    firebase.auth().onAuthStateChanged(user => {
      // if(!user) {
      //   window.location = '/vendor'; 
      // }else{
        const email = auth.currentUser.email
        let emailVendor = []
        firestore.collection("EmailVendor").onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
              emailVendor.push(doc.data().email)
          });
        })  
        console.log(emailVendor, emailVendor.length)
      
        let isAuthorize = false
        for(let i=0;i <= emailVendor.length;i++){
          if(email === emailVendor[i]){
            isAuthorize = true
          }
          console.log(isAuthorize)
        }
        // if(!isAuthorize){
        //   window.location = '/home'
        // }
      }
    // }
    );
  }

  render() {
    // firebase.auth().onAuthStateChanged(user =>{
    //   if(!user){
    //     return( <Link to="/reportOrderPage"/> );
    //   }else{
    //     return (
    //       <div>
    //         <NavBarVendor/>
    //         <div className="container">
    //           <h1>Customer List Table</h1>
    //           <TableCustomerList/>
    //         </div>
    //       </div>
    //     );
    //   }
    // });
    return (
      <div>
        <NavBarVendor/>
        <div className="layout">
          <h1 className="title"> รายชื่อลูกค้า </h1>
          <p> คำแนะนำ : ปุ่ม "show" ด้านหลังแถวสามารถแสดงตารางการสั่งงานต่างๆของลูค้ารายนั้นได้ และสามารถใช้ตารางนี้ในการปรับแก้สถานะงาน </p>
          <TableCustomerList/>
        </div>
      </div>
    );
  }
}
export default ReportOrderPage;