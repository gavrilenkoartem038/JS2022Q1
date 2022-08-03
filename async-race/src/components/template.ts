export class Templatate {
  public page = (limit: number, index: number): string => {
    return `_limit=${limit}&_page=${index}`;
  };
}
