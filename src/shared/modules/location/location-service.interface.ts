import {CoordinatesType} from '../../types/index.js';
import {DocumentType} from '@typegoose/typegoose';
import {LocationEntity} from './location.entity.js';

export interface LocationServiceInterface {
  findOrCreate(locationData: CoordinatesType): Promise<DocumentType<LocationEntity>>;
  findById(id: number): Promise<DocumentType<LocationEntity> | null>;
  findByCoordinates(latitudeCity: number, longitudeCity: number): Promise<DocumentType<LocationEntity> | null>;
}
