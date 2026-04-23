+++
date = '2026-04-23T08:00:00+05:00'
draft = true
title = 'Редактор текстовых документов. Добавление растровых изображений в документ'
tags = ["Информатика", "Word"]
categories = ["informatika"]
courses = ["informatika"]
+++

<!--more-->

Растровое изображение 
: — это цифровое изображение, представляющее собой сетку (матрицу) пикселей (цветных точек), каждая из которых имеет свой цвет. Качество зависит от разрешения (количества пикселей)

Растровые изображения в документах используются для передачи визуальной информации: фотографии, графики, схемы и т.д.

Недостатком растрового изображения является потеря качества при масштабировании, тем крупнее приближается изображения, тем отчётливее становятся видны отдельный пиксели.

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








