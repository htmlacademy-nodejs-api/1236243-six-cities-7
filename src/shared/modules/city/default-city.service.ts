import {CityServiceInterface} from './city-service.interface.js';
import {inject, injectable} from 'inversify';
import {CityType, Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CityEntity} from './city.entity.js';
import { LocationServiceInterface } from '../location/index.js';
import {CreateCityDto} from './create-city.dto.js';


@injectable()
export class DefaultCityService implements CityServiceInterface {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>,
    @inject(Component.LocationService) private readonly locationService: LocationServiceInterface,
  ) {
  }

  public async findById(cityId: number): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName});
  }

  public async findOrCreate(cityData: CityType): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByName(cityData.name);
    if (existedCity) {
      return existedCity;
    }
    return this.create(cityData);
  }

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const {coordinates: coordinatesData} = dto;
    const coordinates = await this.locationService.findOrCreate(coordinatesData);

    const city = new CityEntity(dto, coordinates.id);
    const result = await this.cityModel.create(city);
    this.logger.info(`New City ${city.name} created`);

    return result;
  }
}
