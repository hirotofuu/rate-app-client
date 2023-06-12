import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiTokenState } from '../atom/tokenAtom'

export function useApiToken() {
  const apiToken = useRecoilValue(apiTokenState);
  const setApiToken = useSetRecoilState(apiTokenState);

  return {
    apiToken,
    setApiToken,
  };
}