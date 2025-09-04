import React, { Component } from "react";
import SwapiService from "../../services/SwapiServise.jsx";
import Spinner from "../spinner/Spinner.jsx";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import "./starshipPage.css";

export default class StarshipPage extends Component {
  swapiService = new SwapiService();

  state = {
    starships: [],
    loading: true,
    hasError: false
  };

  componentDidMount() {
    this.loadAllStarships();
  }

  loadAllStarships = async () => {
    const maxId = 100;
    const requests = Array.from({ length: maxId }, (_, i) =>
      this.swapiService.getStarship(i + 1).catch(() => null)
    );

    try {
      const results = await Promise.all(requests);
      const filtered = results.filter(Boolean);
      this.setState({
        starships: filtered,
        loading: false
      });
    } catch {
      this.setState({
        hasError: true,
        loading: false
      });
    }
  };

  render() {
    const { starships, loading, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="starship-page">
        <div className="container">
          <h1 className="page-title">Звёздные корабли Star Wars</h1>
          <p className="starship-count">Всего: {starships.length}</p>

          <div className="starship-grid">
            {starships.map((starship) => (
              <StarshipCard key={starship.id} starship={starship} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// ----- карточка корабля -----
const StarshipCard = ({ starship }) => {
  const {
    name,
    model,
    manufacturer,
    costInCredits,
    length,
    maxAtmospheringSpeed,
    crew,
    passengers,
    cargoCapacity,
    consumables
  } = starship;

  return (
    <div className="starship-card">
      <div className="card">
        <div className="card-header">
          <h3 className="starship-name">{name}</h3>
        </div>

        <div className="card-body">
          <div className="starship-info">
            <div className="info-item"><span className="label">Модель:</span> <span>{model}</span></div>
            <div className="info-item"><span className="label">Производитель:</span> <span>{manufacturer}</span></div>
            <div className="info-item"><span className="label">Стоимость:</span> <span>{costInCredits}</span></div>
            <div className="info-item"><span className="label">Длина:</span> <span>{length}</span></div>
            <div className="info-item"><span className="label">Скорость:</span> <span>{maxAtmospheringSpeed}</span></div>
            <div className="info-item"><span className="label">Экипаж:</span> <span>{crew}</span></div>
            <div className="info-item"><span className="label">Пассажиры:</span> <span>{passengers}</span></div>
            <div className="info-item"><span className="label">Груз:</span> <span>{cargoCapacity}</span></div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
