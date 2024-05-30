import {Container} from 'inversify';
import {Component} from '../../types/index.js';
import {DefaultCityService} from './default-city.service.js';
import {CityModel} from './city.entity.js';

export function createCityContainer () {
  const cityContainer = new Container();

  cityContainer.bind(Component.CityService).to(DefaultCityService).inSingletonScope();
  cityContainer.bind(Component.CityModel).toConstantValue(CityModel);
  return cityContainer;
}
