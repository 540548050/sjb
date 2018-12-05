import React,{Component} from 'react';
import { Card ,Select,DatePicker,Col,Row} from 'antd'
import ReactEcharts from 'echarts-for-react';
import api from 'api/home/data.js';
import mm from 'util/mm.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
import style from '../common.scss';
class G1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        api.getG2().then(res=>{
            let {eighteen,fifty,fortyNine,thirtyNine,twentyFour,twentyNine} = res[0];
            this.setState({data:[eighteen,twentyFour,twentyNine,thirtyNine,fortyNine,fifty]})
        })
    }
    render(){
        let {data} = this.state;
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}",
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            yAxis:{
                type:'value'
            },
            xAxis :{
                type: 'category',
                data: ['18岁以下','18-24岁','25-29岁','30-39岁','40-49岁','50岁以上']
            },
            series : [
                {
                    name: '年龄',
                    type: 'bar',
                    barWidth: '40%',
                    data:data,
                    itemStyle: {
                        normal: {
                            color: '#6EADF4'
                        }
                    }
                }
            ]
        };
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>年龄分布</div>
                <div className={style.panelBody}>
                    <Row>
                        <ReactEcharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:'300px'}}
                        />
                    </Row>    
                </div>
            </div>
        )
    }
}
export default G1;