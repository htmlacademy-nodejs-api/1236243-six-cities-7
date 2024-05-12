import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { OfferType } from '../../shared/types/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private onImportOffer(offer: OfferType): void {
    console.info(offer);
  }

  private onCompleteImport (count: number) {
    console.info(`${count} rows imported`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;
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
