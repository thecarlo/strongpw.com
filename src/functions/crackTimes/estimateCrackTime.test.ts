import { describe, expect, it } from 'vitest';

import { estimateCrackTime } from './estimateCrackTime';

describe('estimateCrackTime', () => {
  it('should return "Seconds" for passwords shorter than 8 characters', () => {
    expect(estimateCrackTime('abcd')).toEqual('Seconds');
  });

  it('should return "Practically infinite" for passwords 30 characters in length or longer', () => {
    expect(estimateCrackTime('QeKGUVrpyZraLdWanUlPuiysKNPBfG')).toEqual(
      'Practically infinite'
    );
  });

  it('should return "Trillions of years" for passwords of 20 characters with onlyAlpha', () => {
    expect(estimateCrackTime('NkUJeIfbiwVmKaoXqoyi')).toEqual(
      'Trillions of years'
    );
  });

  it('should return "Trillions of years" for passwords of 20 characters with allChars', () => {
    expect(estimateCrackTime(';2GCA_wCeA^46>M4&PJb')).toEqual(
      'Trillions of years'
    );
  });

  it('should return correct time for onlyAlpha', () => {
    expect(estimateCrackTime('ABCDabcd')).toEqual('28 seconds');
  });

  it('should return correct time for onlyAlphaNum', () => {
    expect(estimateCrackTime('ABCDabc1')).toEqual('2 minutes');
  });

  it('should return correct time for allChars', () => {
    expect(estimateCrackTime('A!CDabc1')).toEqual('5 minutes');
  });
});
