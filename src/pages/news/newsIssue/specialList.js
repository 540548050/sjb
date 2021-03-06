import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import recommendApi from 'api/search/recommend.js';
import commonApi from 'api/common.js'
import videoApi from 'api/video/index.js';
import newsApi from 'api/news/category.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import Bread from 'components/global/bread';
import OtherNewsModal from 'components/global/otherNewsModal';
import _mm from 'util/mm.js';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class Banner extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'新闻类型',
                path:'/news/newsIssue/type'
            },
            {
                name:_mm.getParam('name'),
                path:''
            }
        ]
        this.navList = [
            {
                name:'专题列表',
                url:'/news/newsIssue/type/specialList/12345/?name=专题报道'
            }
        ]
        this.state={
            //当前的状态
            selectValue:'3',
            name:_mm.getParam('name'),
            id:this.props.match.params.id,
            //当前render的数据
            dataList:[],
            //当前的原数据
            originDataList:[],
            //原数据
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            originData:[],
            pageSize:12,
            total:0,
            pageNum:1,
            //弹出框
            modalVisible:false
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageSize,pageNum,selectValue,isSearch,searchValue,id} = this.state;
        if(isSearch){
            newsApi.getCategoryList({
                id,
                currPage:pageNum,
                pageSize,
                title:searchValue,
                theissue:selectValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            newsApi.getCategoryList({
                id,
                currPage:pageNum,
                pageSize,
                theissue:selectValue
            }).then(res=>{
                console.log(res);
                let totalCount = res[0].total;
                let list = res[0].list;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            }).catch(err=>{
                message.error(err)
            })
        }
        
    }
    //搜索
    searchTitle(value){
        if(!value){
            this.setState({
                isSearch:false,
                pageNum:1,
                searchValue:''
            },()=>{
                this.loadList();
            })
        }else{
            this.setState({
                isSearch:true,
                pageNum:1,
                searchValue:value
            },()=>{
                this.loadList();
            })
        }
    }
    //选择类型
    select(value){
        this.setState({
            selectValue:value
        },()=>{
            this.loadList();
        })
    }
    //点击分页
    changePage(pageNum){
		this.setState({
            pageNum
        },()=>{
            this.loadList();
        })
    }
    //跳转到添加页面
    goAddBanner(){
        let {id,name} = this.state;
        this.props.history.push(`/news/newsIssue/type/specialDetail/?id=${id}&name=${name}`)
    }
    //点击查看图标
    clickCheck(item){
        let {name} = this.state;
        // this.props.history.push(`/discounts/discountsEdit/file/fileDetail/${id}/?checked=0&name=${name}`)
        this.props.history.push(`/news/newsIssue/type/specialDetail/${item.specialId}/?id=${item.categoryId}&checked=0&name=${name}&specialName=${item.specialName}`)
    }
    //点击编辑图标
    clickEdit(item){
        let {name} = this.state;
        this.props.history.push({
            pathname:`/news/newsIssue/type/specialDetail/${item.specialId}/?id=${item.categoryId}&checked=1&name=${name}&specialName=${item.specialName}`
        })
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                newsApi.delCategory({specialId:item.specialId}).then(res=>{
                    message.success('删除成功！')
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    //点击发布
    clickPublish(item){
        let {specialId} = item;
        let {selectValue} = this.state;
        let theissue = selectValue == '4' ? '5' :'4'; 
        newsApi.addCategory({specialId,theissue}).then(res=>{
            message.success('操作成功！')
            this.loadList()
        }).catch(err=>{
            message.error(err)
        })
    }
    //关联后的回调
    relevanceCallback(selectedRowKeys,fn){
        let {id} = this.state;
        console.log(selectedRowKeys)
        videoApi.addRelFile({
            id,
            categoryContentlist:selectedRowKeys
        }).then(res=>{
            this.setState({
                modalVisible:false
            },()=>{
                fn();
                this.loadList();
                message.success('关联文件成功！');
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {pageNum,name,selectValue} = this.state;
        let handle_1 = (item)=>{
            return (
                <div>
                    <IconHandle type='1'  iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='3'  iconClick={()=>{this.clickEdit(item)}}/>
                    <IconHandle type='4'  iconClick={()=>{this.clickPublish(item)}}/>
                    <IconHandle type='2'  iconClick={()=>{this.clickDel(item)}}/>
                </div>
            )
        }
        let handle_2 = (item)=>{
            return (
                <div>
                    <IconHandle type='1'  iconClick={()=>{this.clickCheck(item)}}/>
                    {/* <IconHandle type='3'  iconClick={()=>{this.clickEdit(item)}}/> */}
                    <IconHandle type='6'  iconClick={()=>{this.clickPublish(item)}}/>
                    {/* <IconHandle type='2'  iconClick={()=>{this.clickDel(item)}}/> */}
                </div>
            )
        }
        let handle_3 = (item)=>{
            return (
                <div>
                    <IconHandle type='1'  iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='3'  iconClick={()=>{this.clickEdit(item)}}/>
                    <IconHandle type='4'  iconClick={()=>{this.clickPublish(item)}}/>
                    <IconHandle type='2'  iconClick={()=>{this.clickDel(item)}}/>
                </div>
            )
        }
        let handleList;
        if(selectValue == 3){
            handleList = handle_1;
        }else if(selectValue == 4){
            handleList = handle_2;  
        }else{
            handleList = handle_3;
        }
        return (
            <div className={style.container}>
                <NavTab navList={this.navList}/>
                <div className={style.content}>
                    <OtherNewsModal 
                        activeType ={0}
                        visible={this.state.modalVisible} 
                        ok={()=>{this.setState({modalVisible:false})}}
                        cancel={()=>{this.setState({modalVisible:false})}}
                        callback = {(selectedRowKeys,fn)=>this.relevanceCallback(selectedRowKeys,fn)}
                        canChange = {true}
                    />
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <div className='fl' style={{marginRight:'10px'}}>
                                <Bread
                                    breadList = {this.breadList}
                                />
                            </div>
                            <div className='fl'>
                                <Select
                                    showSearch
                                    style={{ width: 140 }}
                                    optionFilterProp="children"
                                    // defaultValue = {this.state.selectValue}
                                    value = {selectValue}
                                    onChange={(value)=>{this.select(value)}}
                                >
                                    <Option value="3">待发布</Option>
                                    <Option value="4">已发布</Option>
                                    <Option value="5">已下线</Option>
                                </Select>
                            </div>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增专题
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'30%',name:'专题名称'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'},{width:'20%',name:'管理'},]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.specialName}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                       {handleList(item)}
                                   </td>
                                   <td>
                                        <Link className='gl-link' to={`/news/newsIssue/type/specialNewsList/${item.specialId}/?categoryId=${item.categoryId}&name=${name}&specialName=${item.specialName}`} ><Icon type="link" />
                                            关联文件
                                        </Link>
                                   </td>
                               </tr>
                           )
                       })}
                    </TableList>
                    <div className='clearfix'>
                        <div className='fr'>
                            <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
                            current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                            total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Banner);