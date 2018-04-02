import React from 'react';
import ReactDOM from 'react-dom';
import {SubscribeForm} from './subscribe-form';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDto8i_4q3Si2-t9D0MOpYTcqEa5gwfeRY",
    authDomain: "casi-landing-page.firebaseapp.com",
    databaseURL: "https://casi-landing-page.firebaseio.com",
    projectId: "casi-landing-page",
    storageBucket: "",
    messagingSenderId: "1062341266863"
  };
  firebase.initializeApp(config);

class App extends React.Component {

    constructor(props){
      super(props);

      this.buttonMouseOver = this.buttonMouseOver.bind(this);
      this.resetButtonMouseOver = this.resetButtonMouseOver.bind(this);
      this.displayOptionInfo = this.displayOptionInfo.bind(this);
      this.handleOptionClick = this.handleOptionClick.bind(this);
      this.state = {
        showOptionInfo : false,
        pageView : null
      }
    }

    render() {
      return (
        <div>
          <div className="wrapper">
            <img className = "featured-conference-img" src="assets/featured-conference.png" alt=""/>
            <div className="landing-page-option-buttons">
              <button className = {this.state.pageView === 'subscribe' ? 'option-toggled': null}
                onMouseEnter = {() => this.buttonMouseOver('subscribe')}
                onMouseLeave = {this.resetButtonMouseOver}
                onClick = {()=> this.handleOptionClick('subscribe')}
              >
                Subscribe
              </button>
              <button 
                className = {this.state.pageView === 'conferences' ? 'option-toggled': null}
                onMouseLeave = {this.resetButtonMouseOver} 
                onMouseEnter = {() => this.buttonMouseOver('conferences')}
                onClick = {()=> this.handleOptionClick('conferences')}
              >
                Upcoming Conferences
              </button>
              <button 
                className = {this.state.pageView === 'join' ? 'option-toggled': null}
                onMouseLeave = {this.resetButtonMouseOver} 
                onMouseEnter = {() => this.buttonMouseOver('join')}
                onClick = {()=> this.handleOptionClick('join')}
              >
                Become a member
              </button>    
            </div> 
            <div className={`option-info-text-area ${this.state.showOptionInfo !== false ? 'option-info-show' : 'option-info-hide'}`}>
              {this.displayOptionInfo()}    
            </div>
             {this.state.pageView === 'subscribe' ? <SubscribeForm /> : null }  
          </div>
        </div>
      )
    }

    handleOptionClick(type){
      this.setState({pageView : type});
    }

    buttonMouseOver(type){
      this.setState({showOptionInfo : type});
    }

    resetButtonMouseOver(){
      this.setState({showOptionInfo : false});
    }

    displayOptionInfo(){
      switch(this.state.showOptionInfo){
        case 'subscribe' : 
          return (
            <p className = "option-info-text">Subscribe to CASI to receive updates on local and national events and activities.</p>
          )
        break;

        case 'conferences' : 
          return (
            <p className = "option-info-text">Check out upcoming CASI conferences.</p>
          )
        break;

        case 'join' : 
          return (
            <p className = "option-info-text">Become a member of CASI.</p>
          )
        break;
      }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
