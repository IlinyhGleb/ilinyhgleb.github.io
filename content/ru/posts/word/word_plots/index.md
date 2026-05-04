+++
date = '2026-04-28T08:00:00+05:00'
title = 'Редактор текстовых документов. Растровые изображения '
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

***Примечание:*** *Далее в тексте под **картинкой** будет подразумеваться отдельное графическое изображение, добавленное в документ из файла или буфера обмена. Под **рисунком** будет подразумевается фрагмент текста состоящий из одной или нескольких картинок. Под рисунком в тексте обязательно добавляется подрисуночная подпись.*

## Задание 1

С помощью любой поисковой системы ([Yandex](https://ya.ru), [Google](https://google.com/)) найдите и скачайте изображение **центрального процессора персонального компьютера**.

#### Добавление картинки

Для добавления картинки нажмите **Вставка** - **Рисунок**:
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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_insert.png}};
	\node[frm, minimum width=.85cm, minimum height=.4cm] (frm1) at (1.3,-0.25) {};
	\node[frm, minimum width=.6cm, minimum height=.7cm] (frm2) at (2.5,-0.6) {};


	% вспомогательная сетка:
	 %  \draw[help lines] (-1,0) grid (12,-2);
	 %  \foreach \x in {-1,...,12} % Подписи по оси X
	 %    \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	 %  \foreach \y in {-0,...,-2} % Подписи по оси Y
	 %    \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}

#### Положение картинки

Нажмите на картинку и настойте положение картинки:
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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_picture_placement.png}};
	\node[frm, minimum width=1.5cm, minimum height=0.6cm] (frm1) at (8.3,0.0) {};
	\node[frm, minimum width=0.9cm, minimum height=0.9cm] (frm2) at (6.75,-0.55) {};
	\node[frm, minimum width=0.6cm, minimum height=0.7cm] (frm3) at (6.85,-1.6) {};

	% вспомогательная сетка:
	 %  \draw[help lines] (-1,0) grid (12,-7);
	 %  \foreach \x in {-1,...,12} % Подписи по оси X
	 %    \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	 %  \foreach \y in {-0,...,-7} % Подписи по оси Y
	 %    \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}

Положение **в тексте** представляет картинку как отдельный символ внутри текста. 
Таким образом, на картинку влияют настройки абзаца, в которой картинка находится. 
Также картинка становится привязанной к определённому местоположению в тексте, что позволяет удобно позиционировать её в документе и исключить проблемы произвольного смещения картинки.

#### Изменение размера картинки

Установите высоту картинки, равную 6 сантиметрам:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_picture_format.png}};
	\node[frm, minimum width=1.5cm, minimum height=0.6cm] (frm1) at (8.3,0.0) {};
	\node[frm, minimum width=1.2cm, minimum height=0.9cm] (frm2) at (10.2,-0.55) {};
	%\node[frm, minimum width=0.6cm, minimum height=0.7cm] (frm3) at (6.85,-1.6) {};

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}

По умолчанию, картинка сохраняет пропорции при изменении размеров. 
Поэтому при изменении высоты картинки, изменится также и ширина. 

#### Положение рисунка

Как было сказано ранее, картинка представляет собой элемент текста. 
Поэтому с помощью инструмента форматирования текста установите ***выравнивание по центру*** для абзаца картинки.

#### Добавление подписи рисунка

В следующем абзаце добавьте текст подписи рисунка:

Рисунок 1 — Центральный процессор

Примените настройки абзаца подписи рисунка:
 
 | Свойство               |    Значение     |
 | :--------------------- | :-------------: |
 | Название шрифта        | Times New Roman |
 | Размер шрифта          |      14 пт      |
 | Выравнивание           |    по центру    |
 | Отступ слева           |        0        |
 | Отступ справа          |        0        |
 | Отступ первой строки   |        0        |
 | Интервал перед         |      14 пт      |
 | Интервал после         |      14 пт      |
 | Интервал междустрочный |    одинарный    |
 
Такие настройки соответствуют государственному стандарту ***ГОСТ 7.32–2017*** ({{< download file="/files/gost_nir_2017.pdf" label="Скачать ГОСТ 7.32–2017" >}}).

## Задание 2

В новом абзаце добавьте две картинки:
1. Диск SSD
2. Диск M.2 SSD

Настройте **положение в тексте** для картинок. 

Измените размеры картинок. Убедитесь, что две картинки умещаются в одной строке.

В следующем абзаце введите:

аб

между буквами а и б добавьте табуляцию (нажмите клавишу **Tab** на клавиатуре). 


Если нужно обрезать картику с края, используйте инструмент **Обрезка**:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_picture_format.png}};
	\node[frm, minimum width=0.65cm, minimum height=0.9cm] (frm1) at (9.65,-0.55) {};

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}

Настройте табуляцию равной 8 см, по центру.

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_picture_format.png}};
	\node[frm, minimum width=1.5cm, minimum height=0.6cm] (frm1) at (8.3,0.0) {};
	\node[frm, minimum width=1.2cm, minimum height=0.9cm] (frm2) at (10.2,-0.55) {};
	%\node[frm, minimum width=0.6cm, minimum height=0.7cm] (frm3) at (6.85,-1.6) {};

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}


Добавьте подпись:

Рисунок 2 — Виды твердотельных дисков: а) SSD, б) M.2 SSD

Добавьте в подпись рисунка **перенос на новую строку без разрыва абзаца** (Shift+Enter) после двоеточия (**:**)

## Задание 3

- Добавьте таблицу 4 на 3 (5 строк, 2 столбца).
- Выключите границы таблицы. 
- Поместите в первый столбец таблицы буквы: а, б, в, г, д
- Поместите во второй столбец таблицы фотографии планок оперативной памяти
  
Под таблицей добавьте подпись:

Рисунок 3 — Поколения оперативной памяти: а) DDR1, б) DDR2, в) DDR3, г) DDR4, д) DDR5

Добавьте в подпись рисунка **перенос на новую строку без разрыва абзаца** (Shift+Enter) после двоеточия (**:**)

## Задание 4

Добавьте в документ ещё три рисунка:
1. Рисунок 3 состоит из одной картинки. Рисунок оформляется как в задании 1. Картинка должна представлять собой материнскую плату компьютера. Картинку можно найти в интернете.
2. Рисунок 4 состоит из двух или или более картинок. Рисунок оформляется как в задании 2. На рисунке должны быть изображены инструменты ввода информации: микрофон, веб-камера, клавиатура, мышь и т.п.. Картинки можно найти в интернете.
2. Рисунок 5 состоит из восьми или более картинок. Рисунок оформляется как в задании 3. На рисунке должны быть изображены инструменты вывода информации: монитор, наушники, VR-шлем и т.д.. Картинки можно найти в интернете.


## Ключевые слова

Добавьте слова в свой глоссарий

|                     |                    |
| ------------------- | ------------------ |
| картинка            | ввод информации    |
| изображение         | вывод информации   |
| рисунок             | размер изображения |
| подпись рисунка     | высота             |
| обрезка изображения | ширина             |




