import { EventCallback } from './types';

export function getRandomNum(num: number): number {
  return Math.floor(Math.random() * num);
}

export function getRandomColor(num: number): string {
  let str = '';
  for (let i = 0; i < 3; i++) {
    let hexString: string = getRandomNum(num).toString(16);
    if (hexString.length % 2) {
      hexString = '0' + hexString;
    }
    str += hexString;
  }
  return str;
}

export function callbackBuilder(callback: EventCallback, className: string, event: Event) {
  if (event.target && (<Element>event.target).classList.contains(className)) {
    callback(event);
  }
}
