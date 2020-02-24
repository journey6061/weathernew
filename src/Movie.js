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


 /* 分部axios
 
 getUserAccount() {
    return axios.get('https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1]);
  }
  
  getUserPermissions() {
    return axios.get('/user/12345/permissions');
  } */
  
  

  componentDidUpdate () {


    if ( this.state.geovalue ) {
        //if(!this.state.weatherinfo||(this.state.weatherinfo && this.state.weatherinfo[1]!==this.props.item.location.lat)){
          
          

          
          if(this.state.testopen===null||(this.state.testopen && (this.state.testopen!==this.props.item.location.lat))){
          //if(this.state.testopen===null||(this.state.testopen && (this.state.geovalue[0]!==this.state.testopen))){
            //this.setState({testopen:this.state.geovalue[0]})
      /* if  
        (this.state.weatherinfo && 
          this.state.weatherinfo.lat !== this.props.item.location.lat && 
          this.state.weatherinfo.lng !== this.props.item.location.lng){ */


      //console.log(this.state.geovalue[0]);
        //if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
            //axios.get( 'https://api.weather.gov/points/39.7456,-97.0892' )
            axios.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)

                     //response.data.geometry.coordinates[1].toFixed(3);
                     //num.toFixed(3);
                     console.log(this.props.item.location.lat.toFixed(3));
                     console.log(this.state.geovalue[0]);
                     console.log(this.state.testopen);

                     this.props.onassFather(secondlink);
                     this.setState({testopen:this.props.item.location.lat})
                     /* if(this.state.testopen===null||(this.state.testopen && (this.state.testopen!==response.data.properties.forecast))){

                     this.setState({testopen:secondlink})
                      
                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log(res)
                        this.setState({weatherinfo: res.data.properties.periods[0]})
                        //console.log(this.state.weatherinfo)

                        //this.setState({testopen:this.props.item.location.lat})

                        //传给父

                        this.props.onassFather(this.state.weatherinfo.detailedForecast)


                        //set state here 

                       }
                     )
                      } */
                    //this.setState( { loadedPost: response.data } );
                } );
        //}

        /* axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
      // Both requests are now complete
    })); */
    //this.setState({testopen:this.state.geovalue[0]})

    

    
    
    }
   
    
}

//this.setState({testopen:this.props.item.location.lat})

  }

  


  /* sendWeatherDate = async e => {
    this.search(e);
   // this.setState({ value: e.target.value });
  }; */

  sendWeatherDate = (tt) => {
    //this.search(e);
   // this.setState({ value: e.target.value });


   //this.setState({ geoloading: true });
   //this.setState({ geovalue: [test1, test2]});
   this.props.databack(tt);
 
   
  };

  handelChange(){
    //{name:'我是子组件传过来的',age:'40'}就是传递给父组件的值
   // this.props.onassFather({testdata:this.state.testopen});
};


  render() {
    const { accuracy_type, location, formatted_address } = this.props.item;


   /*  let posts = <p style={{textAlign: 'center'}}>loading!</p>;
        if (this.state.weatherinfo) {
            
            posts = <Post 
                  key={this.state.weatherinfo.number} 
                  title={this.state.weatherinfo.temperature} 
                  author={this.state.weatherinfo.name}
                   
                  />;
        } */
    
    /* let posts = location.map(loc => {
      return (
        <>
        <h1>{loc.lat}</h1>
        <div className="">
            <div className="">{loc.lng}</div>
        </div>
        </>
      )
  }); */
  return (
    <>
    <div
      className={classes.Container}
      /* style={{
        backgroundImage:
          poster_path && `url(http://image.tmdb.org/t/p/w185${poster_path})`
      }} */
      //onClick={e => this.sendWeatherDate(e)}
      //onClick={this.sendWeatherDate(this.props.item.location)}
      //onClick={()=>this.sendWeatherDate(this.props.item.location.lat, this.props.item.location.lng)}
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
