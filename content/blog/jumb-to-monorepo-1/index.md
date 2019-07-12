---
title: Jump to MONOREPO(with typescript) - 1
date: "2019-07-12T22:12:03.284Z"
thumbnail: "/images/thumbnails/monorepo.png"
description: ""
author: "김요한"
tags: ["typescript", "monorepo"]
---


이번 포스트에서는 Monorepo를 도입하게된 계기와 Monorepo의 장단점, Git history를 보존한 채 repo를 합치는 방법에 대해 다루도록 하겠습니다. Monorepo를 이용하여 개발 생산성을 높인 사례, 적절한 CI/CD를 구성한 사례 등에 대해선 후속 포스트에서 다루도록 하겠습니다.

# Monorepo란?

Monorepo란 모든 프로젝트의 코드를 하나의 레포지토리에서 관리하는 기법으로 구글, 페이스북, 마이크로소프트와 같은 IT기업에서 사용하고 있는 레포지터리 관리 기법입니다.

## 장점

### 코드의 재사용

여러 레포지토리에서 프로젝트를 진행하다 보면 비슷한 로직을 각 레포지토리에서 중복구현하는 경우가 많습니다. 공통 로직들을 재작성하지 않고 공유하기 위해서는 레포지토리를 추가하고 이에 해당하는 의존성을 추가해주어야 합니다. 다른 레포의 의존성을 추가하는 것은 같은 레포의 다른 패키지의 의존성을 추가하는 것보다 많은 비용을 필요로 합니다.

### 의존성 관리

Class101에서는 Code Formatting을 위해 prettier, Code Linting을 위해 tslint를 사용하고 있습니다. 기존, 멀티레포 구조에서는 각 레포에 prettier, tslint를 각각 설치해주어야 했습니다. 이에 대한 버전 업데이트를 진행하기 위해서 각 레포를 Cloning하고 일일이 업데이트하는 과정을, 모노레포와 함께라면 거치지 않아도 됩니다.

### 작은 커밋과 PR

여러 레포에서의 변경사항이 필요한 경우 작은 커밋으로 나누어 PR을 보내는 것 보다 모든 코드를 작성하고 이에 대한 의존성만 바꾸어주는 식의 작업방식을 선호하게 됩니다. 그러나 모노레포에서는 여러 패키지의 변경사항을 하나의 커밋과 PR로 제출할 수 있어 더 작게 나누어 작업할 수 있게 됩니다. (그렇지만 하나의 커밋에는 한 패키지의 변경사항만 기록하는 SRP를 지키도록 합시다.)

### 대규모 리팩토링

모노레포로 레포지터리를 운영해보니 하나의 파일에 대한 컨트리뷰터가 상당히 많아지게 되었습니다. 해당 로직을 이해하는 사람이 다수이다 보니 여러 사람이 효율적인 로직 작성 방식에 대해 함께 생각할 수 있었습니다. 이와 같은 멘탈 모델 얼라인을 통해 다방면으로 리팩토링을 유도할 수 있었습니다.

### 팀 간 협업

모든 구성원이 모든 코드에 접근할 수 있어 팀간 협업이 보다 자유롭습니다.

### Trunk Based Development

Class101에서는 Master브랜치를 항상 배포가능한 브랜치로 유지하는 Trunk Based Development를 실천하고 있습니다. Monorepo에서는 서버와 웹을 합쳐 하나의 버전으로 생각할 수 있기 때문에 Trunk Based Development를 실천하는 데에도 도움이 됩니다.

# Class101에서의 Monorepo 필요성

## GraphQL, TypeScript

### Schema Synchronization

Class101에서는 모든 코드를 TypeScript로 작성하고 있습니다. 또한 Apollo Server와 type-graphql을 이용하여 GraphQL기반 API를 작성하고 있어 GraphQL 스키마를 TypeScript 인터페이스로 변환하는 과정이 개발 프로세스에 있어 필수적입니다. 이 과정을 Class101에서는 `Schema Sync` 라고 부릅니다. 기존에는 스테이징 서버에서 제공하주는 `schema.gql` 파일을 이용하여 `Schema Sync` 를 진행하였습니다. 이는 스테이징 서버가 업데이트되기 전에 Schema를 변경하거나 이를 사용하는 웹앱에서 Fragment를 변경하게 되면 찐빠가 날 위험성이 있었습니다. 모노레포에서는 서버 코드 변경시에 코드를 기반으로 `Schema Sync` 를 실행할 수 있어 이러한 위험성을 제거할 수 있었습니다.

## Testing

Cypress, Pupeeter등을 이용하여 E2E 테스트를 실행한다고 가정해 봅시다. 배포가능함을 보장하기 위해선 서버가 변경됐을 때도, 웹이 변경됐을 때도 E2E 테스트를 실행해야 합니다. 멀티레포에서는 하나의 Testing레포를 만들거나 각각의 레포에 E2E테스트를 중복구현해 주어야 합니다.

이 외에도 모노레포와 함께라면 쉽게 해결할 수 있는 문제들이 많았습니다.

# Code Base 합치기

이 포스트에서는 javascript만 사용하는 프로젝트를 다룹니다. Multi Language Monorepo 관리에 대한 자료는 [https://github.com/korfuri/awesome-monorepo](https://github.com/korfuri/awesome-monorepo) 이 레포지터리를 참고해보세요!

## Git history를 보존하는 것이 중요한 이유

기능 개발을 하다가 기존의 기능을 함께 이용하는 경우에 가장 많이 하게되는 질문은 *이거 왜 이렇게 개발했어?* 입니다. 흔히들 **Blame**이라고 하죠. 이런 Blame에 대한 기록이 모두 사라지는 것은 커뮤니케이션 비용을 단기간 급격히 증가시킵니다. 이러한 부작용을 겪지 않기 위해 Git history를 모두 보존해야 했습니다.

## with lerna

lerna에서는 `import` 라는 커맨드가 존재합니다. 다음과 같은 폴더 구조를 가진 프로젝트를 가정해 봅시다.

    package-1/
      package.json
    my-lerna-repo/
      package.json
      packages/
        package-2/
          package.json

이와 같은 상황에 package-1을 my-lerna-repo/에 추가하고 싶다면 `import` 커맨드를 사용하면 됩니다.

    # cd my-lerna-repo
    lerna import ../package-1

만약 다음과 같은 에러가 나타난다면 flatten 옵션을 주어 실행하면 됩니다.

    # https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna
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

### 단점

실제로 `lerna import` 커맨드를 사용하게 되면 모든 것이 해결되는 상황은 흔치 않습니다. flatten 옵션을 주어도 마찬가지지요. 이는 초기에 프로젝트를 진행할 때 Merge, Rebase, Force Push등을 하며 올바르지 않은 변경사항이 강제로 합쳐진 경우가 있기 때문입니다. 이 경우엔 다음과 같은 에러를 마주하게 됩니다.

    # https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna
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

## git log & git am

위와 같은 단점을 해결하기 위해 다른 해결책을 모색해야 했습니다. 클래스101의 테크리드, 조이의 도움으로 `git log` 와 `git am` 을 이용한다면 이를 해결할 수 있다는 것을 알게 되었습니다. `git am` 은 대화식으로 patch apply 과정을 진행할 수 있기 때문이죠.

### `git log`

terminal에서 `man git-log` 를 이용하면 매우 다양한 옵션이 있음을 알 수 있습니다. 그 중에서도 `-p` 옵션을 사용하면 다음 그림과 같은 patch파일을 만들 수 있었습니다.

![](Untitled-dcf20ef5-e1a4-4243-b620-3d3b3deabe14.png)

### `git am`

`git am` 을 이용하여 `git log` 를 통해 만들어진 패치파일을 Monorepo 폴더에서 적용할 수 있었습니다. 역시나 다양한 옵션을 사용하였고 

### 실제 사용한 커맨드

    # in web folder
    git log --reverse --first-parent -p -m --pretty=email --stat --binary HEAD > class101-web.patch
    
    # in mono folder
    git am --directory packages/web ../class101-web/class101-web.patch -3 --keep-non-patch --ignore-whitespace

### options

- `git log`
    - —reverse: git log 실행시 최근 커밋이 아닌 최초 커밋부터 기록을 확인하기 위해 사용한 옵션입니다.
    - —first-parent: merge commit에 대해 첫번째 부모 커밋만 보여주는 옵션입니다.
    - -p: patch를 만듭니다
    - -m: Diff Formatting 옵션입니다. merge commit들의 diff를 full로 보여줍니다.
    - —pretty: 커밋 로그를 주어진 param값에 맞추어 보여줍니다. oneline, short, medium, full, fuller, email, raw, format:<string> and tformat:<string> 중 하나의 값이 올 수 있습니다.
    - —stat: diffstat을 만듭니다.
    - —binary: output a binary diff that can be applied with git-apply
- `git am`
    - —directory: filename에 주어진 prefix를 붙입니다. (directory 위치 변경)
    - -3: patch가 깨끗하게 적용이 되지 않았을 때, 3-way merge를 통해 재 적용합니다.
    - —keep-non-patch: git의 mail info에 대해 -b 옵션을 전달합니다. 이는 PATCH를 포함한 bracket 짝이 있을 때에만 stripping합니다.
    - —ignore-whitespace: ignore changes in whitespace in context lines if necessary
        - 참고 이미지

        ![](Untitled-e78fee7b-e454-40e4-a518-78abead5c80e.png)

## Solution Summary

1. `lerna import` 가 가능한 패키지에 대해선 `lerna import` 를 사용한다.
2. `lerna import` 가 불가능한 패키지에 대해선
    1. `git log` 를 이용하여 패치 파일을 만들고
    2. `git am` 을 이용하여 해당 패치 파일을 적용한다.

## 결과

약 3800개 정도의 커밋이 누락되었습니다. (이는 merge commit이 제외된 것도 포함된 수치입니다.) 그러나 마지막 상태가 같고 최근 커밋은 모두 보존되어 Repository를 합치는 데에는 큰 문제가 없었습니다.

## References

monorepo advantages - [https://en.wikipedia.org/wiki/Monorepo](https://en.wikipedia.org/wiki/Monorepo)

import error log - [https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna](https://stackoverflow.com/questions/52119818/trouble-importing-project-in-lerna)

patch file 이미지 - [http://www.malloc.co/git/view-git-patch-files-in-color-with-this-script/](http://www.malloc.co/git/view-git-patch-files-in-color-with-this-script/)

hide whitespace changes 이미지 - [https://github.blog/2018-05-01-ignore-white-space-in-code-review/](https://github.blog/2018-05-01-ignore-white-space-in-code-review/)