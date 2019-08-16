---
title: Monorepo with typescript (1)
date: '2019-07-12T22:12:03.284Z'
thumbnail: '/images/thumbnails/monorepo.png'
description: ''
author: 'Geonho Han'
tags: ['typescript', 'monorepo', 'lerna', 'git']
---

# Jump to Monorepo

**편집자 주**
'Monorepo'는 독자의 가독성을 높이기 위해 글의 제목을 제외한 본문 전체에서 '모노레포'로 한글 표기함. 이는 외래어 표기법 상 관용에 해당함.

## Overview

이번 글에서는 모노레포를 도입한 계기와 장・단점, Git history를 보존한 채 레포지토리를 합치는 방법을 다루겠습니다.

## 모노레포의 이해

모노레포는 두 개 이상의 프로젝트 코드를 하나의 레포지토리에서 관리하는 기법입니다.[1] 페이스북이나 구글, 마이크로소프트 등 대형 소프트웨어 기업에서도 사용되고 있고, 일부 인기 있는 오픈 소스 프로젝트들도 그들의 레포지토리를 관리하기 위해 Monorepo를 쓰고 있습니다. 그렇다면 클래스101에서는 왜 모노레포가 필요할까요? 우선 그 특징부터 살펴보겠습니다.

## 모노레포의 특징

### 코드의 재사용

여러 레포지토리에서 프로젝트를 진행하면 비슷한 로직을 각 레포지토리에서 중복 구현하는 때가 많습니다. 공통 로직을 다시 작성하지 않고 공유하려면 레포지토리를 추가하고 이에 해당하는 의존성을 추가해주어야 합니다. 다른 레포의 의존성을 추가하는 것은 같은 레포에서 패키지의 의존성을 추가하는 것보다 많은 비용이 듭니다. 만약 멀티레포에서는 적절한 버전을 찾아 `package.json` 에 추가해주고 `npm install` 과 같은 커맨드를 매번 실행해주어야 합니다. 반면 lerna(JavaScript 모노레포 관리 툴)를 사용한다면 `lerna boostrap` 이라는 하나의 커맨드로 모든 의존성을 추가하고 해당 상태에서 드 수정을 할 수 있습니다.

### 의존성 관리

클래스101에서는 Code Formatting을 위해 prettier, Code Linting을 위한 tslint를 사용합니다. 기존의 멀티레포 구조에서는 각 레포에 prettier, tslint를 각각 설치해야 했습니다. 하지만 모노레포와 함께라면 각 레포를 Cloning하고 일일이 업데이트하는 과정을 거치지 않아도 됩니다.

### 작은 커밋과 PR

여러 레포에서 변경사항이 있다면 개발자는 작은 커밋으로 나눠 PR(Pull Request)을 보내는 것보다, 모든 코드를 작성하고 이에 대한 의존성을 바꾸는 방식의 작업을 선호합니다. 하지만 모노레포에서는 여러 패키지의 변경사항을 하나의 커밋과 PR로 제출할 수 있습니다. 덕분에 더 작게 나눠서 작업할 수 있죠. 다만 하나의 커밋에는 한 패키지의 변경사항만 기록하는 SRP(Single Responsibility Principle, 단일 책임 원칙)를 지켜야 합니다.

### 대규모 리팩토링

모노레포로 레포지터리를 운영해보니 하나의 파일에 대한 컨트리뷰터가 상당히 많아졌습니다. 다행히 해당 로직을 이해하는 동료가 많아 여러 사람이 효율적으로 로직을 작성하는 방식에 대해서도 함께 생각할 수 있었죠. 이와 같은 멘탈 모델 얼라인으로 대규모 리팩토링을 유도할 수 있었습니다.

### 팀 간 협업

모든 구성원이 모든 코드에 접근할 수 있기 때문에 팀 간 협업이 자유롭습니다.

### Trunk Based Development

모노레포에서는 서버와 웹을 합쳐 하나의 버전으로 판단할 수 있습니다. 이것은 Master 브랜치를 항상 배포할 수 있도록 유지하는 Trunk Basement Development를 진행하는 데에 도움이 됩니다.

## 모노레포의 필요성

### Schema Synchronization를 통한 인터페이스 변환

클래스101에서는 모든 코드를 TypeScript로 작성하고 있습니다. 또한 Apollo Server와 type-graphql을 이용하여 GraphQL기반 API도 작성하고 있어 GraphQL 스키마를 TypeScript 인터페이스로 변환하는 과정이 꼭 필요합니다. 우리는 이것을 Class101에서는 `Schema Sync` 라고 부릅니다. 기존에는 스테이징 서버에서 제공하주는 `schema.gql` 파일을 이용하여 `Schema Sync` 를 진행했었습니다. 하지만 스테이징 서버가 업데이트되기 전에 Schema를 변경하거나 이를 사용하는 웹과 앱에서 Fragment를 변경하면 위험할 수도 있었죠. 모노레포에서는 서버 코드를 변경할 때 코드를 기반으로 `Schema Sync` 를 실행할 수 있어 이러한 위험요소를 제거할 수 있었습니다.

### 테스트 실행

Cypress, Pupeeter등을 이용하여 E2E 테스트를 실행한다고 가정해봅시다. 배포가능함을 보장하기 위해선 서버가 변경됐을 때도, 웹이 변경됐을 때도 E2E 테스트를 실행해야 합니다. 멀티레포에서는 하나의 Testing레포를 만들거나 각각의 레포에 E2E테스트를 중복구현해야 합니다. 그러나 모노레포에서는 테스트를 위한 package하나만 추가해주면 모든 변경사항에 대해 지속적으로 테스트할 수 있습니다.

모노레포를 도입하는 것은 빠르면 빠를수록 좋습니다. 코드가 늘어나고, 의존성이 늘어날 수록 고려해야 할 사항이 많이지기 때문이죠. 클래스101에서도 더 늦기 전에 모노레포를 도입하기로 했습니다. 가장 먼저 진행한 작업은 Code Base 조합이었습니다.

## Code Base 조합(a)(b)

### 개발 커뮤니케이션을 위한 Git history의 보존

개발자가 새로운 기능을 개발하다가 기존의 기능을 함께 이용하면 가장 많이 듣는 질문은 바로 "이거 왜 이렇게 개발했어?"입니다. 흔히 Blame이라고도 합니다. 이런 Blame에 대한 기록이 모두 사라지면 나중에 커뮤니케이션 효율이 떨어질 수밖에 없습니다. 이와 같은 부작용을 겪지 않기 위해 Git history를 모두 보존해야 했습니다. 먼저 lerna를 써봤습니다.

### lerna의 사용과 문제점

lerna에는 `import`라는 커맨드가 존재합니다. 아래와 같은 폴더 구조를 가진 프로젝트를 가정해봅시다.

```bash
package-1/
    package.json
my-lerna-repo/
    package.json
    packages/
    package-2/
        package.json
```

만약 package-1을 my-lerna-repo/에 추가하고 싶다면 `import`커맨드를 사용하면 됩니다.

```bash
# cd my-lerna-repo
lerna import ../package-1
```

아래와 같은 에러가 나타난다면 flatten 옵션을 주어 실행하면 됩니다.

```bash
# <https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna>
# 해당 에러를 기록해 두지 않아 에러 로그는 스택오버플로우에서 가져왔습니다.
lerna ERR! import Rolling back to previous HEAD (commit a235ee9b3c382c9751abf792a22b2ec9df894a18)
lerna ERR! EIMPORT Failed to apply commit a932c8cf8.
lerna ERR! EIMPORT Command failed: git am -3 --keep-non-patch
lerna ERR! EIMPORT error: Failed to merge in the changes.
lerna ERR! EIMPORT Applying: Made Device Analytics Controller. Made device-analytics.stache be rendered through controller.
lerna ERR! EIMPORT Using index info to reconstruct a base tree...
lerna ERR! EIMPORT M    packages/some-repo/app/scripts/app/controls/active-device.js
lerna ERR! EIMPORT M    packages/some-repo/app/templates/device/active-device.stache
lerna ERR! EIMPORT M    packages/some-repo/views/index.jade
lerna ERR! EIMPORT Falling back to patching base and 3-way merge...
lerna ERR! EIMPORT Auto-merging packages/some-repo/app/templates/device/device-analytics.stache
lerna ERR! EIMPORT CONFLICT (add/add): Merge conflict in packages/some-repo/app/templates/device/device-analytics.stache
lerna ERR! EIMPORT Auto-merging packages/some-repo/app/scripts/app/controls/device-analytics.js
lerna ERR! EIMPORT CONFLICT (add/add): Merge conflict in packages/some-repo/app/scripts/app/controls/device-analytics.js
lerna ERR! EIMPORT Auto-merging packages/some-repo/app/scripts/app/controls/active-device.js
lerna ERR! EIMPORT CONFLICT (content): Merge conflict in packages/some-repo/app/scripts/app/controls/active-device.js
lerna ERR! EIMPORT Patch failed at 0001 Made Device Analytics Controller. Made device-analytics.stache be rendered through controller.
lerna ERR! EIMPORT The copy of the patch that failed is found in: .git/rebase-apply/patch
lerna ERR! EIMPORT When you have resolved this problem, run "git am --continue".
lerna ERR! EIMPORT If you prefer to skip this patch, run "git am --skip" instead.
lerna ERR! EIMPORT To restore the original branch and stop patching, run "git am --abort".
lerna ERR! EIMPORT
lerna ERR! EIMPORT
lerna ERR! EIMPORT You may try again with --flatten to import flat history.
```

실제로 `lerna import`커맨드를 사용하게 되면 모든 것이 해결되진 않습니다. flatten 옵션을 줘도 마찬가지죠. 이는 프로젝트 초기에 Merge, Rebase, Force Push 등을 하며 올바르지 않은 변경사항이 강제로 합쳐진 경우가 있기 때문입니다. 이 경우엔 아래와 같은 에러를 마주할 것입니다.

```bash
# <https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna>
lerna ERR! EIMPORT Failed to apply commit f16ede066.
lerna ERR! EIMPORT Command failed: git am -3 --keep-non-patch
lerna ERR! EIMPORT error: git diff header lacks filename information when removing 1 leading pathname component (line 845968)
lerna ERR! EIMPORT error: could not build fake ancestor
lerna ERR! EIMPORT Applying: Adding dist files. Refs #17
lerna ERR! EIMPORT Patch failed at 0001 Adding dist files. Refs #17
lerna ERR! EIMPORT The copy of the patch that failed is found in: .git/rebase-apply/patch
lerna ERR! EIMPORT When you have resolved this problem, run "git am --continue".
lerna ERR! EIMPORT If you prefer to skip this patch, run "git am --skip" instead.
lerna ERR! EIMPORT To restore the original branch and stop patching, run "git am --abort".
```

### git log, git am을 통한 CodeBase 조합

위와 같은 단점을 해결하기 위해 다른 해결책을 모색해야 했습니다. 클래스101의 테크리드, 조이의 도움으로 `git log`와 `git am`을 이용한다면 문제를 해결할 수 있다는 것을 알게 되었습니다. `git am`은 대화식으로 patch apply 과정을 진행할 수 있기 때문이죠.

**git log**  
terminal에서 `man git-log` 를 이용하면 매우 다양한 옵션이 있다는 걸 알 수 있습니다. 그중에서도 `-p` 옵션을 사용하면 아래 그림과 같은 patch파일을 만들 수 있었습니다.

![[그림 1] 출처: StackOverflow](./stackoverflow.png)

**git am**  
`git log` 를 통해 만들어진 패치파일을 `git am` 을 이용해 모노레포 폴더에서 적용할 수 있었습니다. 역시나 다양한 옵션을 사용하였고 실제 사용한 커맨드는 아래와 같습니다.

```bash
# in web folder
git log --reverse --first-parent -p -m --pretty=email --stat --binary HEAD > class101-web.patch

# in mono folder
git am --directory packages/web ../class101-web/class101-web.patch -3 --keep-non-patch --ignore-whitespace
```

- `git log`
  - —reverse: git log 실행시 최근 커밋이 아닌 최초 커밋부터 기록을 확인하기 위해 사용한 옵션입니다.
  - —first-parent: merge commit에 대해 첫번째 부모 커밋만 보여주는 옵션입니다.
  - -p: patch를 만듭니다
  - -m: Diff Formatting 옵션입니다. merge commit들의 diff를 full로 보여줍니다.
  - —pretty: 커밋 로그를 주어진 param값에 맞추어 보여줍니다. oneline, short, medium, full, fuller, email, raw, format:$string and tformat:$string 중 하나의 값이 올 수 있습니다.
  - —stat: diffstat을 만듭니다.
  - —binary: output a binary diff that can be applied with git-apply
- `git am`
  - —directory: filename에 주어진 prefix를 붙입니다. (directory 위치 변경)
  - -3: patch가 깨끗하게 적용이 되지 않았을 때, 3-way merge를 통해 재 적용합니다.
  - —keep-non-patch: git의 mail info에 대해 -b 옵션을 전달합니다. 이는 PATCH를 포함한 bracket 짝이 있을 때에만 stripping합니다.
  - —ignore-whitespace: ignore changes in whitespace in context lines if necessary
    - 참고 이미지
      ![[그림 2] 출처: The GitHub Blog](./github-diff.png)

## 결론

지금까지 Monorepo의 특징을 살펴보고 lerna, git log, git am을 통해 Code Base까지 조합했습니다. 결과는 두 가지로 정리할 수 있습니다.

1. `lerna import`를 할 수 있는 패키지는 `lerna import`를 사용한다.
2. `lerna import`를 할 수 없는 패키지는 `git log`를 이용하여 패치 파일을 만들고 `git am`을 이용하여 해당 패치 파일을 적용한다.

위와 같이 진행하니 약 3,800개의 커밋이 누락되었습니다. merge commit이 제외된 것도 포함한 수치입니다. 하지만 마지막 상태가 같고 최근 커밋은 모두 보존되어 레포지토리를 합치는 데에는 문제가 없었습니다. 개발 업무에 모노레포 도입이 필요하신가요? 아니면 깔끔하게 Git history를 보존하고 싶으신가요? 어떤 경우든 이번 글이 분명 업무 환경 개선에 도움이 될 겁니다.

## 참고

(a) 이 글에서는 javascript만 사용하는 프로젝트를 다루므로 Multi Language Monorepo 관리 자료는 아래 URL에서 참고할 수 있다. [https:// github.com/korfuri/awesome-monorepo](https://github.com/korfuri/awesome-monorepo)

(b) '조합(組合)'은 '여럿을 한데 모아 한 덩어리로 짬.'을 뜻하고, '결합(結合)'은 '둘 이상의 사물이나 사람이 서로 관계를 맺어 하나가 됨.'을 뜻한다. 본문에서는 두 목록을 합쳐 하나의 새로운 목록을 구성하였으므로 그 문맥상 '조합'으로 표기한다.

## 참고문헌

**논문 및 학술자료**

1. Gleison Brito ・ Ricardo Terra ・ Marco Tulio Valente, <Monorepos: A Multivocal Literature Review>, 6th Brazilian Workshop on Software Visualization, Evolution and Maintenance (VEM), 2018. p.1.

**웹사이트**

- Monorepo Advantages, Wikipedia, [https:// en.wikipedia.org/wiki/Monorepo#Advantages](https://en.wikipedia.org/wiki/Monorepo#Advantages) 참조. (2019.07.12)
- Trouble importing project in lerna, stack overflow, [https:// stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna](https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna) 참조. (2019.07.12)
- View Git Patch Files In Color With This Script, malloc.co, [http:// www.malloc.co/git/view-git-patch-files-in-color-with-this-script/](http://www.malloc.co/git/view-git-patch-files-in-color-with-this-script/) 참조. (2019.07.12)
- Ignore white space in code review, The GitHub Blog, [https:// github.blog/2018-05-01-ignore-white-space-in-code-review/](https://github.blog/2018-05-01-ignore-white-space-in-code-review/) 참조. (2019.07.12)
