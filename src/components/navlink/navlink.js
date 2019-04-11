import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {searcha} from '../../redux/user.redux'
@withRouter
@connect(
    state => state,
    {searcha}
)
class NavLinkBar extends Component{
    componentDidMount(){
        // this.props.searcha();
    }
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render(){
        // console.log(this.props);
        const navList = this.props.data.filter(v=> !v.hide);
        // console.log(navList);
        const {pathname} = this.props.location;
        return(
            <TabBar style={{height:'auto'}}>
                {
                    navList.map(v => (
                        <TabBar.Item
                            badge={v.path === '/msg'?this.props.chat.unread:null}
                            key={v.path}
                            title={v.text}
                            icon={{uri:require(`./img/${v.icon}.png`)}}
                            selectedIcon = {{uri:require(`./img/${v.icon}-active.png`)}}
                            selected={pathname == v.path}
                            onPress = {() => {
                                    this.props.history.push(v.path);
                                }
                            }
                        > 
                        </TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
};
export default NavLinkBar;