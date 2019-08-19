---
title: Google Cloud Platform's Firestore의 특징과 한계
date: '2019-07-24T04:35:23.448Z'
thumbnail: '/images/thumbnails/firestore.jpg'
description: ''
author: 'donut'
tags: ['gcp', 'firestore', 'firebase']
---

클래스101을 런칭했을 땐 단 몇 명의 개발자가 서비스를 만들어야 했습니다. GCP's Firestore(Google Cloud Platform's Firestore)를 활용해 단 일주일 만에 서버를 구축하지도 않고 서비스를 런칭했죠. 이제 클래스101은 많은 이들의 취미를 찾아주는 서비스가 되었습니다. 그리고 여러 체계가 잡히고 서버도 구축하면서 정들었던 GCP's Firestore를 떠나보낼 때도 되었습니다. 개발자가 사랑했던 GCP's Firestore, 어떤 특징이 있을까요?

Firestore는 스케일 업, 스케일 아웃과 같은 확장성은 전혀 걱정하지 않아도 되는 키-밸류 저장소입니다. 물론 비용을 제때 내야 합니다. 비용 지불에 문제가 생기면 바로 무료 플랜 limit을 넘어가는 모든 Firestore 요청이 실패할 테니까요. 각종 플랫폼에 SDK가 문서화되어 있고, react-native는 오픈소스인데다 react-native-firebase도 잘 운영되고 있습니다. 개발 리소스가 적은 서비스 초창기에는 훌륭한 도구인 셈입니다. 하지만 머지 않아 서비스 확장, 데이터베이스 모델 확장, 필요한 기능 증가 등의 이슈가 생기면서 점점 Firestore의 한계를 느끼게 됩니다.

1. **한국 리전이 없다.**
2. **트랜잭션 제한이 있다.**
3. **느리다.**

첫째, GCP 한국 리전이 없다는 것입니다. 반면 주요 사용자는 한국에 있기 때문에 이 문제는 데이터베이스를 다른 리전으로 옮기기 전까지 서비스 성능의 bottleneck으로 자리 잡고 있었습니다. 앞서 말했듯이 클래스101 서비스 초창기엔 웹과 모바일, 백오피스 등 모든 것이 Firestore와 밀접하게 연관되어 있어서 이것을 해결하는 건 굉장히 어렵고 큰 작업이었습니다. 게다가 GCP에서는 다른 리전으로 데이터를 자동으로 옮기는 기능도 없었기 때문에 근처 아시아 국가의 GCP's Firestore로 옮길 수조차 없었습니다. 서버 구축을 계획하면서 Firestore는 클래스101 서비스에서 없애야 하는 legacy가 되어버렸습니다.

둘째, Firestore에 트랜잭션 제한(transaction limit)이 있다는 것입니다. 가장 치명적인 건 하나의 document에선 1초에 하나의 트랜잭션만 할 수 있다는 것입니다. Firestore를 도입할 땐 미처 보지 못했죠. 이 때문에 트랜잭션이 필요한 로직에서는 제한사항들을 미리 확인하는 습관이 생겼습니다. [^1]

셋째, 느립니다. 흔히 '무겁다'라고 표현합니다. 이유는 여러 가지가 있지만 대표적으로 클라이언트 SDK에서 쿼리를 할 때 해당 document의 필요한 필드만 받는 projection 기능이 없다는 것입니다. 그래서 해당 document가 크다면 데이터를 모두 **클라이언트**가 받을 수밖에 없는데, 단순히 document의 사이즈보단 Firestore SDK가 기본적으로 가지고 있는 오버헤드까지 더해지므로 더 느리게 느껴집니다. 게다가 단순한 구조의 쿼리만 지원이 되고, 조금이라도 복잡해진 모델의 document를 쿼리하는 건 어렵습니다.[^2] 여러 제약사항은 고스란히 클라이언트의 부담이 되었고, 시간이 지날수록 비효율적인 쿼리를 하게 되었습니다. 심지어 당시 클라이언트에서는 Redux를 도입했는데, 비효율적인 Firestore 쿼리 구조와 Redux가 합쳐지면서 복잡하고 최적화하기도 힘들어졌습니다. 이것은 나쁜 UX의 원인이 되기도 했죠.

Firestore는 key-value store로 NoSQL 데이터 모델을 가지지만 위와 같은 문제들 때문에 항상 '정규화를 하는 게 과연 더 좋은 성능을 낼 수 있는가'를 고민할 수밖에 없었습니다. 결국 클래스101 서비스 구조에 회계 정산 업무를 자동화할 수 있는 서비스를 만들기 시작하면서 서버도 함께 구축했습니다. Node.js, Typescript, Apollo GraphQL, Atlas MongoDB, AWS Elastic Beanstalk 와 같은 스택을 썼고, 동시에 클라이언트들도 Apollo Client을 활용했습니다. Redux-form와 같은 Redux 관련 모듈도 걷어내고, MobX와 Formik을 적극 도입하면서, 지금은 거의 모든 곳에서 Firestore에 의존하지 않아도 되는 상태가 되었습니다.

새로운 기술 스택을 도입하면서 시행착오도 많았지만, 결국은 Firestore의 한계들을 극복했습니다. 개발 환경, 코드 퀄리티도 개선되었고, 지금은 React Hooks를 활용해 필요 없는 코드를 제거하며 리팩토링을 하고 있습니다. 다음 글에서는 서버 개발과 클라이언트의 새로운 기술 스택 도입 과정을 자세하게 다루겠습니다.

**참고문헌**

[^1]: [Firebase 사용량 및 한도, Firebase](https://firebase.google.com/docs/firestore/quotas#writes_and_transactions) (2019.07.23)
[^2]: [Cloud Firestore에서 간단한 쿼리 및 복합 쿼리 실행, Firebase](https://firebase.google.com/docs/firestore/query-data/queries?hl=ko) (2019.07.23)
