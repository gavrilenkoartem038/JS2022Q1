import HTMLParts from './parts';

const parts = new HTMLParts();

class Initial {
  public template = (): string => {
    return `${parts.header()}${parts.main()}${parts.winners()}${parts.footer()}`;
  };
}

export default Initial;
