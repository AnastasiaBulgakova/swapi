import React, { Component } from "react";

import './personDetails.css';
import SwapiService from "../../services/SwapiServise";
import Spinner from "../spinner/Spinner";

export default class PersonDetails extends Component {
    swapiservice = new SwapiService();
    state= {
        peson: null,
        loading: false
    }
    componentDidMount(){
        this.updatePerson();
    }
    updatePerson(){
const { personId, loading } = this.props;
this.setState({
    loading: true
})
if(!personId){
    return;
}
this.swapiservice
.getPerson(personId)
.then((person) => {
    this.setState({ person, 
        loading: false
     })
})
    }
    componentDidUpdate(prevProps){
if(this.props.personId !== prevProps.personId){
   
    this.updatePerson()
}
    }
    render() {
        if(!this.state.person){
            return (
                <span>Select a person from a list</span>
            )
        }
        const { person: { name, gender, birthYear, eyeColor, image }, loading} = this.state;
        if(loading){
            return <Spinner/>
        }
      
      return (
        <div className="person-details card">
          <img className="person-image"
            src={image} alt=""/>
  
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Gender</span>
                <span>{gender}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Birth Year</span>
                <span>{birthYear}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Eye Color</span>
                <span>{eyeColor}</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }