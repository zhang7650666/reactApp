import React, {Component} from "react";
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/login'; // 登录
import Register from './components/register/register' // 注册
import AuthRouter from './components/authroute/authroute'; // 审核
import BossInfo from './components/bossinfo/bossinfo'; // boss信息
import GeniusInfo from './components/geniusinfo/geniusinfo'; // 牛人信息
import DashBoard from './components/dashboard/dashboard';
import Chat from './components/chat/chat';
class App extends Component{
    state={
        hasError:false,
    }
    componentDidCatch(){
       this.setState({
           hasError:true,
       })
    }
    render(){
        return this.state.hasError?<img src={require(`./components/img/boy.png`)} alt="error"/>:(
            <div>
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    {/* <Route path='/authrouter' component={AuthRouter}></Route> */}
                    <Route component={DashBoard} ></Route>
                </Switch> 
            </div>
        )
    }
}
export default App
