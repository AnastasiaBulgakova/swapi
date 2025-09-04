import React from "react";
import './planetPage.css';
import SwapiService from "../../services/SwapiServise";
import Spinner from "../spinner/Spinner";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";

export default class PlanetPage extends React.Component {

  swapiService = new SwapiService();

  state = {
    planets: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    this.loadAllPlanets();
  }

  async loadAllPlanets() {
    const maxId = 60; 
    const requests = Array.from({ length: maxId }, (_, i) =>
      this.swapiService.getPlanet(i + 1).catch(() => null)
    );

    try {
      const results = await Promise.all(requests);
      const filteredPlanets = results.filter(Boolean); 
      this.setState({
        planets: filteredPlanets,
        loading: false
      });
    } catch (err) {
      this.setState({
        error: true,
        loading: false
      });
    }
  }

  render() {
    const { planets, loading, error } = this.state;

    if (loading) {
      return (
        <div className="planet-page">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="planet-page">
          <ErrorIndicator />
        </div>
      );
    }

    return (
      <div className="planet-page">
        <div className="container">
          <h1 className="page-title">Планеты Star Wars</h1>
          <p className="planets-count">Всего планет: {planets.length}</p>

          <div className="planets-grid">
            {planets.map((planet) => (
              <PlanetCard key={planet.id} planet={planet} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const PlanetCard = ({ planet }) => {
  const {
    name,
    population,
    rotationPeriod,
    diameter,
    climate,
    terrain,
    gravity,
    orbitalPeriod
  } = planet;

  return (
    <div className="planet-card">
      <div className="card">
        <div className="card-header">
          <h3 className="planet-name">{name}</h3>
        </div>

        <div className="card-body">
          <div className="planet-info">
            <div className="info-item">
              <span className="label">Население:</span>
              <span className="value">{population}</span>
            </div>

            <div className="info-item">
              <span className="label">Диаметр:</span>
              <span className="value">{diameter}</span>
            </div>

            <div className="info-item">
              <span className="label">Период вращения:</span>
              <span className="value">{rotationPeriod} часов</span>
            </div>

            <div className="info-item">
              <span className="label">Орбитальный период:</span>
              <span className="value">{orbitalPeriod} дней</span>
            </div>

            <div className="info-item">
              <span className="label">Климат:</span>
              <span className="value">{climate}</span>
            </div>

            <div className="info-item">
              <span className="label">Рельеф:</span>
              <span className="value">{terrain}</span>
            </div>

            <div className="info-item">
              <span className="label">Гравитация:</span>
              <span className="value">{gravity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
