import {Container} from 'inversify';
import {LocationServiceInterface} from './location-service.interface.js';
import {Component} from '../../types/index.js';
import {DefaultLocationService} from './default-location.service.js';
import {types} from '@typegoose/typegoose';
import {LocationEntity, LocationModel} from './location.entity.js';

export function createLocationContainer () {
  const locationContainer = new Container();

  locationContainer.bind<LocationServiceInterface>(Component.LocationService).to(DefaultLocationService).inSingletonScope();
  locationContainer.bind<types.ModelType<LocationEntity>>(Component.LocationModel).toConstantValue(LocationModel);
  return locationContainer;
}
