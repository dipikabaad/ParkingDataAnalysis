import React from 'react';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';
import {scaleLinear} from 'd3-scale';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const data = alphabet.reduce((acc, letter1, idx) => {
  return acc.concat(alphabet.map((letter2, jdx) => ({
    x: `${letter1}1`,
    y: `${letter2}2`,
    color: (idx + jdx) % Math.floor(jdx / idx) || idx
  })));
}, []);
/*const {min, max} = data.reduce((acc, row) => ({
  min: Math.min(acc.min, row.color),
  max: Math.max(acc.max, row.color)
}), {min: Infinity, max: -Infinity});*/

export class HeatMap extends React.Component{
	constructor(props){

		super(props);
		this.state = {
			data1: this.props.data,
      xunique: [],
      yunique: []
		};
		this.updateData = this.updateData.bind(this);
	}

 componentWillMount(){
 	//console.log("before chart mounting",this.props.data);
    //this.updateData();
   }
   componentDidMount(){
 	//console.log("after updating ",this.props.data);

   	this.updateData();
   }
   componentWillReceiveProps(nextProps) {
   	//this.updateData(nextProps.data)
   	this.props = nextProps;
   	this.updateData();
    //this.setState({data: nextProps.data});
}
  

  
   updateData(){
   	//console.log(this.props.data);
    const temp_arr = this.props.data.map((d)=>{
      return d.zone_name
    });
    const xAxisArr = temp_arr.filter(function(item, pos){
      return temp_arr.indexOf(item)== pos; 
    });
    const temp_arr1 = this.props.data.map((d)=> {
      return (d.hour)
    });
    const yAxisArr = temp_arr1.filter(function(item, pos){
          return temp_arr1.indexOf(item)== pos; 
    });
    var min1=10000;
    var max1=0;
    this.props.data.forEach((d)=>{
        if (d.mean_parkings_booked > max1){
          max1 = d.mean_parkings_booked;
        }else{

        }
        if(d.mean_parkings_booked < min1){
          min1 = d.mean_parkings_booked;
        }else{

        }
    });
    this.setState({min1: min1, max1: max1 }); 
    console.log("min1 and max1");
    console.log(min1);
    console.log(max1);
   	const dataArr1 = this.props.data.map((d)=> {
    return {x: d.zone_name, 
      y: d.hour,
    color: parseFloat(d.mean_parkings_booked)}
	   });
    console.log(dataArr1);
	this.setState({data1: dataArr1, xunique: xAxisArr, yunique: yAxisArr});
  console.log("update state in heatmap");
	console.log(this.state.data1);
	//console.log(this.props.data);
   }
	 render(){ 	
      //const exampleColorScale = scaleLinear().domain([min, (min + max) / 2, max]).range(['orange', 'white', 'cyan'])
      const exampleColorScale = scaleLinear().domain([this.state.min1, (this.state.min1+this.state.max1) / 2, this.state.max1]).range(['cyan','white','orange'])
    return (
                <XYPlot
      xType="ordinal"
      xDomain={this.state.xunique}
      yType="ordinal"
      yDomain={this.state.yunique}
      margin={50}
      width={1200}
      height={1000}>
      <XAxis orientation="top" />
      <YAxis />
      <HeatmapSeries
        colorType="literal"
        getColor={d => exampleColorScale(d.color)}
        style={{
          stroke: 'white',
          strokeWidth: '2px',
          rectStyle: {
            rx: 10,
            ry: 10
          }
        }}
        className="heatmap-series-example"
        data={this.state.data1}/>
        <LabelSeries
        data={this.state.data1}
        labelAnchorX="middle"
        labelAnchorY="baseline"
        getLabel={d => `${d.color}`}/>

    </XYPlot>
        );

        }
}

HeatMap.defaultProps = { data: [
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:10},
                        {Date_time: new Date("2018","07","02","00","00","00"),parkings_booked:15},
                        {Date_time: new Date("2018","07","02","00","00","00"), parkings_booked: 20}
                    ]}

/*<LabelSeries
        data={this.state.data1}
        labelAnchorX="middle"
        labelAnchorY="baseline"
        getLabel={d => `${d.color}`}/>*/

