import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const initI18n = () => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      detection: {
        order: ['path'],
        lookupFromPathIndex: 0
      },
      resources: {
        ko: {
          translation: {
            profile: {
              name: {
                yozzing: '요찡',
                john: '존',
                joy: '조이',
                chichi: '치치',
                lama: '라마',
                esmond: '에즈먼드',
                donut: '도넛',
                hoi: '호이',
                grep: '그랩',
                cheolee: '처리',
                zzung: '쩡',
                tony: '토니',
                lion: '라이언',
                hun: '훈',
                han: '한'
              }
            },
            title: '클래스101 기술 블로그',
            description: '신나는 코딩세상',
            company: '(주)클래스101',
            address: '서울특별시 중구 통일로 10, 연세재단세브란스빌딩 18층',
            tel: '457-81-00277',
            searchPlaceholder: '제목 및 내용을 입력하세요',
            recruiting: '채용',
            members: '구성원'
          }
        },
        en: {
          translation: {
            profile: {
              name: {
                yozzing: 'Yozzing',
                john: 'John',
                joy: 'Joy',
                chichi: 'Chichi',
                lama: 'Lama',
                esmond: 'Esmond',
                donut: 'Donut',
                hoi: 'Hoi',
                grep: 'Grep',
                cheolee: 'Cheolee',
                zzung: 'Zzung',
                tony: 'Tony',
                lion: 'Lion',
                hun: 'Hun',
                han: 'Han'
              }
            },
            title: 'Class101 Tech Blog',
            description: 'Funny Coding World',
            company: 'Class101',
            address:
              '13 floor, seoul-square, (416), han-gang-dae-ro, jun-gu, seoul',
            tel: '457-81-00277',
            searchPlaceholder: 'Input title or contents',
            recruiting: 'Recruiting',
            members: 'Members'
          }
        }
      },
      fallbackLng: 'ko',
      whitelist: ['ko', 'en'],
      initImmediate: false
    });
};
