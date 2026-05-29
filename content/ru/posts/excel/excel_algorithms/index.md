+++
date = '2026-05-25T08:00:00+05:00'
title = 'Электронные таблицы. Основы алгоритмизации'
tags = ["informatika", "Excel", "Алгоритм"]
categories = ["informatika"]
courses = ["informatika"]
+++


<!--more-->

## Определение алгоритма

**Алгоритм**
: — чётко определённая последовательность операций, выполняемых при решении задачи

Формы представления алгоритма:
1. Словесное описание
2. Пронумерованный список действий
3. Математические формулы
4. Графическая форма (блок-схема)

### Пример

Расмотрим пример.

**Задача:** посчитать площадь круга по известной длине окружности

Напишем алгоритм решения данной задачи в различных формах представления:

#### 1. **Словестное** представление алгоритма:
Для того, чтобы посчитать площадь круга, необходимо вычислить радиус как длину, поделённую на \(2 \pi\). Затем нужно возвести радиус в квадрат и умножить на \(\pi\).

#### 2. Представление алгоритма в виде **пронумерованного списка** действий:
   1. Вычисляем радиус из формулы длины окружности.
   2. Вычисляем площадь круга через известный радиус.

#### 3. Представление алгоритма в виде **математических формул**:
$$L=2\pi r  \implies r=L / 2\pi$$
$$S=\pi r^2=\pi (L / 2\pi)^2$$

#### 4. Представление алгоритма в виде **блок-схемы**:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center, text width=2.8cm},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, text width=3.0cm, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, text width=2.8cm, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}[shorten >=1pt,node distance=5cm,on grid,auto] 
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [data] at (2.5,-1.5) (input) {Ввод длины окружности $L$};
		\node [process] at (5,0) (process1) {Вычисление \\ радиуса $r=L / 2\pi$};
		\node [process] at (7.5,-1.5) (process2) {Вычисление площади $S=\pi r^2$};
		\node [data] at (10.0,0) (output) {Вывод площади $S$};
		\node [terminator] at (12.5,-1.5) (end) {\textbf{Конец}};

		\path [connector] (start) -- (input);
		\path [connector] (input) -- (process1);
		\path [connector] (process1) -- (process2);
		\path [connector] (process2) -- (output);
		\path [connector] (output) -- (end);
	\end{tikzpicture}
{{< /tikz >}}

#### Самостоятельное задание

Реализуйте вычисление данного алгоритма в электронных таблицах

## Типы алгоритмов 

### Линейные алгоритмы

**Линейный алгоритм**
: — алгоритм, в котором действия выполняются последовательно и однократно
	

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}[shorten >=1pt,node distance=5cm,on grid,auto] 
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [process] at (2.5,0) (process1) {Действие 1};
		\node [process] at (5,0) (process2) {Действие 2};
		\node [process] at (7.5,0) (process3) {Действие 3};
		\node [terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (process1);
		\path [connector] (process1) -- (process2);
		\path [connector] (process2) -- (process3);
		\path [connector] (process3) -- (end);
	\end{tikzpicture}
{{< /tikz >}}

В начале будет выполнен блок **Действие 1**, затем **Действие 2**, затем **Действие 3**. 
Каждый блок выполняется один раз и только после выполнения предыдущего.


### Ветвящиеся алгоритмы

**Ветвящийся алгоритм**
: — алгоритм, в котором в зависимости от условия выполняется либо одна, либо другая последовательность (ветвь) действий

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [decision,text width=1.2cm,align=center] at (2.5,0) (decision) {Условие\\ верно?};
		\node[draw=none] at (3.25,1.75) (yes) {Да};
		\node[draw=none] at (3.25,-1.75) (no) {Нет};
		\node [process, fill=red!20] at (5,-1.5) (process4) {Действие 3};
		\node [process] at (5,1.5) (process2) {Действие 1};
		\node [process] at (7.5,1.5) (process3) {Действие 2};
		\node [terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (decision);
		\path [connector] (decision) |- (process2);
		\path [connector] (decision) |- (process4);
		\path [connector] (process2) -- (process3);
		\path [connector] (process3) -| (end);
		\path [connector] (process4) -| (end);
	\end{tikzpicture}
{{< /tikz >}}

В начале алгоритма будет проверено **условие**, если условие верное (правда), то будут выполнены **Действие 1**, **Действие 2**, а **Действие 3** выполняться не будет. 
Если же условие неверное (ложь), то будет выполнено **Действие 3**, а **Действие 1** и **Действие 2** выполняться не будут.

Наборы действий:
1. **Действие 1**, **Действие 2**
2. **Действие 3**
называются **ветвями**, поэтому алгоритм, где есть две и более ветви, называется **ветвящимся алгоритмом**.


### Реализация ветвящихся алгоритмов в электронных таблицах

Для того, чтобы реализовать **ветвящийся алгоритм** необходимо использовать функцию **ЕСЛИ** или **ЕСЛИМН**.


 | **Функция** |                 **Описание**                 | **Пример**               |
 | :---------- | :------------------------------------------: | :----------------------- |
 | `ЕСЛИ`      | возвращает значение в зависимости от условия | `=ЕСЛИ(A2>4;5;7)`        |
 | `ЕСЛИМН`    | возвращает значение в зависимости от условий | `=ЕСЛИМН(A2>4;5;A2<3;8)` |

Реализация **ветвящегося алгоритма** с помощью функции `ЕСЛИ`:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		\node[align=left] at (5,2.75) (label) {\footnotesize{=ЕСЛИ(\colorbox{gray!20}{УСЛОВИЕ};\colorbox{green!20}{ЗНАЧЕНИЕ ЕСЛИ ПРАВДА};\colorbox{red!20}{ЗНАЧЕНИЕ ЕСЛИ ЛОЖЬ})}};
		\node[terminator] at (0,0) (start) {\textbf{Начало}};
		\node[decision,text width=1.2cm,align=center] at (2.5,0) (decision) {Условие\\ верно?};
		\node[draw=none] at (3.25,1.75) (yes) {Да};
		\node[draw=none] at (3.25,-1.75) (no) {Нет};
		\node[process, fill=red!20] at (6,-1.5) (process4) {Значение, если ложь};
		\node[process] at (6,1.5) (process2) {Значение, если правда};
		\node[terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (decision);
		\path [connector] (decision) |- (process2);
		\path [connector] (decision) |- (process4);
		\path [connector] (process2) -| (end);
		\path [connector] (process4) -| (end);
	\end{tikzpicture}
{{< /tikz >}}

#### Пример

Рассмотрим пример вычисления функции:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}

		\node[align=left] at (2.0,2.75) (label) {$\begin{cases} \colorbox{green!20}{$x^2$}, \quad \colorbox{gray!20}{$x \ge 0$} \\ \colorbox{red!20}{$\sin(x)$}, \quad x < 0 \end{cases}$};

		\node[terminator] at (0,0) (start) {\textbf{Начало}};
		\node[decision,text width=1.4cm,align=center] at (2.5,0) (decision) {$x\ge0$?};
		\node[draw=none] at (3.25,1.75) (yes) {Да};
		\node[draw=none] at (3.25,-1.75) (no) {Нет};
		\node[process, fill=red!20] at (6,-1.5) (process4) {Вычисляется $\sin{(x)}$};
		\node[process] at (6,1.5) (process2) {Вычисляется $x^2$};
		\node[terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (decision);
		\path [connector] (decision) |- (process2);
		\path [connector] (decision) |- (process4);
		\path [connector] (process2) -| (end);
		\path [connector] (process4) -| (end);

		\node[align=left] at (7.5,2.75) (label) {\normalsize{=ЕСЛИ(\colorbox{gray!20}{$x>=0$};\colorbox{green!20}{x\string^2};\colorbox{red!20}{$\sin(x)$})}};
	\end{tikzpicture}

{{< /tikz >}}

Если значение \(x\) хранится в ячейке `B1`, то формула будет `=ЕСЛИ(B1>=0;B1^2;SIN(B1))`

#### Самостоятельное задание

Реализуйте пример выше в электронных таблицах.

#### Самостоятельное задание

1. Нарисуйте блок-схему вычисления формулы


$$ y(x) = \begin{cases} e^{x-1}, \quad x \ge 1 \\ x, \quad x < 1 \end{cases} $$


2. Реализуйте расчёт формулы в электронных таблицах для диапазона значений \(x\).

#### Сложное условие

Сложное (составное) условие является ситуацией, когда одно условие встраивается в другое:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [decision,text width=1.4cm,align=center] at (2.5,0) (decision1) {Условие1\\ верно?};
		\node[draw=none] at (3.0,1.75) (yes) {Да};
		\node[draw=none] at (3.0,-1.75) (no) {Нет};
		\node [process] at (5,1.5) (process1) {ЕСЛИ ПРАВДА 1};
		\node [decision,text width=1.4cm,align=center] at (5,-1.5) (decision2) {Условие2\\ верно?};
		\node[draw=none] at (5.5,0.5) (yes) {Да};
		\node[draw=none] at (5.5,-3.5) (no) {Нет};
		\node [process] at (7.5,0.25) (process2) {ЕСЛИ ПРАВДА 2};
		\node [terminator] at (10,0.25) (end) {\textbf{Конец}};
		\node [process, fill=red!20] at (7.5,-3.25) (process3) {ЕСЛИ ЛОЖЬ};

		\path [connector] (start) -- (decision1);
		\path [connector] (decision1) |- (decision2);
		\path [connector] (decision1) |- (process1);
		\path [connector] (decision2) |- (process2);
		\path [connector] (decision2) |- (process3);
		\path [connector] (process1) -| (end);
		\path [connector] (process2) -- (end);
		\path [connector] (process3) -| (end);

		\node[align=left] at (5.0,2.75) (label) {\scriptsize{=ЕСЛИ(\colorbox{gray!20}{УСЛОВИЕ1};\colorbox{green!20}{ЕСЛИ ПРАВДА 1};
		ЕСЛИ(\colorbox{gray!20}{УСЛОВИЕ2};\colorbox{green!20}{ЕСЛИ ПРАВДА 2};\colorbox{red!20}{ЕСЛИ ЛОЖЬ}))}};
	\end{tikzpicture}
{{< /tikz >}}

Другой пример сложного двойного условия:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [decision,text width=1.2cm,align=center] at (2.5,0) (decision1) {Условие1\\ верно?};
		\node[draw=none] at (3.0,1.75) (yes) {Да};
		\node[draw=none] at (3.0,-1.75) (no) {Нет};
		\node [process, fill=red!20] at (5,-1.5) (process3) {ЕСЛИ ЛОЖЬ 1};
		\node [decision,text width=1.2cm,align=center] at (5,1.5) (decision2) {Условие2\\ верно?};
		\node[draw=none] at (5.5,3.25) (yes) {Да};
		\node[draw=none] at (5.5,-0.25) (no) {Нет};
		\node [process] at (7.5,3.0) (process1) {ЕСЛИ ПРАВДА};
		\node [terminator] at (10,0) (end) {\textbf{Конец}};
		\node [process, fill=red!20] at (7.5,0) (process2) {ЕСЛИ ЛОЖЬ 2};
	
		\path [connector] (start) -- (decision1);
		\path [connector] (decision1) |- (decision2);
		\path [connector] (decision1) |- (process3);
		\path [connector] (decision2) |- (process1);
		\path [connector] (decision2) |- (process2);
		\path [connector] (process1) -| (end);
		\path [connector] (process3) -| (end);
		\path [connector] (process2) -- (end);

		\node[align=left] at (5.0,3.75) (label) {\scriptsize{=ЕСЛИ(\colorbox{gray!20}{УСЛОВИЕ1};
			ЕСЛИ(\colorbox{gray!20}{УСЛОВИЕ2};\colorbox{green!20}{ЕСЛИ ПРАВДА};\colorbox{red!20}{ЕСЛИ ЛОЖЬ 2})
			;\colorbox{red!20}{ЕСЛИ ЛОЖЬ 1})}};
	\end{tikzpicture}
{{< /tikz >}}


Рассмотрим пример вычисления функции:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}

		\node[align=left] at (1.5,3.0) (label) {
			$\begin{cases} 
				\colorbox{green!20}{$0$}, \quad \colorbox{gray!20}{$x \le 0$} \\
				\colorbox{yellow!20}{$\cos(x-4)$}, \quad \colorbox{gray!40}{$x > 4$}  \\
				\colorbox{red!20}{$\frac{x}{4}$}, \quad x > 0, x \le 4
			 \end{cases}$};		
		
		\node [terminator] at (0,0) (start) {\textbf{Начало}};
		\node [decision,text width=1.4cm,align=center] at (2.5,0) (decision1) {$x\le0$?};
		\node[draw=none] at (3.0,1.75) (yes) {Да};
		\node[draw=none] at (3.0,-1.75) (no) {Нет};
		\node [process] at (5,1.5) (process1) {0};
		\node [decision,text width=1.4cm,align=center, fill=gray!40] at (5,-1.5) (decision2) {$x>4$?};
		\node[draw=none] at (5.5,0.5) (yes) {Да};
		\node[draw=none] at (5.5,-3.5) (no) {Нет};
		\node [process, fill=yellow!20] at (7.5,0.25) (process2) {$\cos(x-4)$};
		\node [terminator] at (10,0.25) (end) {\textbf{Конец}};
		\node [process, fill=red!20] at (7.5,-3.25) (process3) {$x/4$};

		\path [connector] (start) -- (decision1);
		\path [connector] (decision1) |- (decision2);
		\path [connector] (decision1) |- (process1);
		\path [connector] (decision2) |- (process2);
		\path [connector] (decision2) |- (process3);
		\path [connector] (process1) -| (end);
		\path [connector] (process2) -- (end);
		\path [connector] (process3) -| (end);

		\node[align=left] at (7.25,2.75) (label) {\scriptsize{=ЕСЛИ(\colorbox{gray!20}{$x<=0$};\colorbox{green!20}{$0$};ЕСЛИ(\colorbox{gray!40}{$x>4$};\colorbox{yellow!20}{$\cos(x-4)$};\colorbox{red!20}{$x/4$}))}};
	\end{tikzpicture}
{{< /tikz >}}

Если значение \(x\) хранится в ячейке `B1`, то формула будет `=ЕСЛИ(B1<=0;0;ЕСЛИ(B1>4;COS(B1-5);B1/4))`


#### Самостоятельное задание

Реализуйте пример из таблиц в электронных таблицах.

#### Самостоятельное задание

1. Нарисуйте блок-схему вычисления формулы


$$ z(x) = \begin{cases} -x-1, \quad x \le -1 \\ x-1, \quad x \ge 1 \\ -x^2+1, \quad x > -1, x < 1 \end{cases} $$


2. Реализуйте расчёт формулы в электронных таблицах для диапазона значений \(x\).


### Составное условие

В случае, если существует две ветви, но при этом используется составное условие (два и более условий), используются функции:


 | **Функция** |     **Название**     |                          **Описание**                           | **Пример**        |
 | :---------- | :------------------: | :-------------------------------------------------------------: | :---------------- |
 | `И`         | Логическое умножение |     Возвращает значение ИСТИНА, если все аргументы истинны      | `=И(A5>0;A5<5)`   |
 | `ИЛИ`       | Логическое сложение  | Возвращает значение ИСТИНА, если хотя бы один аргумент истинный | `=ИЛИ(A5>0;A5<5)` |

Данные функции можно использовать отдельно в ячейках для проверки условий. 

#### Использование составного условия

Примеры применения функций внутри функции `ЕСЛИ()`:

{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		\node[align=left] at (5,2.75) (label) {\footnotesize{=ЕСЛИ(И(\colorbox{gray!20}{УСЛОВИЕ1};\colorbox{gray!20}{УСЛОВИЕ2});\colorbox{green!20}{ЕСЛИ ПРАВДА};\colorbox{red!20}{ЕСЛИ ЛОЖЬ})}};
		\node[terminator] at (0,0) (start) {\textbf{Начало}};
		\node[decision,text width=1.6cm,align=left] at (2.5,0) (decision) {\footnotesize{Условие1 и\\Условие2\\ верны?}};
		\node[draw=none] at (3.25,2.0) (yes) {Да};
		\node[draw=none] at (3.25,-2.0) (no) {Нет};
		\node[process, fill=red!20] at (6,-1.75) (process4) {ЕСЛИ ЛОЖЬ};
		\node[process] at (6,1.75) (process2) {ЕСЛИ ПРАВДА};
		\node[terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (decision);
		\path [connector] (decision) |- (process2);
		\path [connector] (decision) |- (process4);
		\path [connector] (process2) -| (end);
		\path [connector] (process4) -| (end);
	\end{tikzpicture}
{{< /tikz >}}


{{< tikz >}}
	\tikzset{
		terminator/.style = {rectangle, draw, rounded corners, minimum height=2em, fill=blue!20, align=center},
		process/.style    = {rectangle, draw, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		decision/.style    = {diamond, draw, minimum height=2em, fill=gray!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		data/.style       = {trapezium, draw, trapezium left angle=60, trapezium right angle=120, minimum height=2em, fill=green!20, align=center, execute at begin node={\hyphenpenalty=10000\relax}},
		connector/.style  = {draw, -latex}
	}
	\begin{tikzpicture}
		\node[align=left] at (5,2.75) (label) {\footnotesize{=ЕСЛИ(ИЛИ(\colorbox{gray!20}{УСЛОВИЕ1};\colorbox{gray!20}{УСЛОВИЕ2});\colorbox{green!20}{ЕСЛИ ПРАВДА};\colorbox{red!20}{ЕСЛИ ЛОЖЬ})}};
		\node[terminator] at (0,0) (start) {\textbf{Начало}};
		\node[decision,text width=1.6cm,align=left] at (2.5,0) (decision) {\footnotesize{Условие1 или\\Условие2\\ верно?}};
		\node[draw=none] at (3.25,2.0) (yes) {Да};
		\node[draw=none] at (3.25,-2.0) (no) {Нет};
		\node[process, fill=red!20] at (6,-1.75) (process4) {ЕСЛИ ЛОЖЬ};
		\node[process] at (6,1.75) (process2) {ЕСЛИ ПРАВДА};
		\node[terminator] at (10,0) (end) {\textbf{Конец}};

		\path [connector] (start) -- (decision);
		\path [connector] (decision) |- (process2);
		\path [connector] (decision) |- (process4);
		\path [connector] (process2) -| (end);
		\path [connector] (process4) -| (end);
	\end{tikzpicture}
{{< /tikz >}}


Результаты различных комбинаций значений `ПРАВДА` (True, T) и `ЛОЖЬ` (False, F) представлены в **таблице истинности**:


{{< latex >}}
	\begingroup % Start local scope
		% Local shortcuts for background colors (vanish after \endgroup)
		\newcommand{\T}{\cellcolor{green!20} $T$}
		\newcommand{\F}{\cellcolor{red!20} $F$}

		% Optional: locally adjust row height & font size
		\renewcommand{\arraystretch}{1.15}
		\fontsize{16pt}{16pt}\selectfont

		\begin{tabular}{
			|>{\centering\arraybackslash}p{0.4cm}
			|>{\centering\arraybackslash}p{0.4cm}|
			|>{\centering\arraybackslash}p{1.4cm}
			|>{\centering\arraybackslash}p{2.4cm}
			|>{\centering\arraybackslash}p{3.6cm}
			|>{\centering\arraybackslash}p{2.8cm}
			|>{\centering\arraybackslash}p{3.6cm}|}
			\hline
			$A$ & $B$ & не $A$ & и $A$, и $B$ & или $A$, или $B$ & $A$ равно $B$ & $A$ не равно $B$ \\ \hline
			$A$ & $B$ & $-A$ & $A \& B$ & $A | B$ & $A==B$ & $A!=B$ \\ \hline
			$A$ & $B$ & $not~A$ & $A~and~B$ & $A~or~B$ & $A~is~B$ & $A~is~not~B$ \\ \hline
			\T & \T & \F & \T & \T & \T & \F \\ \hline
			\T & \F & \F & \F & \T & \F & \T \\ \hline
			\F & \T & \T & \F & \T & \F & \T \\ \hline
			\F & \F & \T & \F & \F & \T & \F \\ \hline
		\end{tabular}
	\endgroup % End local scope
{{< /latex >}}


Функция **НЕ**:

| **Функция** |    **Название**     |                                        **Описание**                                        | **Пример**  |
| :---------- | :-----------------: | :----------------------------------------------------------------------------------------: | :---------- |
| `НЕ`        | Логическая инверсия | Возвращает значение ИСТИНА, если аргумент ложный. Возвращает ЛОЖЬ, если аргумент правдивый | `=НЕ(A5>0)` |


Операции **РАВНО** и **НЕ РАВНО** реализуются с помощью операторов:

| **Операция** |        **Название**         |                                               **Описание**                                                | **Пример** |
| :----------- | :-------------------------: | :-------------------------------------------------------------------------------------------------------: | :--------- |
| `=`          |  логическая равнозначность  | Возвращает значение ИСТИНА, операнды равны друг другу. Возвращает ЛОЖЬ, если операнды не равны друг другу | `=A1=B1`   |
| `<>`         | логическая неравнозначность | Возвращает значение ИСТИНА, операнды не равны друг другу. Возвращает ЛОЖЬ, если операнды равны друг другу | `=B1<>5`   |

#### Самостоятельное задание

1. Реализуйте примеры из таблиц (`И`, `ИЛИ`, `НЕ`, `=`, `<>`) в электронных таблицах.
2. Реализуйте таблицу истинности в электронных таблицах.


### Задача **Попадание точки в область**

Отличной задачей для отработки навыков алгоритмизации явлется **задача попадания точки в область**.

Необходимо составить условие, которое возвращает `ИСТИНА`, если точка попадает внутрь фигуры или на её границу, в противном случае условие возвращает `ЛОЖЬ`. 

Иллюстрация такого условия на примере фигуры треугольника:

{{< tikz width="70%" >}}
	\begin{tikzpicture} 
		\datavisualization [school book axes, x axis=grid, y axis=grid, visualize as line/.list={area1,area2,area3},style sheet=strong colors,style sheet=vary dashing,
		area1={style={solid, line width=1.9pt,visualizer color=blue!50}}, %, 	label in legend={text=область 1}
		%area2={style={solid, line width=0.9pt,visualizer color=red!50}, label in legend={text=$area2$}},
		%area3={style={solid, line width=0.9pt,visualizer color=red!50}, label in legend={text=$points\_false$}},
		data/format=function]
		%data [format=function, set=area2] {var t : interval [180:270]; func x = 6 + 6 * cos(\value t); func y = 6 + 6 * sin(\value t);} 
		%data [set=area2] {var y : interval [0:6]; func x = 6;} 
		%data [set=area2] {var x : interval [0:6]; func y = 6;} 
		data [set=area1] {var x : interval [1:6]; func y = 1;} 
		data [set=area1] {var x : interval [1:6]; func y = -1*\value x + 7;} 
		data [set=area1] {var y : interval [1:6]; func x = 1;}; 
		info {\fill [red] (4,5) circle [radius=5pt];};
		info {\fill [red] (5,3) circle [radius=5pt];};
		info {\fill [red] (1,0.5) circle [radius=5pt];};
		info {\fill [red] (0.5,4) circle [radius=5pt];};
		info {\fill [green] (5,1) circle [radius=5pt];};
		info {\fill [green] (3,2) circle [radius=5pt];};
		info {\fill [green] (2,4) circle [radius=5pt];};
		info {\fill [green] (1,3) circle [radius=5pt];};
	\end{tikzpicture}
{{< /tikz >}}


|                                                      | **Формула**      |
| :--------------------------------------------------- | :--------------- |
| Координаты точки:                                    | \((x_d,y_d)\)    |
| Уравнение нижней линии:                              | \(y(x)=1\)       |
| Уравнение левой линии:                               | \(x(y)=1\)       |
| Уравнение гипотенузы:                                | \(y(x)=-x+7\)    |
| Условие попадания в точку относительно нижней линии: | \(y_d\ge1\)      |
| Условие попадания в точку относительно левой линии:  | \(x_d\ge1\)      |
| Условие попадания в точку относительно гипотенузы:   | \(y_d\le-x_d+7\) |


1. Реализуйте проверку попадания произвольной точки в область. 
2. Создайте диаграмму фигуры. Добавьте на диаграмму несколько точек и проверьте, попадают ли они в область.
3. Составьте блок-схему алгоритма проверки попадания точки в область.


### Самостоятельное задание. Задача **Попадание точки в область**

Решите задачу попадания точки в область для областей:

{{< tikz width="90%" >}}
	\begin{tikzpicture} 
		\datavisualization [
			school book axes, 
			x axis=grid, y axis=grid, visualize as line/.list={area1,area2},
			style sheet=strong colors,
			style sheet=vary dashing,
			area1={style={solid, line width=1.1pt,visualizer color=blue!50}, label in legend={text=$area1$}},
			area2={style={solid, line width=2.1pt,visualizer color=red!50}, label in legend={text=$area2$}},	
			data/format=function
		]
		data [set=area2] {var x : interval [5:10]; func y = 0;} 
		data [set=area2] {var t : interval [90:180]; func x = 10 + 5 * cos(\value t); func y = 5 * sin(\value t);} 
		data [set=area2] {var y : interval [0:5];  func x = 10;} 
		data [set=area1] {var x : interval [0:5];  func y = \value x;} 
		data [set=area1] {var x : interval [5:8];  func y = -5/3*\value x +40/3;} 
		data [set=area1] {var x : interval [0:8];  func y = 0;}; 
	\end{tikzpicture}
{{< /tikz >}}


## Ключевые слова

Добавьте слова и словосочетания в свой глоссарий:

| **Ключевое слово**          |
| --------------------------- |
| алгоритм                    |
| блок-схема                  |
| действие                    |
| последовательность действий |
| условие                     |
| начало алгоритма            |
| конец алгоритма             |
| составное условие           |
| сложное условие             |










