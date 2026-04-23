+++
date = '2026-04-23T08:00:00+05:00'
title = 'Редактор текстовых документов. Таблицы'
tags = ["Информатика", "Word"]
categories = ["informatika"]
courses = ["informatika"]
+++

*В работе рассматриваются:
Основные принципы работы с текстовыми процессорами. 
Создание и редактирование документов.
Размер, начертание шрифта. 
Маркерованные, нумерованные списки. 
Параметры абзаца.*

<!--more-->

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

создаём таблицу заданного размера 5 на 6

картинка вставки таблицы
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

{{< latex >}}
	\begin{table}[]
\begin{tabular}{|p{2cm}|p{2cm}|p{2cm}|p{2cm}|p{2cm}|}
\hline
 &  &  &  &  \\ \hline
 &  &  &  &  \\ \hline
 &  &  &  &  \\ \hline
 &  &  &  &  \\ \hline
 &  &  &  &  \\ \hline
 &  &  &  &  \\ \hline
\end{tabular}
\end{table}
{{< /latex >}}

с помощью интрумента объединение ячеек объедините ячейки как на схеме ниже:


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

{{< latex >}}
	\begin{table}[]
\begin{tabular}{|l|l|l|ll|}
\hline
 &  &  & \multicolumn{2}{l|}{}                     \\ \hline
 &  &  & \multicolumn{1}{l|}{}                  &  \\ \hline
 &  &  & \multicolumn{1}{l|}{}                  &  \\ \hline
 &  &  & \multicolumn{1}{l|}{}                  &  \\ \hline
 &  &  & \multicolumn{1}{l|}{\multirow{2}{*}{}} &  \\ \cline{1-3} \cline{5-5} 
 &  &  & \multicolumn{1}{l|}{}                  &  \\ \hline
\end{tabular}
\end{table}
{{< /latex >}}


слияние ячеек

вносим текст
	
вносим картинку

вставка списка

границы

добавляем строку

добавляем цвет фона

добавляем жирные заголовки

выравнивание вертикальное

вырванивание горизонтальное

подпись таблицы

самостоятельное задание дополнить таблицу как в шаблоне pdf