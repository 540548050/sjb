import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Start from './start.js';
import StartDetail from './startDetail.js';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/advertising/advertisingEdit/start' component={Start}/>
                    <Route path='/advertising/advertisingEdit/start/detail/:id?' component={StartDetail}/>
                    <Route exact path='/advertising/advertisingEdit/banner' component={Banner}/>
                    <Route path='/advertising/advertisingEdit/banner/detail/:id?' component={BannerDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;