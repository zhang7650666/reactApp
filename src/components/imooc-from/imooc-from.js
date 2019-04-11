import React, {Component} from 'react';
export default function imoocForm(Comp){
    
    return class WrapComp extends Component{
        // constructor(props){
		// 	super(props)
		// }
        state = {};
        handleChange = (key, val) => {
            this.setState({
                [key]:val,
            })
        }
        render(){
            return <Comp handleChange = {this.handleChange} state = {this.state} {...this.props}></Comp>
        }
    }
}