import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import DiscountsEdit from './discountsEdit/router.js';
import DiscountsIssue from './discountsIssue/router.js';
import DiscountsAudit from './discountsAudit/router.js';
import Order from './order.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/discounts/discountsEdit' component={DiscountsEdit}/>
                    <Route path='/discounts/discountsIssue' component={DiscountsIssue}/>
                    <Route path='/discounts/discountsAudit' component={DiscountsAudit}/>
                    <Route path='/discounts/order' component={Order}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;