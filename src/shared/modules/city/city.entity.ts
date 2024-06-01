import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {CityType, CoordinatesType} from '../../types/index.js';
import {LocationEntity} from '../location/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'cities'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements CityType {
  @prop({require: true, unique: true, trim: true})
  public name: string;

  public coordinates: CoordinatesType;

  @prop({required: true, ref: LocationEntity})
  public CoordinatesId: Ref<LocationEntity>;

  constructor(
    cityData: CityType,
    coordinatesId: Ref<LocationEntity>,
  ) {
    super();
    this.name = cityData.name;
    this.coordinates = cityData.coordinates;
    this.CoordinatesId = coordinatesId;
  }
}

export const CityModel = getModelForClass(CityEntity);
