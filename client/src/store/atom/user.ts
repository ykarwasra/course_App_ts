import { atom, RecoilState } from 'recoil';

export const userState: RecoilState<{ isLoading: boolean; userEmail: string }> = atom({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: '',
  },
});






