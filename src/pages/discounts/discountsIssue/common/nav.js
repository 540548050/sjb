import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/discounts/discountsIssue/banner'
            },
            {
                name:'商品类型',
                url:'/discounts/discountsIssue/type'
            },
            {
                name:'商品列表',
                url:'/discounts/discountsIssue/file'
            }
        ]
    }
    render(){
        return (
            <div>
                <NavTab navList = {this.navList} />
            </div>
        )
    }
}
export default Nav;