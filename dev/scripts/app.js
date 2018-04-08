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

    componentDidMount(){
      let dbrefb = firebase.database().ref('views');

      dbrefb.once('value').then((res)=>{
          console.log(res.val());
          res.val() === null ? dbrefb.set(1) : dbrefb.set(res.val()+1);
      })
    }

    render() {
      return (
        <div>

          <header className = "page-header">
            <div className="wrapper">
             <nav>
               <ul>
                 <li>
                   <a target="_blank" href="http://www.casi.ca/about-us/vision-and-mission/">CASI Mission</a>
                 </li>
               </ul>
               <ul>
                 <li>
                   <a target="_blank" href = "http://www.casi.ca">CASI Home</a>
                 </li>
               </ul>
               <ul>
                 <li>
                   <a target="_blank" href="http://www.casi.ca/membership/apply-to-become-a-member/">Become A Member</a>
                 </li>
               </ul>
             </nav>
            </div>
          </header>

          <div className="wrapper">
            <a target="_blank" href="http://www.casi.ca/conferences-events/astro-2018/">
              <img className = "featured-conference-img" src="assets/featured-conference.png" alt=""/>
            </a>
            
             <SubscribeForm />  
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
