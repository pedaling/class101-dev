---
title: TF-IDF를 활용한 클래스 유사도 분석과 추천 서버 구축 1편
date: '2019-07-16T22:12:03.284Z'
thumbnail: '/images/thumbnails/tf-idf.png'
description: ''
author: 'esmond'
tags: ['typescript', 'monorepo']
---

## Overview

클래스101에서 추천 서버를 담당하고 있는 Esmond입니다. 최근에 TF-IDF(Term Frequency - Inverse Document Frequency)를 활용해 클래스 간의 유사도를 분석하고 이를 API로 올렸습니다. 그 개발 과정과 이를 통해 앞으로 개선할 점을 두 편의 글로 쓰겠습니다.

## 개발 배경 및 목표

클래스101 앱에서 볼 수 있는 수백 개의 클래스를 어떻게 분류할 수 있을까요? 우리는 크게 두 가지의 기준을 가지고 있습니다.

첫째, 클래스가 처음 제작될 때 지정되는 클래스의 카테고리로 분류한다.

둘째, 클래스 오픈이 확정된 이후 비슷한 주제로 엮이는 클래스의 컬렉션으로 분류한다.

요즘은 클래스101이 빠르게 성장하면서 늘어난 유저에게 카테고리나 컬렉션과 같이 간단한 추천만 하기엔 역부족으로 보입니다. 보다 구체적으로 추천할 수 있는 로직이 필요해졌기에, 개발팀에서는 '클래스 간의 유사도'라는 지표를 분석하고 활용해보기로 결정했습니다. 이번 개발로 우리는 세 가지의 기능을 구현하기로 했습니다.

- 모든 클래스에 대해 유사도가 높은 N개의 클래스를 DB에 저장한다.
- 클래스가 추가될 때마다 자동으로 해당 데이터를 갱신한다.
- API로 오픈되어 어플리케이션 Layer에서 쉽게 접근할 수 있도록 한다.

## 객체 수치화를 위한 유사도 측정법 조사

클래스 간의 유사도를 추출하려면 먼저 유사도를 측정하는 여러가지 방법들을 알아야 합니다. 지금부터 소개하는 Euclidean Distance, Manhattan Distance, Cosine Similarity는 자주 쓰이는 유사도 측정법입니다.

### Euclidean Distance

가장 간단하고도 유명한 방법으로, 두 벡터 간의 직선 거리를 측정하는 방식입니다. 2차원에서는 피타고라스 정의로도 유명한 바로 그 방법입니다. 점 p = (p1, p2, ..., pn), q = (q1, q2, ..., qn) 에 대하여

![](Untitled-d230bf87-2140-4196-8e40-871c0ac265de.png)

와 같이 계산합니다.

### Manhattan Distance

Taxicab geometry라고도 합니다. 다음과 같이 정사각형으로 나뉜 공간에서 좌표로 표시된 한 점이 다른 한 점으로 가는 길의 거리입니다.

![](Untitled-6d28fa68-102f-48d2-81df-d940175de695.png)

점 p = (p1, p2, ..., pn), q = (q1, q2, ..., qn) 에 대하여

![](Untitled-57fb3268-3025-4198-95d2-bc75e2bf275c.png)

와 같이 계산합니다.

### Cosine Similarity

내적공간의 두 벡터에 대하여 벡터의 크기가 아닌 방향의 유사도를 판단하는 목적으로 사용합니다. 두 벡터의 방향이 비슷할 수록 유사도가 높다고 판단합니다. 두 벡터의 방향이 완전히 다를 경우(각도가 180°일 때)와 완전히 같을 경우(각도가 0°일 때)의 코사인 값 -1에서 1 사이의 값을 가집니다.

![](Untitled-477f1d55-4962-4ce0-a5b4-2ec9751bc69c.png)

와 같이 계산합니다.

위와 같은 유사도 측정법을 클래스에 적용하려면 먼저 클래스라는 개념적인 객체를 수치화하는 과정이 필요했습니다. 이 과정에서 활용되는 개념이 바로 벡터 공간 모델인 TF-IDF입니다. TF-IDF란 특정 Document에 등장하는 단어들이 해당 Document에서 얼마나 중요한지를 나타내는 통계적 수치입니다. 이 값이 높은 단어일수록 Document에서 중요한 단어라고 판단할 수 있습니다. 이 값은 TF(단어의 빈도)와 IDF(문서 빈도의 역수)의 곱으로 계산됩니다. 다시 말해 이 TF-IDF값을 활용하여 클래스를 Vectorization한 뒤 유사도를 측정하는 식으로 클래스 간 유사도를 계산한다고 할 수 있습니다. <a href="#footnote-1">[1]</a>

## 개발 과정

클래스라는 객체는 클래스 제목, 클래스 설명, 오픈 예정일, 크리에이터... 등등 여러 가지 속성을 가지고 있습니다. 이 모든 속성들을 전부 반영하여 클래스라는 개념을 수치화할 수 있다면 정말 좋겠지만, 우선은 클래스 제목과 설명 값만 가지고 유사도를 구해보기로 했습니다. TF-IDF를 활용한 vectorization과 유사도 분석은 관련 내장 함수들이 잘 갖춰진 scikit-learn을 사용했습니다.

```python
pip install scikit-learn==0.21.1
```

예제 문장에 대하여 TF-IDF를 활용해 Vectorization을 하고, 유사도(distance)를 구해보겠습니다.

```python
from sklearn.feature_extraction.text import TfidfVectorizer


doc_list = [
    '프리시즌 아시아 투어를 떠나는 토트넘은 싱가포르, 중국을 차례로 방문해 ICC 경기를 치른다.',
    '영국 "풋볼 런던"은 11일 "토트넘이 ICC 첫 경기에서 가장 강력한 스쿼드로 유벤투스에 맞설 것"이라고 평가했다.',
    '토트넘에 합류하는 손흥민은 유벤투스전 출전을 목표로 구슬땀을 흘릴 예정이다.',
]

tfidf_vectorizer = TfidfVectorizer(min_df=1)
tfidf_matrix = tfidf_vectorizer.fit_transform(doc_list)
doc_distances = (tfidf_matrix * tfidf_matrix.T)

print(doc_distances.toarray())
```

```
[[1.         0.04612956 0.        ]
    [0.04612956 1.         0.        ]
    [0.         0.         1.        ]]
```

여기서 1은 자기 자신과의 유사도를 의미합니다. 자기 자신과, 문장 형태가 아주 비슷한 케이스를 제외하고는 유사도가 그리 높지 않은 것을 알 수 있습니다. 그렇다면 konlpy와 같은 패키지를 사용해 특정 품사(명사)만 추출하고 유사도를 개선해보겠습니다.

```python
pip install konlpy==0.5.1

from konlpy.tag import Okt


okt = Okt()

doc_nouns_list = [' '.join(okt.nouns(doc)) for doc in doc_list]
print(doc_nouns_list)

tfidf_vectorizer = TfidfVectorizer(min_df=1)
tfidf_matrix = tfidf_vectorizer.fit_transform(doc_nouns_list)
doc_nouns_distances = (tfidf_matrix * tfidf_matrix.T)

print(doc_nouns_distances.toarray())
```

```

[
    '프리 시즌 아시아 투어 토트넘 싱가포르 중국 차례 방문 경기',
    '영국 풋볼 런던 은 토트넘 첫 경기 가장 스 쿼드로 유벤투스 것 평가',
    '토트넘 합류 손흥민 유벤투스 전 출전 목표 구슬 땀 예정'
]

[[1.         0.11327504 0.04435806]
    [0.11327504 1.         0.12859167]
    [0.04435806 0.12859167 1.        ]]
```

결과를 보면 조금 더 정밀하게 유사도를 측정할 수 있게 되었다는 걸 알 수 있습니다.(a)

지금부터는 실제 클래스 데이터들 간의 유사도를 계산하겠습니다. 10개의 카테고리에 대해서 클래스를 10개씩 총 100개의 샘플 클래스를 선정했습니다. 이제 상호 간 유사도를 측정한 뒤, 유사도 상위 10개의 클래스에 대하여 카테고리 일치 비율을 살펴보겠습니다. 이제부터 클래스는 product로 명명합니다.

사전에 DB에서 다음과 같은 schema의 product 데이터 100개를 product_list 변수에 담아두었습니다.

```python
{
    "product_id": PRODUCT_ID,
    "category_id": CATEGORY_ID,
    "title": "일러스트레이터 집시의 매력적인 얼굴 그리기",
    "description": "어떻게 그려도 예쁘고 멋진 비율과 비례, 매력과 생명력을 좌우하는 눈 코 입의..."
}
```

이제 할 일은 다음과 같습니다.

1. title과 description의 명사들을 추출하여 새로운 product dictionary 목록을 만든다.

2. title과 description에 대하여 각각 TfidfVectorizer로 vectorizing한 뒤 유사도를 계산하여 top 10개의 product id와 distance 값을 저장한다.

3. 타겟 클래스와 카테고리가 일치하는 비율을 구한다.

4. 100개의 샘플 데이터에 대하여 타겟 클래스와 카테고리가 일치하는 비율의 평균을 구한다.

각각의 기능들을 구현한 메소드와 실행 결과입니다.

1.

```python
from konlpy.tag import Okt
from tqdm import tqdm_notebook


okt = Okt()

def get_product_noun_list(product_list=None):
    return [{
        "product_id": product['product_id'],
        "category_id": product['category_id'],
        "title_noun": ' '.join(okt.nouns(product['title'])),
        "description_noun": ' '.join(okt.nouns(product['description'])),
    } for product in tqdm_notebook(product_list)]


product_noun_list = get_product_noun_list(product_list)
```

![](Screen_Shot_2019-07-12_at_7-751cae5a-ea27-494e-b280-8c20842038b0.56.48_PM.png)

jupyter notebook 환경에서 실행하면서 tqdm으로 iteration을 살펴봤습니다. 1초당 약 13.46 바퀴를 돌았고 100개의 데이터를 처리하는데 약 7초 정도가 걸렸습니다. 아마 konlpy 코어가 자바로 구성되어 JPype을 통해 자바를 돌리는 시간이 오래 걸린 것 같습니다.

2.

```python
tfidf_vectorizer = TfidfVectorizer(min_df=1)

def get_similar_products(product_noun_list=None, field=None, top_n=None):
    output = []

    tfidf_matrix = tfidf_vectorizer.fit_transform([product[field] for product in product_noun_list])
    doc_distances = (tfidf_matrix * tfidf_matrix.T)

    for idx, distances in enumerate(doc_distances.toarray()):
        top_similar_product_indices = distances.argsort()[-(top_n+1):][::-1][1:]
        output.append({
            "product_id": product_noun_list[idx]['product_id'],
            "top_similar_products": [{
                    "product_id": product_noun_list[similar_idx]['product_id'],
                    "distance": round(distances[similar_idx], 6)
            } for similar_idx in top_similar_product_indices]
        })
    return output

title_similar_products = get_similar_products(product_noun_list, 'title_noun', 10)
description_similar_products = get_similar_products_new(product_noun_list, 'title_noun', 10)

print(title_similar_products[0])
```

```
{
    'product_id': 'xxxxx',
    'top_similar_products': [
        {'product_id': 'xxxx', 'distance': 0.280641},
        {'product_id': 'xxxx', 'distance': 0.182949},
        {'product_id': 'xxxx', 'distance': 0.180826},
        {'product_id': 'xxxx', 'distance': 0.156225},
        {'product_id': 'xxxx', 'distance': 0.137592}
    ]
}
```

product_id는 모두 xxxx로 표기했습니다.

3.

```python
CATEGORY_DICT = {}
for product in (product_list):
    CATEGORY_DICT[product['product_id']] = product['category_id']

def get_ratio_list_of_same_category(similar_products=None):
    ratio_list_of_same_category = []
    for target_product in similar_products:
        category_of_target_product = CATEGORY_DICT[target_product['product_id']]
        category_list = [CATEGORY_DICT[product['product_id']] for product in target_product['top_similar_products']]

        same_category_ratio = category_list.count(category_of_target_product) / len(category_list)
        ratio_list_of_same_category.append({
            "product_id": target_product["product_id"],
            "same_category_ratio": same_category_ratio
        })
    return ratio_list_of_same_category

title_ratio_list_of_same_category = get_ratio_list_of_same_category(title_similar_products)
desc_ratio_list_of_same_category = get_ratio_list_of_same_category(description_similar_products)

print(title_ratio_list_of_same_category[0])
```

```
[
    {'product_id': 'xxxx', 'same_category_ratio': 0.3},
    {'product_id': 'xxxx', 'same_category_ratio': 0.2},
    {'product_id': 'xxxx', 'same_category_ratio': 0.4},
    {'product_id': 'xxxx', 'same_category_ratio': 0.6},
    {'product_id': 'xxxx', 'same_category_ratio': 0.4},
    ...
]
```

4.

```python
def get_avaerage_of_ratio(ratio_list_of_same_category=None):
    ratio_list = [dc['same_category_ratio'] for dc in ratio_list_of_same_category]
    return sum(ratio_list) / len(ratio_list)

title_avaerage_of_ratio = get_avaerage_of_ratio(title_ratio_list_of_same_category)
desc_avaerage_of_ratio = get_avaerage_of_ratio(desc_ratio_list_of_same_category)

print(f"title 기준 타겟 클래스와 카테고리가 일치하는 비율의 평균: {round(title_avaerage_of_ratio, 5)}")
print(f"description 기준 타겟 클래스와 카테고리가 일치하는 비율의 평균: {round(desc_avaerage_of_ratio, 5)}")
```

```
title 기준 타겟 클래스와 카테고리가 일치하는 비율의 평균: 0.224
description 기준 타겟 클래스와 카테고리가 일치하는 비율의 평균: 0.425
```

## Conclusion

기존 카테고리 기반 클래스 군집화와 클래스 제목, 설명을 기준으로 유사도 분석 결과 비교까지 해봤습니다. 다음 글에서는 이렇게 구한 유사 클래스 목록을 DB에 저장하고 새로운 클래스가 추가될 때마다 데이터를 update하여 서버를 다시 시작하지 않아도 API를 지속적으로 제공하는 추천 서버의 배포 과정을 소개하겠습니다.

## 참고

(a) konlpy의 Okt(구 Twitter)는 여러 클래스 중 유일하게 pos tagging에서 토큰을 normalize하는 기능을 사용할 수 있다.

![](Screen_Shot_2019-07-12_at_5-f83b6304-cdd1-4a5a-b5fe-d5104eefe6b6.42.03_PM.png)

## 참고문헌

**논문 및 학술자료**

<span id="footnote-1">[1]</span> Sasiporn Tongman ・ Niwan Wattanakitrungroj, <Classifying Positive or Negative Text Using Features Based on Opinion Words and Term Frequency - Inverse Document Frequency>, 5th International Conference on Advanced Informatics: Concept Theory and Applications (ICAICTA), 2018, p.161.

**웹사이트**

- Euclidean distance, Wikipedia, [https:// en.wikipedia.org/wiki/Euclidean_distance](https://en.wikipedia.org/wiki/Euclidean_distance) 참조. (2019.07.12)
- Taxicab geometry, Wikipedia, [https:// en.wikipedia.org/wiki/Taxicab_geometry](https://en.wikipedia.org/wiki/Taxicab_geometry) 참조. (2019.07.12)
- Cosine similarity, Wikipedia, [https:// en.wikipedia.org/wiki/Cosine_similarity](https://en.wikipedia.org/wiki/Cosine_similarity) 참조. (2019.07.12)
- TF-IDF, Wikipedia, [https:// en.wikipedia.org/wiki/Tf–idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) 참조. (2019.07.12)
- Okt class, KoNLPy, [http:// konlpy.org/en/latest/api/konlpy.tag/](http://konlpy.org/en/latest/api/konlpy.tag/) 참조. (2019.07.12)
