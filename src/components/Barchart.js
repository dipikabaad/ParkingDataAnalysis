import React from 'react';
import {XYPlot, XAxis, YAxis, LineSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';

export class Barchart extends React.Component{
	constructor(props){

		super(props);
		this.state = {
			data1: this.props.data,
      data2: this.props.data
		};
		this.updateData = this.updateData.bind(this);
	}

 componentWillMount(){
 	//console.log("before chart mounting",this.props.data);
    //this.updateData();
   }
   componentDidMount(){
 	//console.log("after updating ",this.props.data);

   	//this.updateData();
   }
   componentWillReceiveProps(nextProps) {
   	//this.updateData(nextProps.data)
   	this.props = nextProps;
   	this.updateData();
    //this.setState({data: nextProps.data});
}
  

  
   updateData(){
   	//console.log(this.props.data);
   	const dataArr1 = this.props.data.map((d)=> {
    return {x: new Date(d.Date_time.slice(0,4),d.Date_time.slice(5,7)-1,d.Date_time.slice(8,10),d.Date_time.slice(11,13),'00','00'), 
    y: parseFloat(d.parkings_booked)}
	   });
    const dataArr2  = this.props.data.map((d)=> {
    return {x: new Date(d.Date_time.slice(0,4),d.Date_time.slice(5,7)-1,d.Date_time.slice(8,10),d.Date_time.slice(11,13),'00','00'), 
    y: parseFloat(d.final_predicted)}
      });
	this.setState({data1: dataArr1, data2: dataArr2});
	console.log(this.state.data);
	console.log(this.props.data);
   }
	 render(){ 	

    return (
            <XYPlot
              xType="time"
                width={1200}
                height={300}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}}/>
        <VerticalGridLines style={{stroke: '#B7E9ED'}}/>
        <XAxis title="X Axis" style={{
          line: {stroke: '#ADDDE1'},
          ticks: {stroke: '#ADDDE1'},
          text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
        }} position="start" 
          />
                <YAxis title="Y Axis" />
                <LineSeries className="first-series" data={this.state.data1} style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
            
          }} />
            <LineSeries className="second-series" data={this.state.data2} strokeDasharray="7, 3" strokeColor="#B7E9ED"/>

            </XYPlot>
        );

        }
}

Barchart.defaultProps = { data: [
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:10},
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:15},
                        {Date_time: new Date("2018","07","02","00","00","00"), parkings_booked: 20}
                    ]}

