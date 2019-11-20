import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './CSS/setNumberInput.css';
import firebase from './firebase';
import NavBarVendor from './component/NavBarVendor';
import './CSS/VendorPage.css';

import './index.css';
import {
  Form,
  Input,
  Button,
  message,
} from 'antd';

var auth = firebase.auth();
var db = firebase.firestore();

var checkPassword = -1 ;
var checkNameCustomer = -1 ;
var checkPhone = -1 ;
var checkEmail = -1 ;
var checkConfirmPassword = -1;

const success = () => {
  message
    .loading('กำลังบันทึกข้อมูลสมาชิก...', 2)
    .then(() => message.success('ดำเนินการเสร็จสิ้น', 1.8))
    .then(() => message.success('การสมัครสมาชิกเสร็จสิ้น', 1.8))

    // ถ้าจะเปลี่ยนหน้า
    // .then(() => window.location.href = "/Home");

};

const fail = () => {
  message.warning('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',3);
};

const wrong = ()=>{
  message.error('การสมัครสมาชิกไม่สำเร็จ',3)
}


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password') && form.getFieldValue('confirm').length >= 1) {
        checkConfirmPassword = 0;
        callback('กรุณายืนยันรหัสผ่านให้ถูกต้อง');
    }

    if (value && value === form.getFieldValue('password') && form.getFieldValue('confirm').length >= 6) {
        checkConfirmPassword = 1;
    }
    callback();
    console.log("checkConfirmPassword", checkConfirmPassword);
};


validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
    }
    if (form.getFieldValue('password').length < 6) {
        callback('กรุณากรอกรหัสที่มีอย่างน้อย 6 ตัวอักษร');
        checkPassword = 0;
    }
    else if (form.getFieldValue('password').length >= 6) {
        checkPassword = 1;
    }

    callback();
};

  validateToName = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('customerName').length < 5) {
      checkNameCustomer = 0 ;
        callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
    }
    else {
      checkNameCustomer = 1 ;
    }
    callback();
    console.log('checkNameCustomer', checkNameCustomer);
  };

  validateToPhone = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('phone').length < 9) {
      checkPhone = 0 ;
      callback('กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน');
    }
    else if (form.getFieldValue('phone').length >= 11) {
      checkPhone = 0 ;
      callback('กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน');
    }
  else {
    checkPhone = 1 ;
  }
    console.log('checkPhone', checkPhone);
    callback();
  };

  validateToEmail = (rule, value, callback) => { 
    const { form } = this.props;
    if (form.getFieldValue('email').includes("@") == true && form.getFieldValue('email').includes(".") == true ) {
      checkEmail = 1 ;
      console.log('.....@@@@@');
  
      // callback('กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน');
    }
    else {
      callback('กรุณากรอก E-mail ให้ถูกต้อง');
      checkEmail = 0 ;
    }    
    console.log(checkEmail);
    callback();
  };


  addCustomer = e=> {
    try {
      if(checkPassword == 1 && checkNameCustomer == 1 && checkPhone == 1 && checkEmail == 1) {
        const { form } = this.props;    
        let email = form.getFieldValue('email');
        let password = form.getFieldValue('confirm');
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user){
          db.collection("Users").add({
            name: form.getFieldValue('customerName'),
            email: email,
            phoneNumber: form.getFieldValue('phone')
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              // alert('การสมัครสมาชิกเสร็จสิ้น');
              success();
              window.location = '/reportOrderPage';
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
              // alert('การสมัครสมาชิกไม่สำเร็จ กรุณาติดต่อแอดมิน');
              wrong();
          });
        })
        .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode+":"+errorMessage);
                fail();
                window.location = '/regisCustomer';
        });
   }
   else {
    console.log("error");
    fail();
   }
    }
    catch {
      fail();
     
    }
   

}

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return (
      <div>
        <NavBarVendor/>
      <div className="layout">
        <h1 className="title"> ลงทะเบียนลูกค้า </h1>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item label="ชื่อ - นามสกุล">
          {getFieldDecorator('customerName', {
            rules: [
              {
                required: true,
                validator: this.validateToName,
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                // type: 'email',
                // message: 'กรุณากรอก E-mail ให้ถูกต้อง',
                validator: this.validateToEmail,
                required: true,
              },
            ],
          })(<Input />)}
        </Form.Item>

        { <Form.Item label="เบอร์โทรศัพท์" hasFeedback >
              {getFieldDecorator('phone', {
                rules: [
                  
                  {
                    required: true,
                    validator: this.validateToPhone,
                  },
                ],
              })(<Input type="number" onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault() } />)}
            </Form.Item> }

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
               
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        
        <Button type="primary" onClick={this.addCustomer} htmlType="submit">
            Register
          </Button>
        
      </Form>
      </div>
      </div>
    );
  }
}

const registerPage = Form.create({ name: 'normal_register' })( RegistrationForm);
export default Form.create()(registerPage);