import React, { Component } from 'react';
import './css/bootstrap.css'
import './App.css';
import List from './List';

//<script src="jquery-3.3.1.min.js"></script>
var url;
var datatest;

class App extends Component {

  constructor(props) {
    super(props);
    url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Spider-Man&orderBy=name&limit=20&ts=789456123654654&apikey=2fbf0f4b9db3718a19fab988d6edca41&hash=396e054d3c2738363795376af50ad1f0";
    datatest = getJSON(url);
    this.randomize = this.randomize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  randomize(){
    datatest = randomURL();
    this.forceUpdate();
  }

  handleSubmit(e) {
    //alert('The value is: ' + this.input.value);
    datatest = getJSON("https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+(this.input.value)+"&orderBy=name&limit=20&ts=789456123654654&apikey=2fbf0f4b9db3718a19fab988d6edca41&hash=396e054d3c2738363795376af50ad1f0");
    this.forceUpdate();
    if(datatest.data.total === 0){
      alert("There is no character with that name");
    }
    e.preventDefault();
  }

  render() {


    return (
      <div className="App">
        <img src={require('./title.jpg')} className="rounded mx-auto d-block" height="120px" alt="Marvel characters"/>

        <button type="button" className="btn btn-warning" value="Bouton" onClick={this.randomize}>Random</button>
        <form onSubmit={this.handleSubmit}>
          <label>
          Search :
          <input type="text" ref={(input) => this.input = input} />
          </label>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
        <List result={datatest.data.results}/>
      </div>
    );
  }
}


//1er personnage : ID 1010801
//Dernier personnage : ID 1011428
function randomURL() {
  var resp;
  var resp2;
  var xmlHttp;
  var i;

      xmlHttp = new XMLHttpRequest();
      if(xmlHttp !== null)
       {
        xmlHttp.open( "GET", "https://gateway.marvel.com:443/v1/public/characters/" + (Math.floor(Math.random() * 627) + 1010801).toString() + "?ts=789456123654654&apikey=2fbf0f4b9db3718a19fab988d6edca41&hash=396e054d3c2738363795376af50ad1f0", false );
        xmlHttp.send( null );
        resp = JSON.parse(xmlHttp.responseText);
        console.log(resp);  
        for(i = 0; i<5; i++){
          xmlHttp.open( "GET", "https://gateway.marvel.com:443/v1/public/characters/"+ (Math.floor(Math.random() * 627) + 1010801).toString() +"?ts=789456123654654&apikey=2fbf0f4b9db3718a19fab988d6edca41&hash=396e054d3c2738363795376af50ad1f0", false );
          xmlHttp.send( null );
          resp2 = JSON.parse(xmlHttp.responseText);
          console.log(resp2.data.total);
          if(resp2.data.total !==1){
            xmlHttp.open( "GET", "https://gateway.marvel.com:443/v1/public/characters/"+ (Math.floor(Math.random() * 627) + 1010801).toString() +"?ts=789456123654654&apikey=2fbf0f4b9db3718a19fab988d6edca41&hash=396e054d3c2738363795376af50ad1f0", false );
            xmlHttp.send( null );
            resp2 = JSON.parse(xmlHttp.responseText);
            console.log("error");
          }
          resp.data.results = resp.data.results.concat(resp2.data.results);
          resp.data.total += resp2.data.total;
        }
        console.log(resp); 
       }
       return resp;
}


//1011335
function getJSON(url){
  var resp;
  var xmlHttp;

      resp  = '' ;
      xmlHttp = new XMLHttpRequest();
      if(xmlHttp !== null)
       {
          xmlHttp.open( "GET", url, false );
           xmlHttp.send( null );
          resp = JSON.parse(xmlHttp.responseText);
       }
       return resp;
}

export default App;
