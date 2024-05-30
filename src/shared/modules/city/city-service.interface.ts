import {DocumentType} from '@typegoose/typegoose';
import {CityEntity} from './city.entity.js';
import {CityType} from '../../types/index.js';

export interface CityServiceInterface {
  findById(id: number): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(cityData: CityType): Promise<DocumentType<CityEntity>>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
}
