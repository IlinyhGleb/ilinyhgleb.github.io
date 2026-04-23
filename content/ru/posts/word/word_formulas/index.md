+++
date = '2026-04-23T08:00:00+05:00'
title = 'Редактор текстовых документов. Формулы'
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

Наша задача - получить формулу:

$$ \frac{\partial F}{\partial \lambda_i} = \varphi_i(\mathbf{x}) $$

Для этого вставьте формулу:

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
	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{word_formulas0.png}};
	\node[frm, minimum width=0.9cm, minimum height=.3cm] (frm1) at (0.85,-0.0) {};
	\node[frm, minimum width=1.2cm, minimum height=.3cm] (frm2) at (10.8,-0.3) {};
	\end{tikzpicture}
{{< /tikz >}}

в текущем месте курсора появится формула, а в интерфейсе появится вкладка **Работа с формулами / Конструктор**.

Начнём создание с добавления структуры дроби (дифференциала):

![formula](/posts/word/word_formulas/word_formulas1.gif)

поменяем символ в числителе введя \(F\) с клавиатуры:

![formula](/posts/word/word_formulas/word_formulas2.gif)

символ \(x\) в знаменателе удалим:

![formula](/posts/word/word_formulas/word_formulas3.gif)

для добавления \(\lambda_i\) добавим структуру с нижним индексом:

![formula](/posts/word/word_formulas/word_formulas4.gif)

для ввода \(\lambda\) выберем греческие буквы:

![formula](/posts/word/word_formulas/word_formulas5.gif)

нижний индекс \(i\) введём с клавиатуры:

![formula](/posts/word/word_formulas/word_formulas6.gif)

введём символ равно (\(=\)) с клавиатуры и добавим структуру с нижним индексом:
   
![formula](/posts/word/word_formulas/word_formulas7.gif)

введём греческую букву \(\varphi\):

![formula](/posts/word/word_formulas/word_formulas8.gif)

символ \(i\) введём с клавиатуры:

![formula](/posts/word/word_formulas/word_formulas9.gif)

добавим структуру круглых скобок (также круглые скобки можно ввести комбинацией клавиш ***ctrl+shift+9***):

![formula](/posts/word/word_formulas/word_formulas10.gif)

внутри скобок с клавиатуры введём символ \(x\):

![formula](/posts/word/word_formulas/word_formulas11.gif)

в данном случае \(\mathbf{x}\) обозначает вектор. Сделаем символ обычным текстом и применим настройку начертания - **полужирный**:

![formula](/posts/word/word_formulas/word_formulas12.gif)

формула готова, теперь ей нужно добавить номер и разместить в центре строки, для этого добавим два знака табуляции (с помощью клавиши **Tab**):

![formula](/posts/word/word_formulas/word_formulas13.gif)

добавим номер формулы:

![formula](/posts/word/word_formulas/word_formulas14.gif)

настроим шрифт формулы (Times New Roman, 12 пт):

![formula](/posts/word/word_formulas/word_formulas15.gif)

настроим свойства абзаца. Добавим интервалы перед и после абзаца, равные высоте строки (размеру шрифта, 12 пт) для того, чтобы формула не сливалась с текстом. Междустрочный интервал выберем одинарным:

![formula](/posts/word/word_formulas/word_formulas16.gif)

из окна настройки абзаца перейдём в настройки табуляции:

![formula](/posts/word/word_formulas/word_formulas17.gif)

добавим табуляцию 8.25 см, соответствующую середине страницы (можно увидеть на линейке, что ширина страницы 16.5 см) с выравниванием **по центру**:

![formula](/posts/word/word_formulas/word_formulas18.gif)

добавим табуляцию 16.49 см, соответствующую правому краю страницы с небольшим отступом (0.01 см) с выравниванием **по правому краю**:

![formula](/posts/word/word_formulas/word_formulas19.gif)

Таким образом, мы получим формулу, оформление которой соответствует ГОСТ 7.32-2017:

![formula](/posts/word/word_formulas/word_formulas_final.png)

## Задание 2

Добавьте формулу:

$$ 4x_1 - x_2 + \lambda_2 - V_1 + y_1 = 10 $$

Добавьте номер формулы.

## Задание 3

Оформите формулу:

$$ \begin{cases}
    C \cdot X^{*} - A^{\mathrm{T}} \Lambda + V = -D, \\
    A \cdot X^{*} + W = B.
\end{cases} $$

Используйте структуры: *скобка*, *матрица*, *индекс*.

Добавьте номер формулы.

## Задание 4

$$ f(\mathbf{x}) = \sum_{k=1}^{l} C_n \cdot x_1^{\alpha_{k1}} \cdot x_2^{\alpha_{k2}} \cdot \ldots \cdot x_n^{\alpha_{kn}} $$
 
Используйте структуры: *крупный оператор*, *скобка*, *индекс*.

Добавьте номер формулы.

## Задание 5

Оформите формулу:

$$ \int_a^c f(x)dx = \lim_{n \to \infty} \sum_{i=1}^n f(\xi_i)(x_i - x_{i-1}) = \int_a^b f(x)dx + \int_b^c f(x)dx $$

Используйте структуры: *крупный оператор*, *скобка*, *индекс*, *предел и логарифм*.

Не добавляйте номер формулы, но выравняйте формулу с помощью табуляций, как и в других заданиях.

## Задание 6

$$ 1 + \frac{x}{1} + \frac{x^2}{1 \cdot 2} + \frac{x^3}{1 \cdot 2 \cdot 3} + \ldots + \frac{x^n}{1 \cdot 2 \cdot 3 \cdot \ldots \cdot n} + \ldots = \sum_{n=0}^{\infty} \frac{x^n}{n!} $$

Используйте структуры: *крупный оператор*, *индекс*, *дробь*.

Добавьте номер формулы.


## Ключевые слова

Добавьте слова в свой глоссарий

|                   |                    |
| ----------------- | ------------------ |
| числитель дроби   | нижний индекс      |
| знаменатель дроби | верхний индекс     |
| формула           | круглые скобки     |
| знак равно        | номер формулы      |
| вставить формулу  | табуляция          |
| структура формулы | центр строки       |
| матрица           | правый край строки |






