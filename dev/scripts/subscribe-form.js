import React from 'react';
import ReactDOM from 'react-dom';

export class SubscribeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            affiliation : '',
            email : ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }

    render(){
        return (
            <div className = 'subscribe-form-container'>
                <img className = 'casi-logo' src="assets/casi-logo.png" alt=""/>
                <form className = "subscribe-form" onSubmit = {this.submit}>
                    <input 
                        value = {this.state.firstname} 
                        onInput = {this.handleInput} 
                        id = "firstname" 
                        placeholder = "First Name" 
                        type="text"
                    />
                    <input 
                        value = {this.state.lastname} 
                        onInput = {this.handleInput} 
                        id = "lastname" 
                        placeholder = "Last Name" 
                        type="text"
                    />
                    <input 
                        value = {this.state.affiliation} 
                        onInput = {this.handleInput} 
                        id = "affiliation" 
                        placeholder = "Affiliation (optional)" 
                        type="text"
                    />
                    <input 
                        value = {this.state.email} 
                        onInput = {this.handleInput} 
                        id = "email" 
                        placeholder = "E-mail" 
                        type="text"
                    />
                    <input  type="submit"/>
                </form>
            </div>
        )
    }

    submit(e){
        e.preventDefault();
        firebase.database().ref('emails').push(
            {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                affiliation : this.state.affiliation,
                email : this.state.email
            }
        )
        this.setState({firstname : '', lastname : '', affiliation : '', email : ''});

    }

    handleInput(e){
        this.setState({[e.target.id] : e.target.value});
    }
}