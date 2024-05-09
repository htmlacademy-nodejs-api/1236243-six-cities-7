import dayjs from 'dayjs';
import { ParsedObject, generateRandomItem, generateRandomItems, generateRandomValue } from '../../helpers/common.js';
import { CityType, CoordinatesType } from '../../types/cities.type.js';
import { MockServerDataType } from '../../types/mock-server-data.type.js';
import { UserType } from '../../types/user.type.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM = 1;
const MAX_ROOMS = 8;

const MIN_GUEST = 1;
const MAX_GUESTS = 8;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENT = 1;
const MAX_COMMENTS = 100;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator {
  constructor (private readonly mockData: MockServerDataType) {}
  public generate (): string {
    const name = generateRandomItem<string>(this.mockData.name);
    const description = generateRandomItem<string>(this.mockData.description);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = generateRandomItem<CityType>(this.mockData.city);
    const prevFoto = generateRandomItem<string>(this.mockData.prevFoto);
    const foto = generateRandomItems<string>(this.mockData.foto).join(';');
    const isPremium = generateRandomItem<boolean>(this.mockData.isPremium);
    const isFavorites = generateRandomItem<boolean>(this.mockData.isFavorites);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = generateRandomItem<string>(this.mockData.type);
    const rooms = generateRandomValue(MIN_ROOM, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUEST, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const extras = generateRandomItems<string>(this.mockData.extras).join(';');
    const user = generateRandomItem<UserType>(this.mockData.user);
    const comments = generateRandomValue(MIN_COMMENT, MAX_COMMENTS);
    const coords = ParsedObject(generateRandomItem<CoordinatesType>(this.mockData.coords));

    return [
      name, description, date, city.name, prevFoto, foto, isPremium, isFavorites, rating, type, rooms, guests, price, extras, user.name, user.email, user.avatar, user.password, user.type, comments, coords
    ].join('\t');
  }
}
