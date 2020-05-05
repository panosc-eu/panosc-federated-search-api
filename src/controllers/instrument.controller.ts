import {Filter, repository} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Instrument} from '../models';
import {InstrumentRepository} from '../repositories';
import {intercept} from '@loopback/core';
import {AddScoreInterceptor} from '../interceptors/add-score.interceptor';

export class InstrumentController {
  constructor(
    @repository(InstrumentRepository)
    protected instrumentRepository: InstrumentRepository,
  ) {}

  @get('/instruments/{pid}', {
    responses: {
      '200': {
        description: 'Instrument model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Instrument, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Instrument> {
    return this.instrumentRepository.findById(pid);
  }

  @intercept(AddScoreInterceptor.BINDING_KEY)
  @get('/instruments', {
    responses: {
      '200': {
        description: 'Array of Instrument model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Instrument, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Instrument))
    filter?: Filter<Instrument>,
  ): Promise<Instrument[]> {
    return this.instrumentRepository.find(filter);
  }
}
