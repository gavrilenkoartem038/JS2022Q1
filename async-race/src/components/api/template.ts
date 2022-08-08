import { EngineStatus, Order, Sort } from '../types';

export class Templatate {
  public page = (limit: number, index: number): string => {
    return `_limit=${limit}&_page=${index}`;
  };

  public id = (id: number): string => {
    return `id=${id}`;
  };

  public status = (status: EngineStatus): string => {
    return `status=${status}`;
  };

  public sort = (sort: Sort): string => {
    return `_sort=${sort}`;
  };

  public order = (order: Order): string => {
    return `_order=${order}`;
  };
}
