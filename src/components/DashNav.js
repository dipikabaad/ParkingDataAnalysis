import React from 'react';
import { Navbar, Nav, NavItem,FormGroup, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";

export class DashNav extends React.Component{

	constructor(props){
		super(props);
		this.state =( {
    		value: ""
 		 });
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSearch(e){
    	this.setState({ value: e.target.value });
  	}
  	handleSubmit(e){
    	//console.log('Inside Submit' + e);
    	//e.preventDefault();
    	this.props.callbackFromParent(this.state.value);
    	//console.log("zonevalue:");
    	//console.log(this.state.value);
      	//this.setState({
        //markers1: this.state.markers1.filter((x) => {return (((x.text || "").toLowerCase()).includes((this.state.value).toLowerCase()) || ((x.title || "").toLowerCase()).includes((this.state.value).toLowerCase()));})
      	//});
  	}
	render(){
		return(
			<Navbar inverse>
			  <Navbar.Header>
    			<Navbar.Brand>
      				<a href="/">AIPARK DASHBOARD</a>
    			</Navbar.Brand>
  				</Navbar.Header>
  				 <Navbar.Collapse >

					<Navbar.Form pullRight>
	      				<form onSubmit={this.handleSubmit}>
	        			<FormControl  type="text" placeholder="Type Zone Name" onChange={this.handleSearch} value={this.state.value}/><FormGroup>
	      				</FormGroup>{' '}
	      			<Button type="submit">Explore</Button>
	      			</form>
	   				 </Navbar.Form>

					
				 </Navbar.Collapse>
				</Navbar>


		);
	}
}