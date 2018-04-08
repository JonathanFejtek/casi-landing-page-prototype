import React from 'react';
import ReactDOM from 'react-dom';

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
        this.state = {
            savedUsers : [],
            pageViews : null,
            pageSubmits: null,
            userCategories : [
                {keyName : 'firstname', label : "First Name"},
                {keyName : 'lastname', label : "Last Name"},
                {keyName : 'email', label : "E-mail"},
                {keyName : 'affiliation', label : "Affiliation"}
            ]
        }
    }

    componentDidMount(){
        let dbref = firebase.database().ref('emails');

        let dbrefb = firebase.database().ref('views');
        let dbrefc = firebase.database().ref('form-submits');

        dbrefb.once('value').then((res)=>{
            console.log(res.val());
            this.setState({
                pageViews : res.val()
            })
           // res.val() === null ? dbrefb.set(1) : dbrefb.set(res.val()+1);
        })

        dbrefc.once('value').then((res)=>{
            console.log(res.val());
            this.setState({
                pageSubmits : res.val()
            })
           // res.val() === null ? dbrefb.set(1) : dbrefb.set(res.val()+1);
        })

        dbref.once("value").then((res)=>{
            let users = Object.values(res.val());

            this.setState({
                savedUsers : users
            },()=>{
                console.log(this.state.savedUsers[0]);
            })
        });
    }

    render(){
        return (
            <div>
                <h3 className = "landing-page-header">CASI Landing Page Email Database</h3>
                <table>
                <tbody>
                    <tr>
                        {this.state.userCategories.map((userCategory)=>{
                            return <th>{userCategory.label}</th>
                        })}
                    </tr>
                    {
                        this.state.savedUsers.map((user)=>{
                            return (
                                <tr>
                                    {this.state.userCategories.map((category)=>{
                                        if(user[category.keyName].length === 0){
                                            return <td> --- </td>
                                        }
                                        return <td>{user[category.keyName]}</td>
                                    })}
                                </tr>
                            );
                        })
                    }
                </tbody>
                </table>
                <h3>{`${this.state.pageSubmits}/${this.state.pageViews}`}</h3>
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));