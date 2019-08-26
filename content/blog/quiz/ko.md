---
title: '클래스101 서류전형 과제'
date: '2019-08-26T22:12:03.284Z'
thumbnail: 'https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=3600'
description: ''
author: 'john'
tags: ['recruiting']
---

## 개요

클래스101에서는 이력서로 표현하지 못하는 지원자분의 코드센스를 파악하기 위해 간단한 과제를 요구하고 있습니다.  
제출하신 코드를 토대로 기술 면접에서 면접관과 얘기를 나누게 됩니다.

## 과제내용

```typescript
// 미리보기
class Car extends Vehicle {
  // 시동을 켠다
  public run() {
    for (let i = 0; i < this.getNumberOfWheels(); i++) {
      this.wheels[i].rpm = 5;
    }
  }
  public isRoadEmpty(vehicles: Vehicle[]) {
    return vehicles.length === 0;
    
.....
```

이 [레파지토리](https://github.com/pedaling/class101-quiz)는 차량이 도로를 달리는 현실세계를 간단히 표현한 프로젝트입니다.  
코드를 읽고 아래 과업을 수행해주세요.

1. 가독성, 유지보수, 생산성, 협업 등 모든 측면에서 본인이 생각하기에 **코드 퀄리티를 높이는 방향**으로 리팩토링해주세요.
    - 코드의 의도(차량이 도로를 달리는 현실세계를 표현)를 유지하는 선에서 코드의 모든 영역(네이밍, 파일 구조, 프로그래밍 패러다임, 패턴, 라이브러리, ...)에 대해 수정을 가해도 괜찮습니다.
    - 예시 코드는 타입스크립트로 작성되었으나, 다른 원하시는 언어가 있다면 그 언어를 사용하실 수 있습니다. 단, 가능하면 정적 타입이 포함된 언어로 작성해주세요. 슈도코드도 가능합니다.
2. 작업하는 코드는 깃허브에 올려주세요. 만약 여러 커밋에 걸쳐서 작업하신다면 깃 히스토리가 남겨지도록 작업해주세요.
3. 서류 제출 시, 작업하신 깃허브 레포지토리의 링크를 같이 제출해주세요.


