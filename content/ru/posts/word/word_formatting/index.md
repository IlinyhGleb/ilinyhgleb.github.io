+++
date = '2026-04-20T08:00:00+05:00'
title = 'Форматирование текстовых документов'
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
В новом документе введите текст с картинки:
![image1](/posts/word/word_formatting/image1.png)

---

## Задание 2
Оформите текст. Используйте настройки шрифта (тип, размер, вид начертания) и настройки абзаца (интервалы, отступы, выравнивание) как на рисунке ниже.

Для однотипных абзацев используются одинаковые настройки. Например название шрифта основного текста – Times New Roman, размер шрифта – 14 пт, выравнивание по ширине, отступ первой строки 1.25 см.

{{< tikz >}}
	\begin{tikzpicture}[
		img/.style={
		inner sep=0pt,
		anchor=north west
		},
		pnl/.style={
		inner sep=0pt,
		outer sep=0.4pt,
		anchor=north west,
		draw=red!70!black,
		line width=3pt
		},
		lbl/.style={
		inner sep=4pt,
		outer sep=0.4pt,
		anchor=north west,
		draw=red!70!black,
		line width=2pt,
		fill=white,
		font=\fontsize{10pt}{10pt}\selectfont,
		align=left,
		text=red!70!black,
		text width=3.4cm,
		execute at begin node={\hyphenpenalty=10000\relax}  % для исключения переносов слов через тире
		},
		frm/.style={
		inner sep=0pt,
		anchor=north west,
		draw=red!70!black,
		line width=1pt
		},
		arrow/.style={
		-{Triangle[length=12pt, width=8pt]},
		draw=red!70!black,
		line width=2pt,
		}
	]

	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 6.4cm 0 0, clip]{image2.png}};
	\node[pnl] (pnl1) at (-2,1.0) {\includegraphics[width=8cm]{panel3.png}};
	\node[pnl] (prg1) at (9.2,1.0) {\includegraphics[width=6cm]{paragraph1.png}};
	\node[pnl] (prg2) at (9.2,-6.5) {\includegraphics[width=6cm]{paragraph2.png}};
	\node[pnl] (pnl2) at (7.2,-14.0) {\includegraphics[width=8cm]{panel4.png}};

	\node[lbl] (lbl1) at (-2.0, -.6) {Times New Roman, 14~пт, выравнивание по ширине};
	\node[lbl] (lbl2) at (-2.0, -3.0) {Lucida Console, 14~пт, выравнивание по центру};
	\node[lbl] (lbl3) at (-2.0, -5.0) {Consolas, 12~пт, выравнивание по левому краю};
	\node[lbl] (lbl4) at (-2.0, -9.0) {Полужирный, курсив, 14~пт, выравнивание по левому краю};
	\node[lbl] (lbl5) at (-2.0, -13.0) {Consolas, курсив, 10~пт};

	\node[frm, minimum width=0.5cm, minimum height=0.5cm] (frm1) at (5.6,-0.1) {};
	\node[frm, minimum width=2.9cm, minimum height=0.8cm] (frm2) at (12.2,-1.2) {};
	\node[frm, minimum width=5.8cm, minimum height=1.2cm] (frm3) at (9.3,-2.5) {};
	\node[frm, minimum width=2.8cm, minimum height=1.0cm] (frm4) at (9.3,-1.) {};
	\node[frm, minimum width=2.9cm, minimum height=.8cm] (frm5) at (12.2,-8.8) {};
	\node[frm, minimum width=5.8cm, minimum height=1.2cm] (frm6) at (9.3,-10.1) {};

	\draw[arrow] (pnl1.south) -- (4.4,-0.8);
	\draw[arrow] (pnl2.west) -- (4.8,-14.8);
	\draw[arrow] ([yshift=10mm]prg1.west) -- (8.2,-1.);
	\draw[arrow] ([yshift=20mm]prg2.west) -- (6.5,-6.);
	\draw[arrow] (lbl1.south) -- (1.7,-2.2);
	\draw[arrow] (lbl2.east) -- (4.5,-4.0);
	\draw[arrow] (lbl3.south) -- (1.7,-6.9);
	\draw[arrow] (lbl4.north) -- (1.7,-8.4);
	\draw[arrow] (lbl5.north) -- (1.7,-12.4);
	\draw[arrow] (frm1.east) -- (prg1.north west);

	\end{tikzpicture}
{{< /tikz >}}

---

## Задание 3
На новой странице введите текст:
![image3](/posts/word/word_formatting/image3.png)

и оформите его в соответствии с рисунком:


{{< tikz >}}
	\begin{tikzpicture}[
	img/.style={
		inner sep=0pt,
		anchor=north west
	},
	pnl/.style={
		inner sep=0pt,
		outer sep=0.4pt,
		anchor=north west,
		draw=red!70!black,
		line width=3pt
	},
	lbl/.style={
		inner sep=4pt,
		outer sep=0.4pt,
		anchor=north west,
		draw=red!70!black,
		line width=2pt,
		fill=white,
		font=\fontsize{10pt}{10pt}\selectfont,
		align=left,
		text=red!70!black,
		text width=3.4cm,
		execute at begin node={\hyphenpenalty=10000\relax}  % для исключения переносов слов через тире
	},
	frm/.style={
		inner sep=0pt,
		anchor=north west,
		draw=red!70!black,
		line width=1pt
	},
	arrow/.style={
		-{Triangle[length=12pt, width=8pt]},
		draw=red!70!black,
		line width=2pt,
	}
	]

	\node[img] (img1) at (0,0) {\includegraphics[width=12cm, trim=0 0 0 0, clip]{image4.png}};
	\node[pnl] (pnl1) at (6.5,0.0) {\includegraphics[width=7cm]{panel5.png}};
	\node[pnl] (pnl2) at (-2,-9.7) {\includegraphics[width=6cm]{panel6.png}};
	\node[pnl] (prg1) at (7.5,-5.0) {\includegraphics[width=6cm]{paragraph3.png}};

	\node[lbl] (lbl1) at (-2, -4) {Courier New, Курсив, 12~пт};
	\node[lbl] (lbl2) at (4.4, -12.5) {Настройка отступов};

	\node[frm, minimum width=0.4cm, minimum height=0.4cm] (frm1) at (9.8,-0.4) {};
	\node[frm, minimum width=0.9cm, minimum height=0.4cm] (frm2) at (0.7,-10.2) {};
	\node[frm, minimum width=5.8cm, minimum height=1.0cm] (frm3) at (7.6,-7.0) {};

	\draw[arrow] (pnl1.west) -- (4.6,-3.7);
	\draw[arrow] ([xshift=-10mm]pnl2.north) -- (1.8,-7.8);
	\draw[arrow] ([yshift=10mm]prg1.west) -- (4.5,-4.5);
	\draw[arrow] (lbl1.south) -- (1.7,-6.2);
	\draw[arrow] (lbl2.west) -- (frm2);

	%   вспомогательная сетка:
	%   \draw[help lines] (-2,0) grid (16,-14);
	%   \foreach \x in {-2,...,16} % Подписи по оси X
	%     \node[anchor=north east, text=green!70!black] at (\x,0) {\small\x};
	%   \foreach \y in {-0,...,-14} % Подписи по оси Y
	%     \node[anchor=south east, text=green!70!black] at (0,\y) {\small\y};
	\end{tikzpicture}
{{< /tikz >}}

---

## Задание 4

1. На новую страницу скопируйте исходный текст научной статьи:
{{<details summary="**Исходный текст 1**">}}

---

*УДК 539.3*

---

*ИДЕНТИФИКАЦИЯ ТЕРМОВЯЗКОУПРУГОЙ МОДЕЛИ СШИТОГО ПОЛИМЕРА С УЧЕТОМ БОЛЬШИХ ДЕФОРМАЦИЙ И ЕЕ ПРИМЕНЕНИЕ*

---

*О.Ю. Сметанников1, Ю.Б. Фасхутдинова1, Г.В. Ильиных1*

---

*1Пермский национальный исследовательский политехнический университет, Пермь, Россия*

---

*Целью работы является развитие модели вязкоупругого термомеханического поведения изделий из сшитого полиэтилена (СПЭ), демонстрирующего эффекты памяти формы. 
Основная область применения данного класса материалов – термоусаживаемые трубки и их модификации, для которых характерны величины начального расширения (экспандинга) в 100 и более процентов. 
Симо и Хольцапфелем были предложены модифицированные определяющие соотношения, представляющие собой синтез вязкоупругой модели Прони и гиперупругой модели на основе потенциала упругой энергии. 
В публикуемой работе предлагается методика идентификации как демпфирующих, так и нелинейно упругих материальных констант в  случае наличия больших деформаций. 
Разработана и реализована программа экспериментов по  определению материальных констант сшитого полиэтилена, включающая процедуру снижения размерности задачи нелинейной оптимизации при нахождении коэффициентов экспоненциальной аппроксимации функции релаксации.
Приведено описание разработанного алгоритма поиска материальных констант гиперупругой модели по результатам эксперимента на циклическое нагружение образца большими деформациями в  интервале высокоэластического поведения, а также ее адаптации в ANSYS с  учетом наличия релаксационных свойств. В качестве иллюстрации применения обновленной физической модели приведен пример конечно-элементного расчета давления термоусаживаемых трубок при осаживании на жесткую цилиндрическую поверхность, а также инженерная методика, позволяющая производить подобные вычисления в таблице Excel.*

---

*Ключевые слова: память формы, сшитый полиэтилен, термоусаживаемая трубка, термомеханическое поведение, вязкоупругость, гиперупругость, большие деформации*

---

*В настоящее время растет интерес к использованию высокотехнологичных полимеров и связанная с этим потребность в теоретической разработке моделей для описания свойств таких материалов. 
Современные, так называемые умные материалы обладают особыми свойствами, которые открывают новые возможности для создания уникальных продуктов, используемых в различных отраслях, таких как медицина, строительство и машиностроение. Одним из таких свойств является эффект памяти формы (ЭПФ).
Он проявляется в способности некоторых материалов после деформации под воздействием температуры возвращаться к исходному размеру и форме [1–8].
Это позволяет создать условия для “программирования” желаемой конечной деформации изделия или контролировать сам процесс деформации. 
Актуальность данного исследования заключается в идентификации выбранной физической модели, обладающей признаками ЭПФ, на основе разработанной экспериментальной методики с целью получения точных расчетных данных при проектировании как процесса производства изделий из СПЭ, так и эксплуатационных режимов.*

---

*СПИСОК ЛИТЕРАТУРЫ*

---

1. *Smetannikov O.Yu., Faskhutdinova Yu.B., Subbotin E.V. ANSYS Study of the ShapeMemory Effect in Cross-Linked Polyethylene Products // J. Appl. Mech. Tech. Phys. 2023. V. 63. № 7. P. 1138–1154. https://doi.org/10.1134/s0021894422070112*
2. *Lendlein A., Gould O.E.C. Reprogrammable recovery and actuation behavior of shapememory polymers // Nat. Rev. Mater. 2019. V. 4. P. 116–133. https://doi.org/10.1038/s41578-018-0078-8*
3. *Любимова А.С., Ткачук А.И., Кузнецова П.А. Полимеры с  памятью формы на основе эпоксидных смол // Труды ВИАМ. 2024. № 4 (134). С. 50–63. https://doi.org/10.18577/2307-6046-2024-0-4-50-63*
4. *Li J., Duan Q., Zhang E., Wang J. Applications of shape memory polymers in kinetic buildings // Adv. Mater. Sci. Eng. 2018. V. 2018. P. 7453698. https://doi.org/10.1155/2018/7453698*

---

{{</details>}}


2. Скачайте шаблон : {{< download file="/files/word_formatting_template.docx" label="Файл шаблона" >}}

3. Оформите (настройки шрифтов и абзацев) в соответствии с шаблоном.

4. На новую страницу перенесите текст:
{{<details summary="**Исходный текст 2**">}}

---

MSC: 74D05, 74S05, 74H15

---

А.А. Аdamov1, А.А. Kamenskikh2, Yu.О. Nosov2

---

1Department of Nonlinear Mechanics of a Deformable Solid, Institute of Continuous Media Mechanics, Russia, Perm

2Department of Computational Mathematics, Mechanics and Biomechanics, Perm National Research Polytechnic University, Russia, Perm

---

DEFORMATIONAL BEHAVIOR OF THE flat SLIDING LAYER OF THE SPHERICAL bearing

---

Analysis of the friction properties of modified PTFE is performed, the functions describing the change in the friction coefficient depending on the pressure level with a maximum error from the experiments results less than 1% are proposed in the work. 
The influence of friction on the deformation behavior of the flat sliding layer of the spherical bearing on a periodicity cell model is considered. 
The geometrical configuration of the flat sliding layer with truncated spherical hole for the lubricant is considered. 
The periodicity cell includes one hole for lubrication. 
A series of numerical experiments for three options for the thickness of the sliding layer from 4 to 8 mm with a recess for the lubricant, in the unfavorable case the absence of lubricant is performed. 
The pattern of geometric configuration hole change with increasing pressure level is established.

---

Keywords: Contact, Friction, Modified PTFE, Antifriction layer and Deformation behavior

---

A lot of elements and designs applied in mechanical engineering, construction, medicine and other areas work in the conditions of contact interaction. 
These designs are costly. 
It is difficult to repair them. 
High requirements with respect to durability, reliability and service life are presented to them. 
The antifriction coatings and layers are widely used to create favorable conditions for the contact nodes operation. 
As examples of systems with contact layers and coverings it is possible to note sliding bearings [1], hip endoprosthesis [2], hydraulic turbines [3] and so on. 
These structures include elements of transport and logistics systems, such as temperature joints and supporting parts of bridge bearing parts. 
Researchers note the main actual problems of transport and logistics systems related to bridge construction: geometric configuration and technology of deformation joints [4, 5], bearings [6, 7], bridge spans [8], hoisting structures of draw bridges [9], as well as other elements of bridge structures. 
We can note a special interest in the deformation behavior of the bearing of bridge spans [10-14, etc.].

---

REFERENCES

---

1. Rakowski, W.A. and Zimowski, S. Polyesterimide composites as a sensor material for sliding bearings. Composites: Part B engineering, 37, 2006, pp. 81-88.
2. Pinchuk, L.S., Nikolaev, V.I., Tsvetkova, E.A. and Goldade, V.A. Tribology and biophysics of artificial joints: Elsevier, 2006, pp. 350.
3. Anisimov, A.V., Bakhareva, V.E. and Nikolaev, G.I. Antifriction Carbon Plastics in Machine Building. Journal of Friction and Wear, 28(6), 2007, pp. 541-545.
4. Yankovsky, L.V., Kochetkov, A.V., Ovsyannikov, S.V. and Trofimenko, Yu.A. Diagnostics of damage to the span of metal bridges: a monograph. Technical regulation in transport construction, 3(7), 2014, pp. 6-12.

---

{{</details>}}

5. Оформите текст аналогичным образом. 
Для быстрого копирования настроек абзаца используйте инструмент - *форматирование по образцу*:

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
	\node[frm, minimum width=2.6cm, minimum height=.4cm] (frm1) at (.3,-1.4) {};
	\node[frm, minimum width=1.4cm, minimum height=.6cm] (frm2) at (0.,-0.) {};
	\end{tikzpicture}
{{< /tikz >}}

Для быстрого изменения регистра используйте инструмент - *регистр*:

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
	\node[frm, minimum width=1.4cm, minimum height=.6cm] (frm1) at (0.,-0.) {};
	\node[frm, minimum width=.7cm, minimum height=.6cm] (frm2) at (5.8,-1.2) {};
	\end{tikzpicture}
{{< /tikz >}}

Для форматирования чисел, обозначающих номер организации, используйте инструмент - *надстрочный знак*:

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
	\node[frm, minimum width=1.4cm, minimum height=.6cm] (frm1) at (0.,-0.) {};
	\node[frm, minimum width=.5cm, minimum height=.6cm] (frm2) at (5.4,-1.2) {};
	\end{tikzpicture}
{{< /tikz >}}
