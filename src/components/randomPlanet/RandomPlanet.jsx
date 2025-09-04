import React from "react";
import './randomPlanet.css';
import SwapiService from "../../services/SwapiServise";
import Spinner from "../spinner/Spinner";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";


export default class RandomPlanet extends React.Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };
componentDidCatch(){
    return <ErrorIndicator/>
}

  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 2500)
  }
componentWillUnmount(){
    clearInterval(this.interval)
}
  onPlanetLoaded = (planet) => {
    this.setState({ planet,
        loading: false
     });
  };
onError = (err) => {
    this.setState({
        error: true,
         loading: false
    })
}
  updatePlanet = () => {
    const id = Math.floor(Math.random()*25) + 3; 
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {

    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner/> : null;
  const content = hasData ? <PlanetView planet={planet} /> : null;
  const errorMessage = error ? <ErrorIndicator/> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
       {content}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {
    const {  name, population,
        rotationPeriod, diameter, image }  = planet;
    return (
        <React.Fragment>
             
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {image}
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
        </React.Fragment>
    )
}