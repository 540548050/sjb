import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.scss';
// 引入图标和文字描述
import AuditFont from 'images/icons/audit-font.png';
import AuditIcon from 'images/icons/audit-icon.png';
import checkFont from 'images/icons/check-font.png';
import checkIcon from 'images/icons/check-icon.png';
import delFont from 'images/icons/del-font.png';
import delIcon from 'images/icons/del-icon.png';
import editFont from 'images/icons/edit-font.png';
import editIcon from 'images/icons/edit-icon.png';
import onlineFont from 'images/icons/online-font.png';
import onlineIcon from 'images/icons/online-icon.png';
import topFont from 'images/icons/top-font.png';
import topIcon from 'images/icons/top-icon.png';
import unlineFont from 'images/icons/unline-font.png';
import unlineIcon from 'images/icons/unline-icon.png';
import showFont from 'images/icons/show-font.png';
import showIcon from 'images/icons/show-icon.png';
import hideFont from 'images/icons/hide-font.png';
import hideIcon from 'images/icons/hide-icon.png';
import unpinIcon from 'images/icons/unpin-icon.png';
import unpinFont from 'images/icons/unpin-font.png';
// 0：审核；
// 1：查看;
// 2:删除；
// 3：编辑；
// 4：上线：
// 5：置顶；
// 6：下线；
// 7: 显示评论
// 8：隐藏评论
// 9: 取消置顶

// 参数传入
// 1.type 图标的类型
// 2.iconClick 点击后的回调
// 3.id 对应的标题id
class Icon extends Component{
    constructor(props){
        super(props)
        this.state={
            currentFont:'',
            currentIcon:'',
            list:[
                {
                    font:AuditFont,
                    icon:AuditIcon
                },
                {
                    font:checkFont,
                    icon:checkIcon
                },
                {
                    font:delFont,
                    icon:delIcon
                },
                {
                    font:editFont,
                    icon:editIcon
                },
                {
                    font:onlineFont,
                    icon:onlineIcon
                },
                {
                    font:topFont,
                    icon:topIcon
                },
                {
                    font:unlineFont,
                    icon:unlineIcon
                },
                {
                    font:showFont,
                    icon:showIcon
                },
                {
                    font:hideFont,
                    icon:hideIcon
                },
                {
                    font:unpinFont,
                    icon:unpinIcon
                }

            ]
        }
    }
    componentWillMount(){
        let index = this.props.type;
        this.setState({
            currentFont:this.state.list[index].font,
            currentIcon:this.state.list[index].icon
        })
    }
    componentWillReceiveProps(){
        let index = this.props.type;
        this.setState({
            currentFont:this.state.list[index].font,
            currentIcon:this.state.list[index].icon
        })
    }
    render(){
        return (
            <div onClick={()=>{this.props.iconClick(this.props.id)}} className={style.icon}>
                <img src={this.state.currentIcon}/>
                <img className={style.fontImg} src={this.state.currentFont}/>
            </div>
        )
    }
}
Icon.defaultProps={
    type:0,
    id:0
}
export default Icon;