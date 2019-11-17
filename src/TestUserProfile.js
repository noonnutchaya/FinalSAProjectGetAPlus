
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './CSS/setNumberInput.css';
import './index.css';
import { Modal, Button,Form,Input,Menu,message,Icon } from 'antd';

var checkPassword = -1 ;
var checkConfirmPassword = -1 ;

const success = () => {
    message.success('ดำเนินการเสร็จสิ้น');
  };
const warning = () => {
    message.warning('กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ถูกต้องและครบถ้วน');
  };

class TestUserProfile extends React.Component {
    state = {
        loading: false,
        visible: false,
        onfirmDirty: false,
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
            if (checkConfirmPassword == 1) {
                this.setState({ loading: true });
                setTimeout(() => {
                this.setState({ loading: false, visible: false });
                }, 1200);

                this.props.form.setFieldsValue({
                    password: "", 
                    confirm: "",  
              }); 
              success() ;
            }
            else {
                warning();
            }
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password') && form.getFieldValue('confirm').length >= 1) {
            checkConfirmPassword = 0 ;
          callback('กรุณายืนยันรหัสผ่านให้ถูกต้อง');
        } 
        if (form.getFieldValue('confirm').length < 1) {
            checkConfirmPassword = 0 ;
        } 
        if (value && value === form.getFieldValue('password') && form.getFieldValue('confirm').length >= 1) {
            checkConfirmPassword = 1 ;
        }
            callback();
            console.log("checkConfirmPassword",checkConfirmPassword);
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
    
  
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, loading } = this.state;
     
  
      return (

    <div>
        <Menu mode="horizontal">
            <Menu.Item >
                <span><Icon type="shopping-cart"  /> </span>
            </Menu.Item>

            <Menu.Item >
                <a href= "http://localhost:3000/Order"  rel="noopener noreferrer">
                <span> <Icon type="file-add" /> <span> สั่งงาน </span> </span>
                </a>
            </Menu.Item>

            <Menu.Item >
                {/* <a href=""  rel="noopener noreferrer"> */}
                <span> <Icon type="file-search" /> <span> ตรวจสอบงาน </span> </span>
                {/* </a> */}
            </Menu.Item>

            <Menu.Item >
                <a href="http://localhost:3000/UserAccount"  rel="noopener noreferrer">
                <span> <Icon type="user" /> <span> บัญชีผู้ใช้ </span> </span>
                </a>
            </Menu.Item>
         
        
        </Menu>

         <Button type="danger" shape="circle" icon="user" />

            <Button type="default" onClick={this.showModal}>
                แก้ไขรหัสผ่าน
            </Button>
            <Modal
              visible={visible}
              title="แก้ไขรหัสผ่าน"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>  SUBMIT  </Button>
              ]}
            >
              <Form>

              <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'กรุณากรอกรหัสผ่าน',
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
                message: 'กรุณายืนยันรหัสผ่าน',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  }
  
  const profilePage = Form.create({ name: 'normal_register' })( TestUserProfile);
  export default Form.create()(profilePage);