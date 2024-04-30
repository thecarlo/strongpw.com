import { CrackTime } from '@interfaces/crackTime';

export const crackTimeDictionary: Record<number, CrackTime> = {
  8: {
    allChars: '5 minutes',
    onlyAlphaNum: '2 minutes',
    onlyAlpha: '28 seconds',
  },
  9: { allChars: '6 hours', onlyAlphaNum: '2 hours', onlyAlpha: '24 minutes' },
  10: { allChars: '2 weeks', onlyAlphaNum: '5 days', onlyAlpha: '21 hours' },
  11: { allChars: '3 years', onlyAlphaNum: '10 months', onlyAlpha: '1 month' },
  12: { allChars: '226 years', onlyAlphaNum: '53 years', onlyAlpha: '6 years' },
  13: {
    allChars: '15 thousand years',
    onlyAlphaNum: '3 thousand years',
    onlyAlpha: '332 years',
  },
  14: {
    allChars: '1 million years',
    onlyAlphaNum: '200 thousand years',
    onlyAlpha: '17 thousand years',
  },
  15: {
    allChars: '77 million years',
    onlyAlphaNum: '12 million years',
    onlyAlpha: '900 thousand years',
  },
  16: {
    allChars: '5 billion years',
    onlyAlphaNum: '779 million years',
    onlyAlpha: '46 million years',
  },
  17: {
    allChars: '380 billion years',
    onlyAlphaNum: '48 billion years',
    onlyAlpha: '2 billion years',
  },
  18: {
    allChars: '26 trillion years',
    onlyAlphaNum: '2 trillion years',
    onlyAlpha: '126 billion years',
  },
};
