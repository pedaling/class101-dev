interface Messages {
  [langauge: string]: any;
}

class I18n {
  private language = 'ko';
  private messages: Messages = {
    ko: {
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
          hun: '훈'
        }
      },
      title: '클래스101 기술 블로그',
      description: '신나는 코딩세상',
      company: '(주)클래스101',
      address: '서울특별시 중구 한강대로 416 서울스퀘어 13층',
      tel: '457-81-00277',
      searchPlaceholder: '제목 및 내용을 입력하세요',
      recruiting: '채용',
      members: '구성원'
    },
    en: {
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
          hun: 'Hun'
        }
      },
      title: 'Class101 Tech Blog',
      description: 'Funny Coding World',
      company: 'Class101',
      address: '13 floor, seoul-square, (416), han-gang-dae-ro, jun-gu, seoul',
      tel: '457-81-00277',
      searchPlaceholder: 'Input title or contents',
      recruiting: 'Recruiting',
      members: 'Members'
    }
  };

  public setLanguage(lang: string) {
    this.language = lang;
  }

  public t(keys: string) {
    let result = this.messages[this.language];
    for (const key of keys.split('.')) {
      result = result[key];
    }
    return result || keys;
  }
}

export default new I18n();
