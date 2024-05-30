import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { OfferType } from '../../shared/types/index.js';
import { Command } from './command.interface.js';
import {DefaultUserService, UserService} from '../../shared/modules/user/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {ConsoleLogger, Logger} from '../../shared/libs/logger/index.js';
import {UserModel} from '../../shared/modules/user/user.entity.js';
import {DatabaseClient, DatabaseClientMongo} from '../../shared/libs/database-client/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constants.js';
import {getMongoURI} from '../../shared/helpers/index.js';


export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportOffer = this.onImportOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new DatabaseClientMongo(this.logger);
  }


  private async onImportOffer(offer: OfferType, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: OfferType) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      prevPhoto: offer.prevPhoto,
      photo: offer.photo,
      isFavorites: offer.isFavorites,
      isPremium: offer.isPremium,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      extras: offer.extras,
      userId: user.id,
      comments: offer.comments,
      coords: offer.coords,
    });
  }

  private onCompleteImport (count: number) {
    console.info(`${count} rows imported`);
    this.databaseClient.disconnect();
  }

  public getName(): string {
    return '--import';
  }

  public async execute(fileName: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {

      console.error(`Can't import data from ${fileName}`);
      console.error(getErrorMessage(error));
    }
  }
}
