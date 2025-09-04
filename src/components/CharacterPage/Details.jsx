import React from "react";
import SwapiService from "../../services/SwapiServise";
import Spinner from "../spinner/Spinner";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import "./details.css";
export default class CharacterList extends React.Component {
  swapiService = new SwapiService();

  state = {
    characters: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    this.loadCharacters();
  }

  async loadCharacters() {
    const maxId = 83; // максимум ID по данным SWAPI
    const requests = Array.from({ length: maxId }, (_, i) =>
      this.swapiService.getPerson(i + 1).catch(() => null)
    );

    try {
      const results = await Promise.all(requests);
      const filtered = results.filter(Boolean);
      this.setState({
        characters: filtered,
        loading: false
      });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { characters, loading, error } = this.state;
    const { onItemSelected } = this.props;

    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator />;

    return (
      <div className="character-list">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} onSelect={onItemSelected} />
        ))}
      </div>
    );
  }
}

const CharacterCard = ({ character, onSelect }) => {
  const { id, name, gender, birthYear, eyeColor, image } = character;

  return (
    <div className="details-details card">
    <img className="details-image"
      src={image} alt=""/>

    <div className="card-body">
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Gender: </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Birth Year:</span>
          <span>{birthYear}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Eye Color:</span>
          <span>{eyeColor}</span>
        </li>
      </ul>
    </div>
  </div>
  );
};
