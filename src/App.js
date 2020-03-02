import React, { Component } from "react";
import axios from "axios";
//import Favelement from './component/favelement'

import { search } from "./utils";
import Movies from "./Movies";

import classes from './App.module.css';

class App extends Component {
  state = {
    movies: null,
    loading: false,
    value: "Search location, zip...",
    favdata:[],
    favorlat:null,
    favorlng:null,
    temp:null

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

  
  testfav(lat, lng){
    console.log(lat);
    console.log(lng);


    this.setState({favorlat: lat})
    this.setState({favorlng: lng})


    /* let testlat=val.lat
    let testlng=val.lng
    this.setState({lat: testlat})
    this.setState({lng: testlng})
    //this.setState({lng: val.lng});
    console.log(this.state.lat);
 */

   
  }

  tempdisplay(temp){
    this.setState({temp: temp})
  }

  get renderMovies() {
    let movies = <h1>There's no test!</h1>;
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} /* testapp={this.testapp} */
      //favback={this.addfav}
      favdataback={this.testfav.bind(this)}
      flat={this.state.favorlat}
      flng={this.state.favorlng}
      tempera={this.tempdisplay.bind(this)}
      />;
    }

    return movies;
  }

  render() {
    let temperature=<h3>there's no temperature now.</h3>
    if(this.state.temp){
      temperature=this.state.temp
    }
    else{
      temperature=<h3>temperature loading</h3>
    }
   
   
    return (
      <div>
        <input
          
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
        {this.renderMovies}

        
      
        <div>
          {temperature}
        </div>
      </div>
    );
  }
}

export default App;
