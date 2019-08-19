---
title: Usage of TypeScript and JavaScript from the Python Server Developer’s point of view
date: '2019-07-16T14:12:03.284Z'
thumbnail: '/images/thumbnails/typescript.png'
description: ''
author: 'lama'
tags: ['typescript', 'javascript']
---


## Overview

When developers build their career around three years, they want to try new things. Same here too, I wanted to take part in web backend at active startup company; and it brought me to CLAA101. Then what is the difference between Python, JS (JavaScript), and TS (TypeScript)? Let’s see the difference in four aspects. I believe this content will certainly help you if you are looking for a new career from server developer to web backend developer. 

## How to use Dictionary 

Dictionary is convenient to store and process data. Therefore, developers frequently use this type. Usually, we write as below to circulate the map’s key. 

```python
sample_dictionary = {"A": 1, "B": 2, "C": 3}

for key in sample_dictionary.keys():
    print(key)
```

However, in JS, we write as below.

```js
const sample_dictionary = { A: 1, B: 2, C: 3 };

Object.keys(sample_dictionary).forEach(key => {
  console.log(key);
});
```

It gets key by using `object.keys()`, not by the object’s method. It is because JS treat the variable as Object while Python treats it as a Dictionary or Map. Thus, a key is treated as an attribute, and we can make, call, or set the object like below. 

```js
const sample_dictionary = { A: 1, B: 2, C: 3 }; // "" 을 꼭 붙히지 않아도 속성이기때문에 상관없음

// Set
sample_dictionary['A'] = 2; // 가능
sample_dictionary.A = 2; // 가능

// Get
sample_dictionary['A'];
sample_dictionary.A; // 가능
```

## Type Transition

There has been a lot of opinion regarding type transition of JS. Even the meme was made. 

[그림1]

 Like picture 1, in JS, there is a type transition for the comparison process. Thus, I got feedback to be careful of transition at my first code review. If you are not using code alone, we should consider the result of type transition by using ==. Therefore, it is correct to use ===(strict equal)

## Function Abbreviation

We can use an anonymous function such as Lambda in Python. However, it is only possible when we are working for a simple task, and hard to write simple or long like usage of .map or => in JS. According to the source below, in Python, we can check that it is difficult to use lambda or comprehension when two tasks have to be done in one loop. 

```python
sample_data = [ ... ]
    result_data = [ ]

    for sample in sample_data:
        temp_calc = sample.do_something()
        temp_calc_after_something = another_something(temp_calc)
        result_data.appned(temp_calc)
```

However, we can reduce the form in JS.

```js
const sample_data = [ ... ]

const result_data = sample_data.map(iter => {
    const temp_calc = do_something()
    const temp_calc_after_something = another_something(temp_calc)
})
```

## TS for lowering error rate


TS is a language that supplemented Type check function to JavaScript to overcome the drawback of JS. CLASS101 system is based on TS. It was unfamiliar to use TS at first. I need to put more effort to subtract interface, adjust return and factor type. 

However, TS help us to easily handle the several cases from None problem of Python to the undefined, null problem of JS. Although it would take some time to adapt in TS system, adoption of TS will definitely a good alternative to lower the error rate.

## Conclusion

Until now, we have look through the difference between TS and JS. For me, it was very useful to understand the difference and use both languages. I believe the better code would be made through the deeper understanding of development language though some people say ‘language is just a tool’. I hope you to become familiar with TS, JS through this chance. 

## Refrence

**Website**
JavaScript 객체 기본, MDN web docs, [https:// developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics) 참조. (2019.07.12)
