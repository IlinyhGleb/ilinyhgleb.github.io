+++
date = '2026-04-23T08:00:00+05:00'
title = 'Редактор текстовых документов. Векторная графика'
tags = ["Информатика", "Word"]
categories = ["informatika"]
courses = ["informatika"]
+++

<!--more-->

Векторное изображение
: — это цифровое изображение, состоящее из математически описанных геометрических примитивов (точек, линий, кривых, многоугольников). 

Примитив - простая геометрическая фигура. На основе примитивов строятся более сложные составные фигуры.

Преимуществом векторного изображения является то, что оно масштабируется без потери качества, так как при изменении размера все геометрические фигуры пересчитываются заново.


## Задание 0

Откройте любой офисный редактор текстовых документов. В данной работе будут использоваться скриншоты из редактора **MS Word 2007**, однако подойдёт любой другой аналог (**Only Office**, **Libre Office** и др.).

Перед работой включите отображение скрытых символов:

{{< tikz >}}
	\begin{tikzpicture}[
	img/.style={
		inner sep=0pt,
		anchor=north west
	},
	frm/.style={
		inner sep=0pt,
		anchor=north west,
		draw=red!70!black,
		line width=1pt
	},
	]
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{panel1.png}};
	\node[frm, minimum width=.7cm, minimum height=.7cm] (frm1) at (11.3,-0.5) {};
	\node[frm, minimum width=1.4cm, minimum height=.6cm] (frm2) at (0.,-0.) {};
	\end{tikzpicture}
{{< /tikz >}}

и включите линейку:

{{< tikz >}}
	\begin{tikzpicture}[
	img/.style={
		inner sep=0pt,
		anchor=north west
	},
	frm/.style={
		inner sep=0pt,
		anchor=north west,
		draw=red!70!black,
		line width=1pt
	},
	]
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{panel2.png}};
	\node[frm, minimum width=2.5cm, minimum height=.7cm] (frm1) at (5.1,-0.5) {};
	\node[frm, minimum width=1.2cm, minimum height=.6cm] (frm2) at (10.8,-0.) {};
	\end{tikzpicture}
{{< /tikz >}}

## Задание 1
     
Добавьте на страницу инструмент - **Полотно**:
![word_painting1](/posts/word/word_painting/word_painting2.png)

Полотно предствляет собой ограниченное рабочее пространство, которое удобно использовать для создания векторных рисунков.
После создания векторного рисунка в полотне, его можно вырезать и вставить в любую часть документа. Также можно оставить рисунок в полотне и при необходимости перемещать само полотно.

Кликните по полотну и выберите меню с фигурами:
![word_painting2](/posts/word/word_painting/word_painting1.png)

Теперь вы можете выбрать любую фигуру и добавить её в ваш рисунок.


## Задание 2

Нарисуйте:

{{< tikz >}}
\begin{tikzpicture}
	% general shift to north east
	\coordinate (O) at (0.5,0.5);
	\draw[semithick] (0,0) -- (4,1);% bottom line in front
	\draw[dashed,color=gray] (O) -- ($(4,1)+(O)$);% bottom line in the back
	\draw[semithick] (0,3) -- (4,2);% top line in front
	\draw[semithick] ($(0,3)+(O)$) -- ($(4,2)+(O)$);% top line in the back
	\draw[semithick] (0,3) -- ($(0,3)+(O)$);% line to the back, top left
	\draw[semithick] (4,2) -- ($(4,2)+(O)$);% line to the back, top right
	\draw[semithick] (4,1) -- ($(4,1)+(O)$);% line to the back, bottom right
	\draw[dashed,color=gray] (0,0) -- (O);% line to the back, bottom left
	% the first angle is 180°+atan(0.25)
	% the second angle is 180°-atan(0.25)
	% the radius is sqrt(6^2+1.5^2)
	\draw[semithick] (0,0) arc (194.036:165.964:6.185);% left arc in front
	\draw[dashed,color=gray] (O) arc (194.036:165.964:6.185);% left arc in the back
	% the first angle is 180°+atan(0.25)
	% the second angle is 180°-atan(0.25)
	% the radius is 1/3*sqrt(6^2+1.5^2)
	\draw[semithick] (4,1) arc (194.036:165.964:2.062);% right arc in front
	\draw[semithick] ($(4,1)+(O)$) arc (194.036:165.964:2.062);% right arc in the back
	\draw (-0.5,1.7) node {$b_1$};
	\draw (3.6,1.7) node {$b_2$};
	\draw (0,3.5) node {$s$};
	\draw[|-,semithick] (0,-0.5) -- (4,-0.5);
	\draw[|->,semithick] (4,-0.5) -- (4.5,-0.5);
	\draw (0,-1) node {$x=0$};
	\draw (4,-1) node {$x=l$};
\end{tikzpicture}
{{< /tikz >}}

## Задание 3

Нарисуйте схему:

{{< tikz >}}
\begin{tikzpicture}[sibling distance=10em,
  every node/.style = {shape=rectangle, rounded corners,
    draw, align=center,
    top color=white, bottom color=blue!20}]]
  \node {Formulas}
    child { node {single-line} }
    child { node {multi-line}
      child { node {aligned at}
        child { node {relation sign} }
        child { node {several places} }
        child { node {center} } }
      child { node {first left,\\centered,\\last right} } };
\end{tikzpicture}
{{< /tikz >}}


## Задание 4

Нарисуйте схему:

![word_painting3](/posts/word/word_painting/word_painting3.png)
