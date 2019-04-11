import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import {PropTypes} from 'prop-types'
class AvatarSelector extends Component{
    // constructor(props) {
	// 	super(props)
	// 	this.state={}
    // }
    static ProsTypes = {
        selectAvatar: PropTypes.func.isRequired,
    }
    state = {}
    render(){
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                            .split(',')
                            .map( (v) => ({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }));
        const gridHeader = this.state.icon
                            ? (<div>
                                <span>已选择头像</span>
                                <img style={{width:20}} src={this.state.icon}></img>
                            </div>)
                            :(<div>请选择头像</div>)             
        return (
            <div className="avatar_select">
                <List renderHeader = {() => gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={3} 
                        onClick={(elm) => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
                
            </div>
        )
    }
}
export default AvatarSelector;