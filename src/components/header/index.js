import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Menu, Icon,Dropdown,Modal,Row, Col ,Input,message} from 'antd';
import {Link} from 'react-router-dom';
import _mm from 'util/mm.js';
import Logo from 'images/nlogo.png';
import Validate from 'util/validate';
import userApi from 'api/user/index.js'
// import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;
import style from  './index.scss';
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName:'未登陆',
      modalShow:false,
      errorMsg:'',
      newPassword:'',
      confirmPassword:'',
      oldPassword:'',
      //提示密码修改
      pwdShow:false
    }
  }
  componentWillMount(){
    let body = document.documentElement.getElementsByTagName('body')[0];
    let html = document.documentElement;
    html.style.width = html.style.height = body.style.width = app.style.height = 'auto';
    let admin = _mm.getStorage('userInfo');
    admin && ( admin = JSON.parse(admin))
    this.setState({
      userName:admin.name?admin.name:'未登陆'
    },()=>{
      let isPopup = admin.isPopup;
      if(isPopup !='1'){
        this.showPwd();
      }
    })
  }
  showPwd(){
    confirm({
      title:'密码即将过期，是否前去修改？',
      onOk:()=>{
          this.setState({modalShow:true})
      },
      okText:'确认',
      cancelText:'取消'
  })
  }
  componentDidMount(){
    console.log(this.props.match)
  }
  logout(){
    _mm.removeStorage('token');
    _mm.removeStorage('userInfo');
    this.props.history.push('/login');
  }
  updatePassWord(){
    let msg = this.validate();
    let {confirmPassword,oldPassword} = this.state;
    this.setState({errorMsg:msg})
    if(!msg){
      userApi.updatePassword({
        number:confirmPassword,
        initialPassword:oldPassword
      }).then(res=>{
        message.success('修改密码成功！');
        this.setState({modalShow:false},()=>{
          this.props.history.push('/login');
        });
      }).catch(err=>{
        this.setState({errorMsg:err});
        message.error(err)
      })
    }
  }
  validate(){
    let validate = new Validate();
    let {newPassword,confirmPassword,oldPassword} = this.state;
    validate.add(oldPassword,'notEmpty','输入密码不能为空！');
    validate.add(newPassword,'notEmpty','输入密码不能为空！');
    validate.add(confirmPassword,'notEmpty','输入密码不能为空！');
    validate.add(newPassword,`isSame:${confirmPassword}`,'两次输入密码不一致！');
    return validate.start();
  }
  onInput(e){
    let name = e.target.name,
        value = e.target.value;
        this.setState({
          [name]:value
        })
  }
  render() {
    let {pwdShow} = this.state;
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={()=>{this.logout()}} >退出登录 <Icon type="logout"/></a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={()=>{this.setState({modalShow:true})}} >修改密码 <Icon type="lock"/></a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className = {style.headerContainer}>
        <Modal
          title="修改密码"
          visible={this.state.modalShow}
          onOk={()=>{this.updatePassWord()}}
          onCancel = {()=>{this.setState({modalShow:false})}}
          okText = '确定'
          cancelText ='取消'
        >
          <div style={{marginBottom:'10px'}}>
            <Row>
              <Col span={6}>
                输入旧密码*
              </Col>
              <Col span={14}>
                <Input value={this.state.oldPassword} type='password' name='oldPassword' onChange={(e)=>this.onInput(e)}/>
              </Col>
            </Row>
          </div>
          <div style={{marginBottom:'10px'}}>
            <Row>
              <Col span={6}>
                输入新密码*
              </Col>
              <Col span={14}>
                <Input value={this.state.newPassword} type='password' name='newPassword' onChange={(e)=>this.onInput(e)}/>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col span={6}>
                确认新密码*
              </Col>
              <Col span={14}>
                <Input value={this.state.confirmPassword} type='password'  name='confirmPassword' onChange={(e)=>this.onInput(e)} />
              </Col>
            </Row>
          </div>
          <div style={{color:'#DD5246'}}>
            <Row>
                <Col span={6}></Col>
                <Col span={14}>
                  {this.state.errorMsg}
                </Col>
              </Row>
          </div>
        </Modal>
        <div className={style.headLogo}>
           <img src={Logo} width='140px' height="45px"/>
        </div>
        <div className={style.headHandle + ' fr'}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="user"/> {this.state.userName} <Icon type="down" />
          </a>
        </Dropdown>
        </div>
      </div>
    )
  }
}
export default withRouter(Header);