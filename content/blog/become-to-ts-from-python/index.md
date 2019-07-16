---
title: Python 서버 개발자 관점에서 본 TypeScript, JavaScript
date: "2019-07-16T14:12:03.284Z"
thumbnail: "/images/thumbnails/typescript.png"
description: ""
author: "Jonghyeok Choi"
tags: ["typescript", "javascript"]
---

**편집자 주**

'Python'은 독자의 가독성을 높이기 위해 글의 제목과 코드를 제외한 본문 전체에서 '파이썬'으로 한글 표기함. 이는 외래어 표기법 상 관용에 해당함.

## Overview

개발자가 3년 정도의 경력을 쌓으면 새로운 개발을 꿈꿉니다. 저도 마찬가지였습니다. 활기찬 스타트업에서 웹 백엔드를 맡아 개발하고 싶은 마음이 생겨났죠. 클래스101으로 이직한 이유이기도 합니다. 그렇다면 파이썬(Python)과 JS(JavaScript), TS(TypeScript)가 언어적으로 무엇이 다를까요. 크게 네 가지로 알아보겠습니다. 혹시 저처럼 서버 개발자에서 웹 백엔드 개발자로 새로운 일에 도전해보고 싶다면 이번 글이 분명 도움이 될 겁니다. 

1. Dictionary 사용법
2. 타입 변환
3. 함수의 축약
4. 에러율을 낮추는 TS

## 1. Dictionary 사용법

Dictionary는 데이터의 가공과 저장이 편리합니다. 개발자들이 자주 쓰는 타입이기도 하죠. 보통 맵의 key를 순회시키면 아래와 같이 씁니다.

                                                                                                                                                                                  
```python
sample_dictionary = {"A": 1, "B": 2, "C": 3}

for key in sample_dictionary.keys():
    print(key)
```

하지만 JS에서는 아래와 같이 씁니다.

```js
const sample_dictionary = {"A": 1, "B": 2, "C": 3}
    
Object.keys(sample_dictionary).forEach(key => {console.log(key)})
```

해당 객체의 method가 아닌 `Object.keys()`를 사용해서 key를 받아옵니다. 파이썬에서 하던 대로 JS에서 선언하면 해당 변수를 Dictionary, Map으로 취급하지 않고 **Object로 취급하기 때문입니다.** 따라서 하나의 키가 하나의 속성으로 취급 받는 것이고, 아래와 같이 Object 만들기, 호출, 설정을 할 수 있습니다. 
```js
const sample_dictionary = {A: 1, B: 2, C: 3} // "" 을 꼭 붙히지 않아도 속성이기때문에 상관없음

// Set
sample_dictionary["A"] = 2 // 가능
sample_dictionary.A = 2 // 가능

// Get
sample_dictionary["A"]
sample_dictionary.A // 가능
```

## 2. 타입 변환

JS의 타입 변환은 이전부터 말이 많았습니다. 오죽했으면 이런 meme까지 등장했을까요.

[그림1]

위의 그림과 같이 JS에서는 비교할 때 형 변환이 이뤄지는데요. 이 때문에 첫 코드 리뷰에서 변환에 조심하자는 피드백을 받기도 했습니다. 업무에서 자신만 코드를 쓰는 것이 아니라면 == 을 쓸 때 형 변환으로 어떤 결과가 나와야 할지 모두 다 고려해야 합니다. 그러므로 === (strict equal) 을 쓰는 것이 맞습니다.

## 3. 함수의 축약

파이썬에서도 람다(Lambda)와 같은 익명 함수를 쓸 수 있습니다. 다만 단순한 작업일 때만 해당하고 JS에서의 .map이나 => 과 같이 간단하거나 길게 쓰기는 어렵습니다. 아래의 소스를 보면 파이썬에서는 하나의 루프에서 두 개의 작업을 해야할 때 컴프리헨션 또는 람다를 사용하기가 어렵다는 것을 알 수 있습니다.

```python
sample_data = [ ... ]
    result_data = [ ]
    
    for sample in sample_data:
        temp_calc = sample.do_something()
        temp_calc_after_something = another_something(temp_calc)
        result_data.appned(temp_calc)
```
    

하지만 JS에서는 아래와 같이 줄여서 쓸 수 있습니다. 

```js
const sample_data = [ ... ]
    
const result_data = sample_data.map(iter => {
    const temp_calc = do_something()
    const temp_calc_after_something = another_something(temp_calc)
})
```
    

## 4. 에러율을 낮추는 TS

TS는 JS의 단점을 보완하고자 JavaScript에 Type check 기능을 도입한 언어입니다. 클래스101에서는 TS를 기반으로 쓰고 있습니다. TS를 처음 마주했을 때는 익숙하지 않았습니다. interface를 따로 빼고, return 타입, 인자 타입을 다 맞춰야 하는 등 시간을 많이 들여야 했죠. 

하지만 TS는 파이썬의 None 문제부터 JS의 undefined, null 문제까지 유연하고 쉽게 핸들링할 수 있도록 도와줍니다. JS를 쓰고 있었다면 적응하는데 시간이 걸리겠지만 막상 도입하고 익숙해지면 분명 에러율을 낮추는 좋은 대안이 될 것입니다.

## Conclusion

지금까지 파이썬과 TS, JS의 차이점을 살펴봤습니다. 이러한 차이점을 이해하고 업무에서 TS, JS를 함께 쓰니 좀 더 나은 코드를 만들 수 있었습니다. '언어는 도구에 불과하다'는 말이 있긴 하지만 개발 언어에 대한 이해도가 깊을수록 보다 좋은 코드가 나올 수 있을 겁니다. 이번 기회에 TS, JS와 친해지는 건 어떨까요?

## 참고문헌

**웹사이트**
JavaScript 객체 기본, MDN web docs, [https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics) 참조. (2019.07.12)