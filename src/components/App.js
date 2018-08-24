//var _ =require('loadash');
import React from 'react';
import { Panel} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { DashNav } from './DashNav'
import CsvParse from '@vtex/react-csv-parse';
import {Chart} from './Chart'
import {Barchart} from './Barchart';
import {HeatMap} from './HeatMap';

import '../../node_modules/react-vis/dist/styles/examples.scss'
import '../../node_modules/react-vis/dist/styles/legends.scss'
import '../../node_modules/react-vis/dist/styles/plot.scss'
import '../../node_modules/react-vis/dist/styles/radial-chart.scss'
import '../../node_modules/react-vis/dist/styles/treemap.scss'


const fetch = require("isomorphic-fetch");
const API_URL = "https://nataliia-radina.github.io/react-vis-example/";


export class App extends React.PureComponent{

constructor(props){
		super(props);
		this.state =( {
      //setting some initial randoom values
    		data: [],
        filteredData: [],
    		magiic: [],
    		results1: [],
        zone:"1-0",
        heatmapData: [],
        heatmapDataOriginal:[] 
 		 });
    this.handleData = this.handleData.bind(this);
    this.myCallback = this.myCallback.bind(this);
		//this.updateData = this.updateData.bind(this);
	}


	handleData = data => {

  this.setState({ data: data , filteredData: data});

}
   
  
componentDidMount() {

    fetch('./heatmap_input.json')
      .then(res => res.json())
      .then(res =>
		
		this.setState({heatmapDataOriginal:res,heatmapData: res.filter((r) => {return (r.zone_name.startsWith(this.state.zone.slice(0,this.state.zone.indexOf("-")+1)))})}));

        }

componentDidUpdate(prevProps, prevState, snapshot){
	//console.log("prevstate",prevState);
  console.log("currnet",this.state.zone);
}
myCallback = (zoneval) => {
    
    

    this.setState({ filteredData: this.state.data.filter((r) => {return (r.zone_name == zoneval)}), zone: zoneval});
    console.log("current zone val");
    console.log(this.state.zone);
    this.setState({heatmapData: this.state.heatmapDataOriginal.filter((r) => {return (r.zone_name.startsWith(zoneval.slice(0,zoneval.indexOf("-")+1)))})});
    console.log("heatmap Data in myCall back")
    console.log(this.state.heatmapData);
    //console.log(this.state.data);
  
}
render(){
		  const keys = [
      "index","row","Date_time","parkings_booked","zone_name","weekday","hour","zone_name1","final_predicted"
  ]
  //console.log("print render",this.state.magiic);
		return(<div>
			<DashNav callbackFromParent={this.myCallback}/>
			<CsvParse
      keys={keys}
      onDataUploaded={this.handleData}
      onError={this.handleError}
      render={onChange => <input type="file" onChange={onChange} />}
    />
			<Panel bsStyle="primary">
    			<Panel.Heading>
      				<Panel.Title componentClass="h3">Linechart for the zone {this.state.zone}</Panel.Title>
    			</Panel.Heading>
    		<Panel.Body> <Chart data={this.state.filteredData}/></Panel.Body>
  			</Panel>
  			<Panel bsStyle="primary">
    			<Panel.Heading>
      				<Panel.Title componentClass="h3">Comparing Predictions and Original Parkings booked for zone {this.state.zone}</Panel.Title>
    			</Panel.Heading>
    		<Panel.Body><Barchart data={this.state.filteredData}></Barchart></Panel.Body>
  			</Panel>
    

                <Panel bsStyle="primary" style={{width:"1200px", position: "relative", float:'left'}}>
          <Panel.Heading>
              <Panel.Title componentClass="h3">HeatMap of Zones and Parkings</Panel.Title>
          </Panel.Heading>
        <Panel.Body><HeatMap data={this.state.heatmapData}></HeatMap></Panel.Body>
        </Panel>


			</div>

		);
	}
}

