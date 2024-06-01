import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {CoordinatesType} from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface LocationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'locations'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class LocationEntity extends defaultClasses.TimeStamps implements CoordinatesType{
  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;

  constructor(locationData: CoordinatesType) {
    super();
    this.latitude = locationData.latitude;
    this.longitude = locationData.longitude;
  }
}

export const LocationModel = getModelForClass(LocationEntity);
