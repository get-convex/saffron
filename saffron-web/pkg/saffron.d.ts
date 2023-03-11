/* tslint:disable */
/* eslint-disable */
/**
* @private
*/
export class WasmCron {
  free(): void;
/**
* @param {string} s
*/
  constructor(s: string);
/**
* @param {string} s
* @returns {Array<any>}
*/
  static parseAndDescribe(s: string): Array<any>;
/**
* @returns {boolean}
*/
  any(): boolean;
/**
* @param {Date} date
* @returns {boolean}
*/
  contains(date: Date): boolean;
/**
* @param {Date} date
* @returns {Date | undefined}
*/
  nextFrom(date: Date): Date | undefined;
/**
* @param {Date} date
* @returns {Date | undefined}
*/
  nextAfter(date: Date): Date | undefined;
}
/**
* @private
*/
export class WasmCronTimesIter {
  free(): void;
/**
* @param {WasmCron} cron
* @param {Date} date
* @returns {WasmCronTimesIter}
*/
  static startFrom(cron: WasmCron, date: Date): WasmCronTimesIter;
/**
* @param {WasmCron} cron
* @param {Date} date
* @returns {WasmCronTimesIter}
*/
  static startAfter(cron: WasmCron, date: Date): WasmCronTimesIter;
/**
* @returns {Date | undefined}
*/
  next(): Date | undefined;
}
