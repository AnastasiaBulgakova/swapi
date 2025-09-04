import React from "react";
import ItemList from "../itemList/ItemList";
import PersonDetails from "../personDetails/PersonDetails";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import { Link } from "react-router-dom";
import './peoplePage.css';
export default class PeoplePage extends React.Component{
    state={
        selectedPerson: 3,
        hasError: false
    }
    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id,
            hasError: false
        })
    }
    componentDidCatch(){
        this.setState({
            hasError: true
        })
    }
    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        return(
            <div className="people-page">
                <div className="people-container">
                <div className="list-wrapper">
                    <ItemList onItemSelected={this.onPersonSelected}/>
                </div>
                <div className="details-wrapper">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
                </div>
                <Link to='/persons' className="buttonMore">
                        i need MORE!
                </Link>
            </div>
        )
    }
}