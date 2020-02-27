import React, {Component} from "react";
import axios from "axios";

import Movie from "./Movie";
import classes from "./Movies.module.css";


/* const Movies = ({ list }) => {
  let cards = <h3>Loading...</h3>;


  if (list) {
    cards = list.map((m, i) => <Movie key={i} item={m} 
    onassFather={this.testapp}
    />);
  }

  return (
    <>
    <div className={classes.Container}>
      <div className={classes.ContainerInner}>{cards}</div>
    </div>
    <div>

 
  </div>
    
    </>
  );
}; */

class Movies extends Component {
  state={
    testdata:null,
    temp:null,
    blockdis:true,
    lat:null,
    lng:null,
    lastlat:null,
    test:'test'
  }

  componentDidUpdate(){
    console.log(this.props.list)
    

    if(this.state.lat===null||(this.state.lat && (this.state.lat!==this.state.lastlat))){

    axios.get( 'https://api.weather.gov/points/' + this.state.lat+','+this.state.lng)
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)       
                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log('win')
                        this.setState({temp: res.data.properties.periods[0].temperature})
                        this.setState({lastlat: this.state.lat})

                        localStorage.pagecount=Number(localStorage.pagecount) +1;
                        console.log(localStorage.pagecount)


                       }
                     )
                      
                    //this.setState( { loadedPost: response.data } );
                } );

             }
  }

  clickFav(){
    //console.log(this.state.test);
    /* localStorage.favLat=this.state.lat;
    localStorage.favLng=this.state.lng; */
    //localStorage.favLat=this.state.lat;
    //console.log(this.state.lat);
    this.props.favdataback(this.state.lat);
    
    //this.props.favback(this.state.lat);

  }

  testapp(ee){
    
    this.setState({testdata:ee});
    console.log(this.state.testdata);
  }

  backdatadis(val){
    console.log(val.lat);
    console.log(val.lng);


    let testlat=val.lat
    let testlng=val.lng
    this.setState({lat: testlat})
    this.setState({lng: testlng})
    //this.setState({lng: val.lng});
    console.log(this.state.lat);

    //localStorage.favLat=val.lat;

    //return val

    



   /*  axios.get( 'https://api.weather.gov/points/' + val.lat+','+val.lng)
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)       
                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log(res)
                        this.setState({temp: res.data.properties.periods[0].temperature})
                        

                       }
                     )
                      
                    //this.setState( { loadedPost: response.data } );
                } ); */


    //this.setState({blockdis: false})
  }

  render(){
    //localStorage.pagecount=1

   // let fav=null;

    
    
    let cards=<h3>Loading...</h3>;
    let tempra=null;
    if (this.props.list&&this.state.blockdis) {
      console.log(this.props.list)
      cards = this.props.list.map((m, i) => <Movie key={i} item={m} 
      //onassFather={this.testapp.bind(this)}
      databack={this.backdatadis.bind(this)}
      />);

      console.log(this.props.list)
      tempra = this.state.temp
    }
    if(this.state.blockdis===false){
      //cards=null;

      tempra=<h3>Temp Loading...</h3>;

    if (this.state.temp) {
      
    }
    }

    

    return(
      <>
    <div className={classes.Container}>
      <div className={classes.ContainerInner}>{cards}</div>
    </div>

    <div>
      {tempra}

    </div>

    <div onClick={()=>this.clickFav()}>
      click to collect 
    </div>
    
    
    </>
    )
  }
}

export default Movies;
