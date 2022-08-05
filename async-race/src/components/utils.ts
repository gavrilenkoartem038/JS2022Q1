import { EventCallback } from './types';

export function getRandomNum(num: number): number {
  return Math.floor(Math.random() * num);
}

export function callbackBuilder(callback: EventCallback, className: string, event: Event) {
  if (event.target && (<Element>event.target).classList.contains(className)) {
    callback(event);
  }
}
