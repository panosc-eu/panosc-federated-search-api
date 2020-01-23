import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {ScicatDataSource} from '../datasources';

export interface PanService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // tslint: disable-next-line:no-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDatasets(title: string): Promise<any>;
}

export class PanProvider implements Provider<PanService> {
  constructor(
    // scicat must match the name property in the datasource json file
    @inject('datasources.scicat')
    protected dataSource: juggler.DataSource = new ScicatDataSource(),
  ) {}

  value(): Promise<PanService> {
    return getService(this.dataSource);
  }
}
