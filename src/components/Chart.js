import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

export class Chart extends React.Component{
	constructor(props){

		super(props);
		this.state = {
			data: this.props.data
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
   	const dataArr = this.props.data.map((d)=> {
      //2018-08-02 00:00:00
    return {x: new Date(d.Date_time.slice(0,4),d.Date_time.slice(5,7)-1,d.Date_time.slice(8,10),d.Date_time.slice(11,13),'00','00'), 
    y: parseFloat(d.parkings_booked)}
	})
	this.setState({data: dataArr});
	//console.log(this.state.data);
	//console.log(this.props.data);
   }
	 render(){ 	

    return (
            <XYPlot
            	xType="time"
                width={1200}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={this.state.data} style={{stroke: 'violet', strokeWidth: 3}}/>
            </XYPlot>
        );

        }
}

Chart.defaultProps = { data: [
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:10},
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:15},
                        {Date_time: new Date("2018","07","02","00","00","00"), parkings_booked: 20}
                    ]}

