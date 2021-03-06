import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from 'components/global/navTab';
import style from '../common/banner.scss';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import newsEditApi from 'api/news/banner';
import commonApi from 'api/common.js';
import config from 'base/config.json';
import NewDetailComponent from 'components/news/newsDetail';
import Bread from 'components/global/bread';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsEdit/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsEdit/type'
            },
            {
                name:'新闻文件',
                url:'/news/newsEdit/file'
            }
        ]
        var nav_o = [
            {
                name:'新闻列表',
                url:'/news/newsEdit/file'
            }
        ]
        this.navList = _mm.isOuter() ? nav_o : this.navList;
        this.state = {
            breadList:[
                {
                    name:'新闻文件',
                    path:'/news/newsEdit/file'
                },
                {
                    name:'新增新闻',
                    path:''
                }
            ],
            name : _mm.getParam('name')
        }
    }
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                <Bread
                    breadList ={breadList}
                    check = {name}
                    audit = {name}
                    edit = {name}
                />
                    <div className='form-container'>
                        <NewDetailComponent/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);