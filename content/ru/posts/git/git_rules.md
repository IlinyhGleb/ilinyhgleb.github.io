+++
date = '2026-11-12T08:00:00+05:00'
draft = false
title = 'Правила работы с репозиторием GIT'
tags = ["GIT"]
categories = ['Разработка проектов']
+++

<!--more-->

## Ветки. Именования, правила
- `main` - ветка с *production* версией проекта. 
	- В эту ветку нельзя пушить. 
	- Изменения вносятся через **pull-request** из ветки `dev`
- `dev` - ветка с *development* версией проекта. 
	- В эту ветку нельзя пушить. 
	- Изменения вносятся через **pull-request** из веток `f/...`
- `f/...` - feature-ветки с новой функциональностью. 
	- В ветки можно пушить. 
	- Ветка удаляется сразу после слияния с веткой `dev`
- `fix/...` - ветки для исправления ошибок.
	- Ответвляются от `dev`.
	- Вносят только исправления без добавления новой функциональности.
	- После слияния в `dev` ветка удаляется.

## Коммиты. Именование
Сообщение коммита записывается в виде:

`type`(`scope`): `description`

`тип`(`область`): `описание`

### Тип
**Примечание:** Нажми на элемент списка чтобы увидеть примеры

{{<details summary="`feature` - добавление новой фунциональности">}}
	feature(core): add new method	
	feature(core): add logging mechanism
	feature(backend): implement user registration endpoint
	feature(frontend): add search component
	feature(build): add docker support
	feature(git): add commit message template
{{</details>}}
{{<details summary="`fix` - исправление ошибки:">}}
	fix(core): handle None value in parser
	fix(backend): correct response status code
	fix(frontend): fix button alignment issue
	fix(git): resolve submodule update error
{{</details>}}
{{<details summary="`refactor` - изменение в проекте без изменения поведения">}}
	refactor(repo): reorganize project file structure
{{</details>}}
{{<details summary="`docs` - изменение документации (README, wiki, API docs, changelog)">}}
	docs(repo): update README
	docs(build): update site build guide
	docs(git): add branching strategy description
	docs(posts): fix typo in article
{{</details>}}
{{<details summary="`style` - изменение стиля кода (inline-комментарии, отступы, точки с запятой, переноси и т.д.), без изменения поведения">}}
	style(core): format code with black
	style(frontend): remove unused imports
	style(test): align indentation in tests
	style(repo): fix markdown formatting
{{</details>}}
{{<details summary="`test` - добавление теста, изменения в тестах (в том числе те, что можно классифицировать по другим типам)">}}
	test(core): add unit tests for parser
	test(backend): add api integration test
	test(frontend): update component snapshot
	test(repo): configure pytest markers
{{</details>}}

**Примечание:** При создании теста вместе с новой фунциональностью, можно коммитить под типом `feature`.

{{<details summary="`chore` - вспомогательные задачи (сборка, зависимости, конфиги)">}}
	chore(repo): update .gitignore
	chore(deps): remove unused js dependency
	chore(deps): remove jquery dependency
	chore(deps): drop react dependency
	chore(build): remove js dependency from build config
	chore(frontend): remove js dependency
	chore(release): bump version to 1.3.0
{{</details>}}
{{<details summary="`revert` - отмена предыдущего коммита">}}
	revert "feature(core): add new method"
	revert(frontend): revert button redesign
{{</details>}}
{{<details summary="`ci` - изменение в ci/cd конфигурации">}}
	ci(build): add github actions workflow
	ci(repo): update ci pipeline config
	ci(test): add coverage report step
{{</details>}}
{{<details summary="`content` - изменение наполнения проекта (посты, статьи, содержание страниц)">}}
	content(posts): add article about git history cleanup
	content(git): add post about rebase vs merge
	content(posts): add new blog post
	content(posts): add new article about git commits
{{</details>}}

**Примечание:** В одном коммите используется только один тип.

## Область
{{<details summary="`core` — основная бизнес-логика проекта, ключевые модули и базовые компоненты">}}
	feature(core): add validation layer
	refactor(core): simplify data model
	fix(core): prevent division by zero
{{</details>}}
{{<details summary="`repo` — изменения на уровне репозитория (структура, .gitignore, meta-файлы)">}}
	refactor(repo): reorganize project structure
	chore(repo): update .gitignore
	docs(repo): update contributing guide
{{</details>}}
{{<details summary="`release` — релизы, версии, changelog, теги, подготовка к выпуску">}}
	chore(release): bump version to 1.4.0
	docs(release): update changelog
	release: prepare v1.4.0
{{</details>}}
{{<details summary="`deps` — зависимости проекта (добавление, обновление, удаление библиотек, submodules)">}}
	chore(deps): update requests dependency
	chore(deps): remove unused js dependency
	chore(deps): bump theme submodule
{{</details>}}
{{<details summary="`build` — сборка проекта и инструменты (CI/CD, webpack, vite, make, scripts)">}}
	build: update webpack configuration
	chore(build): optimize build script
	docs(build): update build instructions
{{</details>}}
{{<details summary="`frontend` — клиентская часть, UI, стили, браузерная логика">}}
	feature(frontend): add dark mode
	fix(frontend): fix layout overflow
	refactor(frontend): split ui components
{{</details>}}
{{<details summary="`posts` — контент: статьи, посты, Markdown-файлы блога">}}
	content(posts): add new blog post
	docs(posts): fix typo in article
	refactor(posts): reorganize post categories
{{</details>}}
{{<details summary="`backend` — серверная часть, API, бизнес-логика на стороне сервера">}}
	feature(backend): add authentication endpoint
	fix(backend): handle invalid token
	refactor(backend): extract service layer
{{</details>}}
{{<details summary="`git` — настройки и управление Git (hooks, submodules, workflows, ignore rules)">}}
	chore(git): update submodule reference
	docs(git): describe merge strategy
	fix(git): resolve rebase conflict
{{</details>}}

**Примечание:** В одном коммите используется только одна область. Если коммит затрагивает больше областей, то нужно повысить уровень области, вплоть до `repo`.

## Описание
Сообщение коммита объясняет, что конкретный коммит (а не автор коммита) изменяет в репозитории. 

Поэтому описание пишется в обезличенной форме в виде:

`глагол` + `существительное`

- `глагол` - в настоящем времени в третьем лице в несовершенном виде
- `существительное` - в винительном падеже
- описание начинается со строчной буквы
- точка в конце не ставится

Примеры см. в предыдущих разделах

Данные правила написаны в частичном соответствии со спецификацией [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)