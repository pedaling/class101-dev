const TAG_TEXT: { [key: string] : string} = {
  careers: '채용 공고',
  'open-source': '오픈소스'
}

export default (tag: string) => TAG_TEXT[tag] || tag;