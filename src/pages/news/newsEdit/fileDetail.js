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
        this.state = {
            breadList:[
                {
                    name:'新闻文件',
                    path:'/news/newsEdit/file'
                },
                {
                    name:'新增文件',
                    path:''
                }
            ]
        }
    }
    render(){
        let {breadList} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                <Bread
                    breadList ={breadList}
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