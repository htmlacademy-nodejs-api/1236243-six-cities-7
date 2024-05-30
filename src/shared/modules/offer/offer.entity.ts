import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {
  CityType,
  CoordinatesType,
  ExtraType,
  OfferType,
  PhotoType,
  TypeOfHouseEnum,
  UserType
} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base{}
@modelOptions(
  {
    schemaOptions: {
      collection: 'offer',
      timestamps: true
    }
  }
)
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {
  @prop({require: true, unique: true})
  public name: string;

  @prop({require: true})
  public description: string;

  @prop({require: true})
  public date: Date;

  public city: CityType;

  @prop({require: true})
  public prevPhoto: string;

  @prop({require: true})
  public photo: PhotoType[];

  @prop({require: true})
  public isPremium: boolean;

  @prop({require: true})
  public isFavorites: boolean;

  @prop({require: true})
  public rating: number;

  @prop({
    type: () => String,
    required: true,
    enum: TypeOfHouseEnum
  })
  public type: TypeOfHouseEnum;

  @prop({require: true})
  public rooms: number;

  @prop({require: true})
  public guests: number;

  @prop({require: true})
  public price: number;

  @prop({
    require: true,
    type: () => String
  })
  public extras: ExtraType[];

  @prop({require: true, ref: UserEntity})
  public userId: Ref<UserEntity>;

  public user: UserType;

  @prop({require: true})
  public comments: number;


  public coords: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
