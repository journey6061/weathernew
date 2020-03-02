import React, { Component } from "react";
import axios from "axios";

import classes from "./Movie.module.css";
import { truncStr } from "./utils";
import { search } from "./utils";
import Post from './Post'


class MovieCard extends Component{
  state={
    geo: null,
    geoloading: false,
    geovalue: null,
    coordinate:null,
    location:null,
    weatherinfo:null,
    testopen:null,
    
  }



  sendWeatherDate = (tt) => {
   
   this.props.databack(tt);
 
   
  };

  handelChange(){
    //{name:'我是子组件传过来的',age:'40'}就是传递给父组件的值
   // this.props.onassFather({testdata:this.state.testopen});
};


  render() {
    const { accuracy_type, location, formatted_address } = this.props.item;


  return (
    <>
    <div
      className={classes.Container}
      
      onClick={()=>this.sendWeatherDate(location)}
    >
      <div className={classes.VoteContainer}>
        <span className={classes.Vote}>{formatted_address}</span>
      </div>
      <p>{location.lat}</p>

      <div className={classes.Bottom}>
{/*         <h3 className={classes.Title}>{truncStr(accuracy_type, 19)}</h3>
 */}        <h3 className={classes.Title}>{accuracy_type}</h3>

      </div>
    </div>
    <div>
    {/*  {posts} */}
     </div>


    </>
  );
}
} 


export default MovieCard;
