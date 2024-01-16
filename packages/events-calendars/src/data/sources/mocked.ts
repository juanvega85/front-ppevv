import { IDataSource } from '../../data/IDataSource';
import { mockedDataSource as mockedSchedulingDataSource } from '@ppe/scheduling';

export const mockedDataSource: IDataSource = {
  ...mockedSchedulingDataSource,
};
