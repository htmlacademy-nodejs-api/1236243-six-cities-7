import {CityType, CoordinatesType, TypeOfHouseEnum} from '../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public date: Date;
  public city: CityType;
  public prevPhoto: string;
  public photo: string[];
  public isPremium: boolean;
  public isFavorites: boolean;
  public rating: number;
  public type: TypeOfHouseEnum;
  public rooms: number;
  public guests: number;
  public price: number;
  public extras: string[];
  public userId: string;
  public comments: number;
  public coords: CoordinatesType;
}
