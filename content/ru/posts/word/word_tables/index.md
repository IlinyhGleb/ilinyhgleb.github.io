+++
date = '2026-04-27T08:00:00+05:00'
title = 'Редактор текстовых документов. Таблицы'
draft = false
tags = ["Информатика", "Word"]
categories = ["informatika"]
courses = ["informatika"]
+++

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

Создадим таблицу заданного размера 6 на 8 (6 столбцов и 8 строк):

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables1.png}};
	\node[frm, minimum width=0.65cm, minimum height=.7cm] (frm1) at (1.8,-0.65) {};
	\node[frm, minimum width=2.45cm, minimum height=2.05cm] (frm2) at (1.8,-1.4) {};

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-6);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-6} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}

получим таблицу вида:

{{< latex >}}
	\begin{table}[]
\begin{tabular}{|p{2cm}|p{2cm}|p{2cm}|p{2cm}|p{2cm}|p{2cm}|}
\hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
 &  &  &  &  & \\ \hline
\end{tabular}
\end{table}
{{< /latex >}}

с помощью выделения отдельных ячеек и инструмента ***Объединить ячейки*** объединим ячейки как на схеме ниже:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables2.png}};
	\node[frm, minimum width=1.7cm, minimum height=0.3cm] (frm1) at (4.2,-0.6) {};

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}

{{< latex>}}
\begin{tabular}{|>{\centering\arraybackslash}p{1.4cm}|p{2.0cm}|p{2.0cm}|p{2.0cm}|>{\raggedright\arraybackslash}p{2.0cm}|p{2.0cm}|}
\hline
 & & \multicolumn{2}{c|}{} & & \\
\cline{3-4}
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{1}{|>{\centering\arraybackslash}p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{>{\raggedright\arraybackslash}p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} \\
\cline{2-2}
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{6}{|p{12cm}|}{} \\
\hline
\end{tabular}
{{< /latex >}}

следующим шагом уберём верхнюю границу у двух ячеек в 3 и 4 столбцах с помощью инструмента ***Границы***:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables3.png}};
	\node[frm, minimum width=1.cm, minimum height=.3cm] (frm1) at (7.2,-0.9) {};		


	% вспомогательная сетка:
	  % \draw[help lines] (-1,0) grid (12,-2);
	  % \foreach \x in {-1,...,12} % Подписи по оси X
	 %    \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	 %  \foreach \y in {-0,...,-2} % Подписи по оси Y
	 %    \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}


{{< latex>}}
\begin{tabular}{|>{\centering\arraybackslash}p{1.4cm}|p{2.0cm}|p{2.0cm}|p{2.0cm}|>{\raggedright\arraybackslash}p{2.0cm}|p{2.0cm}|}
\hline
 & & \multicolumn{2}{c|}{} & & \\
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{1}{|>{\centering\arraybackslash}p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{>{\raggedright\arraybackslash}p{2.0cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} \\
\cline{2-2}
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{6}{|p{12cm}|}{} \\
\hline
\end{tabular}
{{< /latex >}}

добавим цвет для двух верхних строк таблицы с помощью инструмента ***заливка***:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables3.png}};
	\node[frm, minimum width=1.cm, minimum height=.3cm] (frm1) at (7.2,-0.6) {};	

	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}

{{< latex>}}
\begin{tabular}{|>{\centering\arraybackslash}p{1.4cm}|p{2.0cm}|p{1.6cm}|p{1.6cm}|>{\raggedright\arraybackslash}p{3.8cm}|p{5.6cm}|}
\hline
\rowcolor{green!16}
\cellcolor{green!16} & \cellcolor{green!16} & \multicolumn{2}{c|}{\cellcolor{green!16}} & \cellcolor{green!16} & \cellcolor{green!16} \\
\arrayrulecolor{green!16}\cline{3-4}\arrayrulecolor{black}
\rowcolor{green!16}
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{1}{|>{\centering\arraybackslash}p{1.4cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{p{1.6cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} & \multicolumn{1}{>{\raggedright\arraybackslash}p{3.8cm}|}{\multirow{2}{*}{}} & \multirow{2}{*}{} \\
\cline{2-2}
& & & & & \\
\hline
& & & & & \\
\hline
& & & & & \\
\hline
\multicolumn{6}{|p{17cm}|}{} \\
\hline
\end{tabular}
{{< /latex >}}

Теперь структура таблицы готова, внесём текст. С помощью стандартных инструментов настройки шрифта и настройки абзацев оформите вид начертания и выравнивания текста в таблице:

{{< latex>}}
\begin{tabular}{|>{\centering\arraybackslash}p{1.4cm}|p{2.0cm}|p{1.6cm}|p{1.6cm}|>{\raggedright\arraybackslash}p{3.8cm}|p{5.6cm}|}
\hline
\rowcolor{green!16}
\textbf{\color{black!99}Символ} & \textbf{\color{black!99}Альт-код} & \multicolumn{2}{c|}{\textbf{\color{black!99}Юникод}} & \textbf{\color{black!99}Набор символов (Word)} & \textbf{\color{black!99}Описание} \\
\arrayrulecolor{green!16}\cline{3-4}\arrayrulecolor{black}
\rowcolor{green!16}
& & \textbf{\color{black!99}16-чная} & \textbf{\color{black!99}10-чная} & & \\
\hline
— & Alt+0151 & U+2014 & 151 & Знаки пунктуации & Длинное тире \\
\hline
° & Alt+0176 & U+00B0 & 176 & Дополнительная латиница-1 & Знак градуса (температура, углы, географические координаты) \\
\hline
\multicolumn{1}{|>{\centering\arraybackslash}p{1.4cm}|}{\multirow{2}{*}{→}} & \multirow{2}{*}{\begin{tabular}{@{}l@{}} Alt+26 \\ 2192, Alt+x \end{tabular}} & \multicolumn{1}{p{1.6cm}|}{\multirow{2}{*}{U+2192}} & \multirow{2}{*}{} & \multicolumn{1}{>{\raggedright\arraybackslash}p{3.8cm}|}{\multirow{2}{*}{Стрелки}} & \multirow{2}{*}{Стрелка вправо} \\
\cline{2-2}
& & & & & \\
\hline
$\alpha$ & 03B1, Alt+x & U+03B1 &  & Греческие и коптские & Строчная греческая буква альфа (математика, физика, обозначение углов) \\
\hline
$\cdot$ & Alt+0183 & U+00B7 & 183 & Дополнительная латиница-1 & Средняя точка (используется как знак умножения точкой в формулах) \\
\hline
\multicolumn{6}{|p{17cm}|}{\textit{\textbf{Примечание:} Запись \textnormal{03B1, Alt+x} обозначает, что нужно ввести текст \textnormal{03b1} (регистр не имеет значения) и нажать комбинацию клавиш \textnormal{Alt} и \textnormal{x}}} \\
\hline
\end{tabular}
{{< /latex >}}

Также для выравнивания, в том числе вертикального, можно использовать инструмент ***Выравнивание***:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables2.png}};
	\node[frm, minimum width=1.cm, minimum height=0.9cm] (frm1) at (7.2,-0.55) {};


	% вспомогательная сетка:
	   %\draw[help lines] (-1,0) grid (12,-2);
	   %\foreach \x in {-1,...,12} % Подписи по оси X
	     %\node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	   %\foreach \y in {-0,...,-2} % Подписи по оси Y
	     %\node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}


Обратите внимание на содержимое таблицы, в ней указаны способы ввода описываемых символов.
Стандартный алгоритм добавления символов с помощью инструмента ***Символ*** представлен на рисунке:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables4.png}};
	\node[frm, minimum width=6.5cm, minimum height=4.5cm] (frm1) at (1.0,-1.8) {};
	\node[frm, minimum width=0.9cm, minimum height=0.2cm] (frm2) at (10.2,-0.9) {};
	\node[frm, minimum width=1.7cm, minimum height=0.4cm] (frm3) at (10.2,-2.4) {};

	% вспомогательная сетка:
	  % \draw[help lines] (-1,0) grid (12,-7);
	  % \foreach \x in {-1,...,12} % Подписи по оси X
	  %   \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	  % \foreach \y in {-0,...,-7} % Подписи по оси Y
	  %   \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}

## Задание 2

Перед таблицей в отдельной строке с выравниванием *по левому краю* добавьте подпись таблицы:

Таблица 1 — Специальные символы

Такая подпись соответствует государственному стандарту ***ГОСТ 7.32–2017*** ({{< download file="/files/gost_nir_2017.pdf" label="Скачать ГОСТ 7.32–2017" >}}).

## Задание 3

С помощью инструмента ***Символ*** найдите информацию о символах \(\leftarrow\), \(\uparrow\), \(\downarrow\), \(\beta\), \(\gamma\) и добавьте её в таблицу. 
Для добавления новых строк используйте инструменты вставки:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_tables2.png}};
	\node[frm, minimum width=2.1cm, minimum height=1.1cm] (frm1) at (2.1,-0.5) {};


	% вспомогательная сетка:
	  % \draw[help lines] (-1,0) grid (12,-2);
	  % \foreach \x in {-1,...,12} % Подписи по оси X
	  %   \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	  % \foreach \y in {-0,...,-2} % Подписи по оси Y
	  %   \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};

	\end{tikzpicture}
{{< /tikz >}}


## Задание 4

Скачайте файл: {{< download file="/files/tables.pdf" label="Файл задания" >}}

В существующем текстовом документе добавьте новую таблицу и оформите её в соответствии с скачанным файлом.


## Ключевые слова

Добавьте слова в свой глоссарий

|                             |                         |
| --------------------------- | ----------------------- |
| ячейка                      | таблица                 |
| строка                      | вставить строку сверху  |
| столбец                     | вставить строку снизу   |
| выделить ячейку             | вставить столбец слева  |
| объединить ячейки           | вставить столбец справа |
| использовать инструмент     | граница ячейки          |
| горизонтальное выравнивание | заливка фона ячейки     |
| вертикальное выравнивание   | ширина таблицы          |
|                             | высота таблицы          |
