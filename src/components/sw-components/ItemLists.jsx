import React from 'react';
import ItemList from '../itemList/ItemList';
import { withData } from '../hoc-helpers';
import SwapiService from '../../services/SwapiServise';

const swapiService = new SwapiService();

const {
  getAllPeople,
  getAllStarships,
  getAllPlanets
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const PersonList = withData(
                      withChildFunction(ItemList, renderName),
                      getAllPeople);

const PlanetList = withData(
                      withChildFunction(ItemList, renderName),
                      getAllPlanets);

const StarshipList = withData(
                      withChildFunction(ItemList, renderModelAndName),
                      getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
};