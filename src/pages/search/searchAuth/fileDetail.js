import React,{Component} from 'react';
import _mm from 'util/mm.js';
// import NavTab from './common/nav.js';
import style from 'common/layout.scss';

// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Pagination,Breadcrumb,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import VideoDetail from 'components/video/fileDetail.js';
import Bread from 'components/global/bread';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            breadList:[
                {
                    name:'视频文件',
                    path:'/video/videoEdit/file'
                },
                {
                    name:'新增视频',
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
                    {/* <Bread breadList={breadList}
                        edit={name}
                        check = {name}
                    /> */}
                    <VideoDetail/>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);