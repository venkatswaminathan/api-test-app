import React, { Component } from 'react';
import Layout from './components/layout.js';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';

class App extends Component { 

  constructor(props){
    super(props); //Mandatory
    this.state={
      date: new Date()
    };
  }
  render() {
    setTimeout(()=>{
      this.setState({date:new Date()});
    },1000);
    return (
      <div>
        <Header/> 
        <div className="App">                   
            <Layout/>
        </div>
        <Footer date={this.state.date}/>
      </div>
    );
  }  
}

export default App;