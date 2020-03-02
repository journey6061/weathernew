import React, {Component} from "react";
import axios from "axios";

import Favelement from './component/favelement'

import Movie from "./Movie";
import classes from "./Movies.module.css";

class Movies extends Component {
  state={
    testdata:null,
    temp:null,
    blockdis:true,
    lat:null,
    lng:null,
    lastlat:null,
    test:'test',
    favarr:null,
    favlng:null

  }

  componentDidUpdate(){
    console.log(this.props.list)

    //if (this.state.lat !== this.prevState.lat) {
    if(this.state.lat===null||(this.state.lat && (this.state.lat!==this.state.lastlat))){

    axios.get( 'https://api.weather.gov/points/' + this.state.lat+','+this.state.lng)
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)   
                     this.setState({lastlat: this.state.lat})

                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log('win')
                        this.setState({temp: res.data.properties.periods[0].temperature})
                        //this.setState({lastlat: this.state.lat})

                        this.props.tempera(this.state.temp)

                        localStorage.pagecount=Number(localStorage.pagecount) +1;
                        console.log(localStorage.pagecount)


                       }
                     )
                      
                    //this.setState( { loadedPost: response.data } );
                } );

             }
  //}
  }

  displayweather(){

    console.log(this.state.lat);


    //this.setState({lat:this.state.favarr, lng:this.state.favlng});


    /* axios.get( 'https://api.weather.gov/points/' + this.state.favarr+','+this.state.favlng)
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)   
                    // this.setState({lastlat: this.state.lat})

                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log('fav')
                        this.setState({temp: res.data.properties.periods[0].temperature})
                        //this.setState({lastlat: this.state.lat})

                        //localStorage.pagecount=Number(localStorage.pagecount) +1;
                        //console.log(localStorage.pagecount)


                       }
                     )
                      
                    //this.setState( { loadedPost: response.data } );
                } ); */

    /* this.setState((prevState, props) => ({
      //do something here
      if(this.state.favarr !== prevState.xxx)
  })) */

  if(this.props.flat){
    this.setState({lat:this.props.flat, lng:this.props.flng});
  }
  }

  removesingle(){
    this.setState({favarr:null});
    localStorage.removeItem('favo')
  }

  removeele(index){
    let arr=JSON.parse(localStorage.getItem('favo'));
    arr.splice(index, 1);
    this.setState({favarr:arr});

    localStorage.setItem('favo',JSON.stringify(arr));
  }

  clickFav(flat, flng){
    
    this.props.favdataback(flat, flng);


    console.log(this.state.lat);

      var favo=JSON.parse(localStorage.getItem("favo"));
        if(favo==""||favo==null){
          console.log(123);
          localStorage.favo=this.state.lat;
          console.log(localStorage.favo);
          this.setState({favarr:this.state.lat, favlng:this.state.lng})

        }
        else{
          console.log(222);
          //localStorage.favo=val;
          //console.log(localStorage.favo);
          let arrprev=JSON.parse(localStorage.getItem('favo'));
                    //console.log(arrprev);
          let arrafter=null;
            if((typeof arrprev)==='number'){
              arrafter=[arrprev]
            }else{
              arrafter=arrprev
            }

            if(arrafter.indexOf(this.state.lat)=== -1){
              console.log(JSON.parse(localStorage.getItem('favo')))
              //let textdata=JSON.parse(localStorage.getItem('favo'))
              //console.log(textdata)
              //let testarr=[textdata]
              arrafter.push(this.state.lat)
              //console.log(typeof testarr);
              console.log(arrafter);
              this.setState({favarr:this.state.lat, favlng:this.state.lng})
      
              localStorage.setItem('favo',JSON.stringify(arrafter));
              console.log(localStorage.favo);
            }
        }

    
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

    
    let favele=null
    let favo=JSON.parse(localStorage.getItem("favo"));
        if(favo==""||favo==null){
          favele=<h3>there's no fav!</h3>
        }
        else{
          //let favcount=JSON.parse(localStorage.getItem('favo'));
          if(typeof favo!=='object'){
            //favele=<h3>{favo}</h3>
            favele=<Favelement key={favo} 
          ele={favo} 
          delelement={()=>this.removesingle()}
          displaywea={()=>this.displayweather()}
          />
          }
          else{
          favele=JSON.parse(localStorage.getItem('favo')).map((xx, index)=>{
          //return(<div>{xx}</div>)
          return <Favelement key={xx+index} 
          ele={xx} 
          delelement={()=>this.removeele(index)}
          displaywea={()=>this.displayweather()}
          />;
            })
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

    <div onClick={()=>this.clickFav(this.state.lat, this.state.lng)}>
      click to collect 
    </div>

    <div>
      {favele}
    </div> 
    <div>
      {localStorage.favo}
    </div>
    
    
    </>
    )
  }
}

export default Movies;
