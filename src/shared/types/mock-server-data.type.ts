import { CityType, CoordinatesType } from './cities.type.js';
import { UserType } from './user.type.js';

export type MockServerDataType = {
    name: string[],
    description: string[],
    city: CityType[],
    prevFoto: string[],
    foto: string[],
    isPremium: boolean[],
    isFavorite: boolean[],
    type: string[],
    extras: string[],
    user: UserType[],
    coords: CoordinatesType[]
}
