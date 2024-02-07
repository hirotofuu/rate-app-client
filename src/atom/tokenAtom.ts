import { atom, useRecoilState } from 'recoil';

// apiトークンのatom

export const apiTokenState = atom<string | null>({
  key: 'api_token',
  default: null,
});
