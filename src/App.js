import React, { Component } from "react";
import axios from "axios";
import Favelement from './component/favelement'

import { search } from "./utils";
import Movies from "./Movies";

import classes from './App.module.css';

class App extends Component {
  state = {
    movies: null,
    loading: false,
    value: "Search location, zip...",
    favdata:[],
    favarr:null
  };

  componentDidUpdate(){
    console.log(this.state.favdata)
    //localStorage.setItem('favor',JSON.stringify(this.state.favdata));

    //localStorage.fav=this.state.favdata
  }

  search = async tt => {
    this.setState({ loading: true });
    const results = await search(
      `https://api.geocod.io/v1.4/geocode?q=${tt}&api_key=25de1572225915e7eee55d929d76e4e65e61e62`

      //`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
      //curl "https://api.geocod.io/v1.4/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=YOUR_API_KEY"

    );
    const testmovies = results;
      console.log(results)
    this.setState({ movies:testmovies, loading: false });
    //console.log(this.state.movies)
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  removeele(index){
    let arr=JSON.parse(localStorage.getItem('favo'));
    arr.splice(index, 1);
    this.setState({favarr:arr});

    localStorage.setItem('favo',JSON.stringify(arr));




  }

  testfav(val){
    console.log(val);
    //this.setState({favdata:val});
    //this.setState({favdata:this.state.favdata.concat(val)});


    /* if(localStorage.favo===null){
      localStorage.favo=val;
      this.setState({favdata:val});
    }
    else{ */

      //localStorage.favo=val;
      //console.log(localStorage.favo)


      if(localStorage.favo){

        let arrprev=JSON.parse(localStorage.getItem('favo'));
        if(arrprev.indexOf(val)=== -1){
          console.log(JSON.parse(localStorage.getItem('favo')))
          let textdata=JSON.parse(localStorage.getItem('favo'))
          //console.log(textdata)
          //let testarr=[textdata]
          textdata.push(val)
          //console.log(typeof testarr);
          console.log(textdata);
          this.setState({favarr:textdata})
  
          localStorage.setItem('favo',JSON.stringify(textdata));
          console.log(localStorage.favo);
        }
        
        //textdata.push(val)
        //console.log(textdata)
        /* let existfav=[];
        existfav.concat(JSON.parse(localStorage.getItem('favo')))
        console.log(existfav);

        existfav.push(val);
        console.log(existfav); */
       
       
       // localStorage.favo=val;
       //console.log(localStorage.favo) ;
       // console.log(JSON.parse(localStorage.getItem('favo'))) ;
       // let newfavarr=existfav.push(val);
       // console.log(newfavarr) ;


      }




      /* let favodata=JSON.parse(localStorage.getItem('favo'))
    //localStorage.setItem('favo',JSON.stringify(favodata));
    //favodata = JSON.parse(localStorage.getItem('favo'));
    //favodata.concat(val)

      let newfavor=favodata.map(num => {
          if(num&&num!==val){
            favodata.concat(val)
          }
      }
        );

      localStorage.setItem('favo',JSON.stringify(newfavor));

      this.setState({favdata:newfavor}); */
   // }
    


    

    //localStorage.fav=val;

  // console.log(this.state.favdata);
  
   
    

  }

  /* addfav(tt){
    console.log(tt);
    localStorage.fav=tt
  } */

  /* testapp = () => {
    
   console.log('it is')
  };
  

  handleSelect(){
    console.log('it is')
  } */

  get renderMovies() {
    let movies = <h1>There's no test!</h1>;
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} /* testapp={this.testapp} */
      //favback={this.addfav}
      favdataback={this.testfav.bind(this)}
      />;
    }

    return movies;
  }

  render() {
    //localStorage.favo=null;

    /* let fav = <h1>There's no fav!</h1>;
    if (this.state.favdata) {
      fav = JSON.parse(localStorage.getItem('favo'));
    } */

    let favele=JSON.parse(localStorage.getItem('favo')).map((xx, index)=>{
      //return(<div>{xx}</div>)
      return <Favelement key={xx+index} 
      ele={xx} 
      delelement={()=>this.removeele(index)}/>;
    }
      
    )
    return (
      <div>
        <input
          
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
        {this.renderMovies}

        <div>
          {favele}
        </div>
        <div>
          {localStorage.favo}
        </div>
        {/* <div>
          {JSON.parse(localStorage.getItem('favo'))}
        </div> */}
      </div>
    );
  }
}

export default App;
