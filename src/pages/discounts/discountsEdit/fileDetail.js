import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';

// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Pagination,Breadcrumb,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import DiscountsFileDetail from 'components/discounts/fileDetail.js';
import Bread from 'components/global/bread';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            breadList:[
                {
                    name:'商品列表',
                    path:'/discounts/discountsEdit/file'
                },
                {
                    name:'新增商品',
                    path:''
                }
            ],
            name:_mm.getParam('name')
        }
    }
   
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    <Bread breadList={breadList}
                        edit={name}
                        check = {name}
                    />
                    <DiscountsFileDetail/>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);