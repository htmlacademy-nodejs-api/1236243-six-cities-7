import { OfferService } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './create-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService{
  constructor(
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.OfferModel) private offerModel: types.ModelType<OfferEntity>
  ){}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created ${dto.name}`);
    return result;
  }

  public findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
