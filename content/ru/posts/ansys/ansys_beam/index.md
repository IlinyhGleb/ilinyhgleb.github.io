+++
date = '2025-09-19T08:00:00+05:00'
draft = false
title = 'Расчёт балочных/стержневых конструкций в ANSYS Workbench Mechanical'
math = true
tags = ["Ansys", "Ansys Mechanical", "МДТТ", "Теория упругости"]
categories = ['raschetnye-programmnye-kompleksy']
courses = ['raschetnye-programmnye-kompleksy']
+++

<!--more-->

Рассмотрим расчёты балочных/стержневых конструкций в приложении ANSYS Mechanical, запускаемом через оболочку Workbench.


## Подготовка проекта

Проект будет включать расчёт балки с двумя видами граничных условий и расчёт фермы. 
Обе задачи будут основаны на одном и том же материале.

Добавим все необходимые блоки

{{< media/video src="/videos/ansys/wb3/add_blocks.mp4" width="800" >}}

Переименуем блоки

{{< media/video src="/videos/ansys/wb3/rename_blocks.mp4" width="800" >}}

## Материалы

В качестве материала модели будем использовать стандартный материал Structural Steel

## Расчёт балки

### Геометрия

- Геометрию можно создать в приложении *Design Modeler*, приложении *SpaceClaim*, или импортировать из другой CAD-системы.

Создадим макет (Sketch) линейного тела с помощью приложения *Design Modeler*

{{< media/video src="/videos/ansys/wb3/create_beam_dm.mp4" width="800" >}}

На основе макета создадим линейное тело

{{< media/video src="/videos/ansys/wb3/line_by_sketch.mp4" width="800" >}}

Добавим сечение балки и назначим его линейному телу

{{< media/video src="/videos/ansys/wb3/create_cross_section.mp4" width="800" >}}

### Конечно-элементная сетка

Закроем *Design Modeler* и откроем приложение *Mechanical*

{{< media/video src="/videos/ansys/wb3/close_dm_open_mechanical.mp4" width="800" >}}

Создадим конечно-элементную сетку с указанием количества разбиений:

{{< media/video src="/videos/ansys/wb3/create_mesh.mp4" width="800" >}}

В данном случае сечение двутавра оказалось в горизонтальном положении, повернём линию и, соответственно, сечение на 90 градусов

{{< media/video src="/videos/ansys/wb3/rotate_line.mp4" width="800" >}}

### Расчёт консольной балки

#### Граничные условия

Добавим ограничение всех степеней свободы *Fixed support* для левой точки балки

{{< media/video src="/videos/ansys/wb3/fixed_support.mp4" width="800" >}}

#### Нагрузка

Добавим распределённую нагрузку *Line pressure*

{{< media/video src="/videos/ansys/wb3/add_line_pressure.mp4" width="800" >}}

#### Расчёт

Запустим расчёт

{{< media/video src="/videos/ansys/wb3/solve.mp4" width="800" >}}

Добавим результаты в виде перемещений

{{< media/video src="/videos/ansys/wb3/add_results_displacements.mp4" width="800" >}}

Добавим результаты в виде поперечной силы и изгибающего момента

{{< media/video src="/videos/ansys/wb3/add_shear_force_moment.mp4" width="800" >}}

Обновим все результаты

{{< media/video src="/videos/ansys/wb3/update_results.mp4" width="800" >}}


### Расчёт шарнирно-опёртой балки

В следующем блоке добавим граничные условия и нагрузку для расчёта шарнирно-опёртой балки. При этом геометрия и сетка останутся прежними.

#### Граничные условия

Добавим ограничение степеней свободы на левый шарнир с помощью инструмента *Remote displacement*

{{< media/video src="/videos/ansys/wb3/left_joint.mp4" width="800" >}}

из шести степеней свободы мы оставили только поворот вокруг оси **Z** (в плоскости **XY**)

Для правого шарнира создадим аналогичное ограничение, но с возможностью перемещаться вдоль балки , т.е. по оси **X**

{{< media/video src="/videos/ansys/wb3/right_joint.mp4" width="800" >}}

#### Нагрузка

Нагрузку, а также инструменты постпроцессинга скопируем из предыдущей задачи

{{< media/video src="/videos/ansys/wb3/copy_load_post.mp4" width="800" >}}

#### Расчёт

Запустим расчёт

{{< media/video src="/videos/ansys/wb3/solve2.mp4" width="800" >}}


## Расчёт фермы

### Геометрия

Создадим макет (Sketch) фермы с помощью приложения *Design Modeler*. 
Создадим равносторонний треугольник

{{< media/video src="/videos/ansys/wb3/create_triange.mp4" width="800" >}}

На основе треугольника дорисуем оставшуюся часть фермы

{{< media/video src="/videos/ansys/wb3/create_rest_farm.mp4" width="800" >}}

Создадим линейное тело фермы

{{< media/video src="/videos/ansys/wb3/create_line_body_farm.mp4" width="800" >}}

Добавим сечение балки и назначим его линейному телу

{{< media/video src="/videos/ansys/wb3/create_cross_section_2.mp4" width="800" >}}


### Конечно-элементная сетка

Закроем *Design Modeler* и откроем приложение *Mechanical*

{{< media/video src="/videos/ansys/wb3/close_dm_open_mechanical_2.mp4" width="800" >}}

Укажем, что тело имеет тип *Link/Truss*, в таком случае оно будет разбито на стержневые элементы, которые имеют три степени свободы - перемещения по трём осям, а тело будет работать только на растяжение/сжатие, но не на изгиб

{{< media/video src="/videos/ansys/wb3/set_truss_option.mp4" width="800" >}}

Создадим конечно-элементную сетку с указанием количества разбиений:

{{< media/video src="/videos/ansys/wb3/farm_mesh.mp4" width="800" >}}

в данном случае важно указать, чтобы каждый элемент фермы был разбит на один конечный элемент сетки

#### Граничные условия

Добавим ограничение степеней свободы на левый шарнир с помощью инструмента *Displacement*

{{< media/video src="/videos/ansys/wb3/farm_left_joint.mp4" width="800" >}}

В данном случае можно не использовать инструмент *Remote displacement*, т.к. вращательных степеней свободы в узлах элементов нет

На основе ограничений левого шарнира создадим ограчения правого шарнира с учётом возможности перемещения по оси **X**

{{< media/video src="/videos/ansys/wb3/farm_right_joint.mp4" width="800" >}}


#### Нагрузка

Добавим сосредоточенные силы к шарнирам верхнего пояса

{{< media/video src="/videos/ansys/wb3/farm_add_force.mp4" width="800" >}}


#### Расчёт

Включим опцию сохранения результатов для сечения для получения данных о напряжениях после расчёта

{{< media/video src="/videos/ansys/wb3/beam_section_results.mp4" width="800" >}}

Добавим элементы постпроцессинга

{{< media/video src="/videos/ansys/wb3/farm_add_results.mp4" width="800" >}}

Запустим расчёт

{{< media/video src="/videos/ansys/wb3/farm_solve.mp4" width="800" >}}


## Задачи для самостоятельного решения

1. Проведите расчёт консольной балки с изгибающим моментом на свободном конце (инструмент нагрузки *moment*). Сечение Двутавр №12 ГОСТ 8239-89
2. Проведите расчёт произвольной треугольной фермы





