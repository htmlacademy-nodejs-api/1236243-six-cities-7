import dayjs from 'dayjs';
import { ParsedObject, generateRandomItem, generateRandomItems, generateRandomValue } from '../../helpers/common.js';
import { CoordinatesType, MockServerDataType } from '../../types/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 8;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 100;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator {
  constructor (private readonly mockData: MockServerDataType) {}
  public generate (): string {
    const name = generateRandomItem(this.mockData.name);
    const description = generateRandomItem(this.mockData.description);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = generateRandomItem(this.mockData.city);
    const prevPhoto = generateRandomItem(this.mockData.prevPhoto);
    const photo = this.mockData.photo.join(';');
    const isPremium = generateRandomItem(this.mockData.isPremium);
    const isFavorites = generateRandomItem(this.mockData.isFavorites);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = generateRandomItem(this.mockData.type);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const extras = generateRandomItems(this.mockData.extras).join(';');
    const user = generateRandomItem(this.mockData.user);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const coords = ParsedObject(generateRandomItem<CoordinatesType>(this.mockData.coords));

    return [
      name, description, date, city.name, prevPhoto, photo, isPremium, isFavorites, rating, type, rooms, guests, price, extras, user.name, user.email, user.avatarPath, user.password, user.type, comments, coords
    ].join('\t');
  }
}
