import _ from 'lodash';

const TAG_TEXT: { [key: string]: string } = {
  recruiting: '채용 공고',
  'open source': '오픈소스',
};

export default (tag: string) => TAG_TEXT[tag] || _.startCase(tag);
