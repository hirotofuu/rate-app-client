import { atom, useRecoilState } from 'recoil';



export const apiTokenState = atom<string | null>({
  key: 'api_token',
  default: null,
});
