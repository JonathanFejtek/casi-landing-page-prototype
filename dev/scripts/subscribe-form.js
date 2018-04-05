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
            <h3>Join Our Mailing List</h3>
                <div className="form-header">
                    
                    <div className="form-header-section">
                        <img className = 'casi-logo' src="assets/casi-logo.png" alt=""/>                
                    </div>

                    <div className="form-header-section">                    
                        <ul>
                            <li>Networking</li>
                            <li>Monthly Presentations</li>
                            <li>E-Newsletter</li>
                            <li>Annual Conferences</li>
                            <li>Webinars</li>
                            <li>Tours</li>
                            <li>CASI Connect Mentoring</li>
                            <li>Student Awards</li>
                            <li>National Senior Awards</li>
                            <li>Technical Workshops</li>   
                        </ul>
                    </div>
                </div>

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
                        placeholder = "Affiliation" 
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
                <p>
                    You can unsubscribe from our regular emails at any time. You can do this by clicking on the Unsubscribe link at the bottom of the email you’ve received. However, should you experience any problems, please email us at <a href="mailto:casi@casi.ca">casi@casi.ca</a> to remove your details or call us at 613-591-8787 and we will assist you.
                </p>
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