import React from "react";
import ItemList from "../itemList/ItemList";
import PersonDetails from "../personDetails/PersonDetails";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";

export default class PeoplePage extends React.Component{
    state={
        selectedPerson: 3
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
    <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected}/>
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
        )
    }
}