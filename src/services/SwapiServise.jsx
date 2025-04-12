import React, { Component } from "react";

export default class SwapiService extends React.Component {
  _swapiBase = "https://swapi.dev/api";
  _akababBase = "https://akabab.github.io/starwars-api/api";

  // --- универсальный фетчер
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  // --- персонажи с картинками
  async getAllPeople() {
    const data = await this.getResource(`${this._akababBase}/all.json`);
    return data.map(this._transformPerson);
  }

  async getPerson(id) {
    const data = await this.getResource(`${this._akababBase}/id/${id}.json`);
    return this._transformPerson(data);
  }

  // --- планеты и корабли оставим из SWAPI (без картинок)
  async getAllPlanets() {
    const res = await this.getResource(`${this._swapiBase}/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`${this._swapiBase}/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`${this._swapiBase}/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`${this._swapiBase}/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)?.[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  _transformPerson = (person) => {
    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear || "unknown",
      eyeColor: person.eyeColor || "unknown",
      image: person.image, // тут уже готовая ссылка
    };
  };
}
