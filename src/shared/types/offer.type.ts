import { CityType, CoordinatesType } from './cities.type.js';
import { TypeOfHouseEnum } from './enums.js';
import { UserType } from './user.type.js';

export type OfferType = {
    name: string;
    description: string;
    date: Date;
    city: CityType;
    prevPhoto: string;
    photo: string[];
    isPremium: boolean;
    isFavorites: boolean;
    rating: number;
    type: TypeOfHouseEnum;
    rooms: number;
    guests: number;
    price: number;
    extras: string[];
    user: UserType;
    comments: number;
    coords: CoordinatesType;
}
