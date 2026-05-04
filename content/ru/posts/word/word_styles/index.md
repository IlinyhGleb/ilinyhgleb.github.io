+++
date = '2026-04-27T08:00:00+05:00'
title = 'Редактор текстовых документов. Стили'
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

включите линейку:

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

включите отображение стилей:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_styles.png}};
	\node[frm, minimum width=.3cm, minimum height=.3cm] (frm1) at (10.6,-1.5) {};
	%\node[frm, minimum width=.4cm, minimum height=.4cm] (frm2) at (9.45,-5.4) {};
	\end{tikzpicture}
{{< /tikz >}}



## Задание 1

1. С помощью поисковой системы [Google Scholar (Google Академия)](https://scholar.google.com/) найдите и скачайте статью на любую интересующую вас тематику. 
2. С помощью российской научной библиотеки [Elibrary](https://elibrary.ru) найдите и скачайте статью на любую интересующую вас тематику. Тематика может отличаться от статьи, найденных с помощью Google Академия. 

Суммарные требования на все статьи: 
1.	Должно быть не менее 3 рисунков.
2.	Должно быть не менее 2 таблиц.
3.	Должно быть не менее 2 формул.


## Задание 2

Создайте новый файл .docx, сохраните его с названием **статьи.docx**. 

Содержимое найденных статей необходимо перенести в файл **Статьи.docx** и оформить их как в ***ГОСТ 7.32–2017*** ({{< download file="/files/gost_nir_2017.pdf" label="Скачать ГОСТ 7.32–2017" >}}). 

Для этого создайте стили:

| Название         | Шрифт                  | Начертание | Выравнивание   | Отсупы (слева, справа, первой строки) | Интервалы (перед, после, междустрочный) | Табуляции                                       |
| ---------------- | ---------------------- | ---------- | -------------- | ------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| $Основной_текст  | Times New Roman, 14 пт |            | По ширине      | 0, 0, 1.25 см                         | 0, 0, 1                                 |                                                 |
| $Название        | Times New Roman, 16 пт | Полужирный | По центру      | 0, 0, 0                               | 14 пт, 14 пт, 1                         |                                                 |
| $Авторы          | Times New Roman, 12 пт | Курсив     | По левому краю | 2см, 0, 0                             | 12 пт, 12 пт, 1                         |                                                 |
| $Организации     | Times New Roman, 12 пт | Курсив     | По левому краю | 2 см, 0, 0                            | 12 пт, 12 пт, 1                         |                                                 |
| $Аннотация       | Times New Roman, 12 пт | Курсив     | По ширине      | 2 см, 2 см, 0                         | 12 пт, 0, 1                             |                                                 |
| $Ключевые слова  | Times New Roman, 12 пт | Курсив     | По ширине      | 0, 0, 0                               | 0, 12 пт, 1                             |                                                 |
| $УДК             | Times New Roman, 14 пт | Полужирный | По левому краю | 0, 0, 0                               | 0, 14 пт, 1                             |                                                 |
| $Раздел          | Times New Roman, 14 пт | Полужирный | По левому краю | 0, 0, 0                               | 14 пт, 14 пт, 1                         |                                                 |
| $Подраздел       | Times New Roman, 14 пт | Полужирный | По левому краю | 0, 0, 0                               | 14 пт, 14 пт, 1                         |                                                 |
| $Рисунок         | Times New Roman, 14 пт |            | По центру      | 0, 0, 0                               | 14 пт, 0, 1                             |                                                 |
| $Подпись_рисунка | Times New Roman, 14 пт |            | По центру      | 0, 0, 0                               | 0, 14 пт, 1                             |                                                 |
| $Подпись_таблицы | Times New Roman, 14 пт |            | По левому краю | 0, 0, 0                               | 14 пт, 14 пт, 1                         |                                                 |
| $Формула         | Times New Roman, 14 пт |            | По ширине      | 0, 0, 0                               | 14 пт, 14 пт, 1                         | 8.25 см - по центру, 16.49 см - по правому краю |

Для создания стиля нажмите
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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_styles.png}};
	%\node[frm, minimum width=.3cm, minimum height=.3cm] (frm1) at (10.6,-1.5) {};
	\node[frm, minimum width=.4cm, minimum height=.4cm] (frm2) at (9.45,-5.4) {};
	\end{tikzpicture}
{{< /tikz >}}

Окно создания стиля **$Основной_текст**:
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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_new_style.png}};
	%\node[frm, minimum width=.7cm, minimum height=.7cm] (frm1) at (11.3,-0.5) {};
	%\node[frm, minimum width=1.4cm, minimum height=.6cm] (frm2) at (0.,-0.) {};
	\end{tikzpicture}
{{< /tikz >}}

При создании любого стиля укажите значение **(нет)** в поле **Основан на стиле** чтобы убрать наследование настроек из другого стиля.

После создания стилей, примените их ко всем абзацам документа. 
Для этого поместите курсор в текст абзаца и нажмите на название стиля в меню стилей справа.
