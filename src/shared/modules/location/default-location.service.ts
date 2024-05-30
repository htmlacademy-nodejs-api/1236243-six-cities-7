import {LocationServiceInterface} from './location-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component, CoordinatesType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {LocationEntity} from './location.entity.js';

@injectable()
export class DefaultLocationService implements LocationServiceInterface{
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.LocationModel) private readonly locationModel: types.ModelType<LocationEntity>,
  ) {
  }

  public async findById(id: number): Promise<DocumentType<LocationEntity> | null> {
    return this.locationModel.findById(id);
  }

  public async findByCoordinates(latitudeCity: number, longitudeCity: number): Promise<DocumentType<LocationEntity> | null>{
    return this.locationModel.findOne({latitude: latitudeCity, longitude: longitudeCity});
  }

  public async findOrCreate(locationData: CoordinatesType): Promise<DocumentType<LocationEntity>> {
    const existedLocation = await this.findByCoordinates(locationData.latitude, locationData.longitude);
    if(existedLocation) {
      return existedLocation;
    }
    return this.create(locationData);
  }

  public async create(locationData: CoordinatesType): Promise<DocumentType<LocationEntity>> {
    const location = new LocationEntity(locationData);
    const result = await this.locationModel.create(location);

    this.logger.info(`New location with coordinates ${locationData.latitude} ${locationData.longitude} created`);
    return result;
  }
}
