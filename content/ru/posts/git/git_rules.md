+++
date = '2025-12-23T08:00:00+05:00'
draft = true
title = 'Правила работы с репозиторием GIT'
math = true
tags = ["GIT"]
categories = ['Разработка проектов']
+++

<!--more-->


## Ветки. Именования, правила
- main - ветка с production-версией проекта. В эту ветку нельзя пушить.
- dev - ветка с development-версией проекта. В эту ветку нельзя пушить.
- f/... - feature-ветки с новой функциональностью.

## Коммиты. Именование
\<type\>(\<scope\>): \<description\>
<тип>(<область>): <описание>

### Типы:
- feature - добавление новой фунциональности
- fix - исправление ошибки
- refactor - изменение без изменения поведения
- docs - изменение документации (README, wiki, API docs, changelog)
- style - изменение стиля кода (inline-комментарии, отступы, точки с запятой, переноси и т.д.)
- test - добавление теста, изменения в тестах (в том числе те, что можно классифицировать по другим типам)
- chore - вспомогательные задачи (сборка, зависимости, конфиги)
- revert - отмена предыдущего коммита
- ci - изменение в ci/cd конфигурации

При создании теста вместе с новой фунциональностью, можно коммитить

## Области

core — основная бизнес-логика проекта, ключевые модули и базовые компоненты

release — релизы, версии, changelog, теги, подготовка к выпуску

repo — изменения на уровне репозитория (структура, .gitignore, meta-файлы)

deps — зависимости проекта (добавление, обновление, удаление библиотек, submodules)

build — сборка проекта и инструменты (CI/CD, webpack, vite, make, scripts)

frontend — клиентская часть, UI, стили, браузерная логика

posts — контент: статьи, посты, Markdown-файлы блога

backend — серверная часть, API, бизнес-логика на стороне сервера

git — настройки и управление Git (hooks, submodules, workflows, ignore rules)

feat(core): add new method to A (update B, C, D)
chore(release): bump version to 1.3.0


Для изменений в глобальном .gitignore, который относится ко всему проекту, лучше всего использовать общий scope, а не что-то конкретное.

chore(repo): update .gitignore

## Использование TODO


Примеры: 
chore(repo): update .gitignore

refactor(repo): reorganize project file structure

Работа с зависимостями → chore(deps)

chore(deps): remove unused js dependency
chore(deps): remove jquery dependency
chore(deps): drop react dependency

chore(build): remove js dependency from build config
chore(frontend): remove js dependency

если добавляется контент, то лучше создать дополнительный тэг - content
content(posts): add new article about git commits

content не входит в строгий стандарт Conventional Commits,
но широко используется в блогах, docs-репозиториях, knowledge bases и вполне оправдан.

если хочешь оставаться строго в conventional commits
Тогда используй docs, потому что Markdown-посты — это документация/текст:
docs(posts): add article about git rebase

Scope для блога

Хорошие варианты:
posts
blog
articles
content
2025 (если группируешь по годам)
тема поста (git, python, devops)

content(posts): add article about git history cleanup
content(git): add post about rebase vs merge
docs(blog): add post about commit conventions

content(posts): add new blog post
docs(blog): add post about X
