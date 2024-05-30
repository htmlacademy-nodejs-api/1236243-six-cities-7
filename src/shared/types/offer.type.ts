import { CityType, CoordinatesType } from './cities.type.js';
import { ExtraType, PhotoType, TypeOfHouseEnum } from './enums.js';
import { UserType } from './user.type.js';

export type OfferType = {
    name: string;
    description: string;
    date: Date;
    city: CityType;
    prevPhoto: string;
    photo: PhotoType[];
    isPremium: boolean;
    isFavorites: boolean;
    rating: number;
    type: TypeOfHouseEnum;
    rooms: number;
    guests: number;
    price: number;
    extras: ExtraType[];
    user: UserType;
    comments: number;
    coords: CoordinatesType;
}
