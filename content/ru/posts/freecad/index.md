+++
date = '2026-03-01T12:00:00+05:00'
draft = false
title = 'Тестовая модель для FDM-печати в FreeCAD'
tags = ["Python", "FreeCAD", "Macro", "FDM", "Аддитивные технологии", "3D-печать", "ООП", "TikZ", "Latex"]
categories = ["FreeCAD"]
+++

Представленный FreeCAD макрос создаёт тестовую модель для проверки прилипания пластика к столу при FDM-печати.

<!--more-->

{{< tikz >}}
\begin{tikzpicture}\begin{scope}[scale=0.6]

% PARAMETERS
\def\SECTIONHEIGHT{0.1}
\def\SECTIONWIDTH{0.5}
\def\VISUALRATIO{1}  % визуальный коэффициент

\def\HEIGHTTOTAL{60}
\def\WIDTHTOTAL{60}
\def\LINESNUMBER{11}

% derived parameter
\pgfmathsetmacro{\xstep}{\WIDTHTOTAL/(\LINESNUMBER-1)}

% Команда для рисования сегмента как прямоугольника с контуром
\newcommand{\filamentrect}[4]{%
    % #1 x1, #2 y1, #3 x2, #4 y2

    \pgfmathsetmacro{\dx}{#3-#1}
    \pgfmathsetmacro{\dy}{#4-#2}
    \pgfmathsetmacro{\norm}{sqrt(\dx*\dx+\dy*\dy)}

    \pgfmathsetmacro{\ox}{\SECTIONWIDTH*\VISUALRATIO/2 * \dy/\norm}
    \pgfmathsetmacro{\oy}{-\SECTIONWIDTH*\VISUALRATIO/2 * \dx/\norm}

    % Прямоугольник с заливкой и контуром
    \filldraw[fill=orange!30, draw=orange!80!black, line width=0.5mm]
        (#1+\ox,#2+\oy) -- (#1-\ox,#2-\oy) -- (#3-\ox,#4-\oy) -- (#3+\ox,#4+\oy) -- cycle;
}

% path generation
\pgfmathsetmacro{\x}{0}
\pgfmathsetmacro{\y}{0}

\foreach \i in {1,...,\numexpr\LINESNUMBER-1\relax} {
    % determine new y
    \pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
    \let\ynew\pgfmathresult

    % determine new x
    \pgfmathsetmacro{\xnew}{\x+\xstep}

    % рисуем сегменты как прямоугольники
    \filamentrect{\x}{\y}{\x}{\ynew}
    \filamentrect{\x}{\ynew}{\xnew}{\ynew}

    % update variables
    \xdef\x{\xnew}
    \xdef\y{\ynew}
}

% final vertical segment
\pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
\let\ynew\pgfmathresult
\filamentrect{\x}{\y}{\x}{\ynew}

% AXES
\draw[ultra thick,red,-Stealth,line width=12pt] (0,0) -- (20,0) node[above left,scale=5.8]{X};
\draw[ultra thick,green!70!black,-Stealth,line width=12pt] (0,0) -- (0,20) node[left,scale=5.8]{Y};
\draw[fill=blue!60, draw=blue!60] (0,0) circle (0.8cm) node[left=1.1cm,blue,scale=5.8]{Z};
\draw[fill=blue!75, draw=blue!75] (0,0) circle (0.6cm);
\draw[fill=blue!100, draw=blue!100] (0,0) circle (0.25cm);

\end{scope}
\begin{scope}[xshift=40cm]

% PARAMETERS
\def\SECTIONHEIGHT{0.1}
\def\SECTIONWIDTH{0.5}

\def\VISUALRATIO{1}

\def\HEIGHTTOTAL{60}
\def\WIDTHTOTAL{60}
\def\LINESNUMBER{10}

% projection parameters
\def\ISOX{0.75}
\def\ISOY{0.55}
\def\ISOZ{1.1}

% derived parameter
\pgfmathsetmacro{\xstep}{\WIDTHTOTAL/(\LINESNUMBER-1)}
\pgfmathsetmacro{\halfwidth}{\SECTIONWIDTH*\VISUALRATIO/2} %%%
\pgfmathsetmacro{\scaledheight}{\SECTIONHEIGHT*\VISUALRATIO}

% projection
\newcommand{\iso}[3]{({#1 + \ISOX*#2},{\ISOY*#2 + \ISOZ*#3})}

% filament segment
\newcommand{\filamentsegment}[4]{%
% #1 x1
% #2 y1
% #3 x2
% #4 y2

% offset for width
\pgfmathsetmacro{\dx}{#4-#2}
\pgfmathsetmacro{\dy}{-(#3-#1)}
\pgfmathsetmacro{\norm}{sqrt(\dx*\dx+\dy*\dy)}
\pgfmathsetmacro{\ox}{\halfwidth*\dx/\norm}
\pgfmathsetmacro{\oy}{\halfwidth*\dy/\norm}

% top
\fill[orange!60]
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{\scaledheight} --
\iso{#3+\ox}{#4+\oy}{\scaledheight} -- cycle;

% right side
\fill[orange!50]
\iso{#3+\ox}{#4+\oy}{0} --
\iso{#3+\ox}{#4+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{0} -- cycle;

% left side
\fill[orange!40]
\iso{#1-\ox}{#2-\oy}{0} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{0} -- cycle;

% front
\fill[orange!60]
\iso{#1-\ox}{#2-\oy}{0} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{0} -- cycle;
}

% path generation
\pgfmathsetmacro{\x}{0}
\pgfmathsetmacro{\y}{0}

\foreach \i in {1,...,\numexpr\LINESNUMBER-1\relax} {

    \pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
    \let\ynew\pgfmathresult

    \pgfmathsetmacro{\xnew}{\x+\xstep}

    \filamentsegment{\x}{\y}{\x}{\ynew}
    \filamentsegment{\x}{\ynew}{\xnew}{\ynew}

    \xdef\x{\xnew}
    \xdef\y{\ynew}
}

\pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
\let\ynew\pgfmathresult

\filamentsegment{\x}{\y}{\x}{\ynew}

% AXES
\draw[ultra thick,red, -Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{20}{0}{0}
    node[above,scale=5.8]{X};

\draw[ultra thick,green!70!black,-Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{0}{20}{0}
    node[left,scale=5.8]{Y};

\draw[ultra thick,blue,-Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{0}{0}{10}
    node[above,scale=5.8]{Z};

	\end{scope}
\end{tikzpicture}
{{< /tikz >}}


{{<details summary="Latex TikZ код рисунка">}}
```latex
\begin{tikzpicture}\begin{scope}[scale=0.6]

% PARAMETERS
\def\SECTIONHEIGHT{0.1}
\def\SECTIONWIDTH{0.5}
\def\VISUALRATIO{1}  % визуальный коэффициент

\def\HEIGHTTOTAL{60}
\def\WIDTHTOTAL{60}
\def\LINESNUMBER{11}

% derived parameter
\pgfmathsetmacro{\xstep}{\WIDTHTOTAL/(\LINESNUMBER-1)}

% Команда для рисования сегмента как прямоугольника с контуром
\newcommand{\filamentrect}[4]{%
    % #1 x1, #2 y1, #3 x2, #4 y2

    \pgfmathsetmacro{\dx}{#3-#1}
    \pgfmathsetmacro{\dy}{#4-#2}
    \pgfmathsetmacro{\norm}{sqrt(\dx*\dx+\dy*\dy)}

    \pgfmathsetmacro{\ox}{\SECTIONWIDTH*\VISUALRATIO/2 * \dy/\norm}
    \pgfmathsetmacro{\oy}{-\SECTIONWIDTH*\VISUALRATIO/2 * \dx/\norm}

    % Прямоугольник с заливкой и контуром
    \filldraw[fill=orange!30, draw=orange!80!black, line width=0.5mm]
        (#1+\ox,#2+\oy) -- (#1-\ox,#2-\oy) -- (#3-\ox,#4-\oy) -- (#3+\ox,#4+\oy) -- cycle;
}

% path generation
\pgfmathsetmacro{\x}{0}
\pgfmathsetmacro{\y}{0}

\foreach \i in {1,...,\numexpr\LINESNUMBER-1\relax} {
    % determine new y
    \pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
    \let\ynew\pgfmathresult

    % determine new x
    \pgfmathsetmacro{\xnew}{\x+\xstep}

    % рисуем сегменты как прямоугольники
    \filamentrect{\x}{\y}{\x}{\ynew}
    \filamentrect{\x}{\ynew}{\xnew}{\ynew}

    % update variables
    \xdef\x{\xnew}
    \xdef\y{\ynew}
}

% final vertical segment
\pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
\let\ynew\pgfmathresult
\filamentrect{\x}{\y}{\x}{\ynew}

% AXES
\draw[ultra thick,red,-Stealth,line width=12pt] (0,0) -- (20,0) node[above left,scale=5.8]{X};
\draw[ultra thick,green!70!black,-Stealth,line width=12pt] (0,0) -- (0,20) node[left,scale=5.8]{Y};
\draw[fill=blue!60, draw=blue!60] (0,0) circle (0.8cm) node[left=1.1cm,blue,scale=5.8]{Z};
\draw[fill=blue!75, draw=blue!75] (0,0) circle (0.6cm);
\draw[fill=blue!100, draw=blue!100] (0,0) circle (0.25cm);

\end{scope}
\begin{scope}[xshift=40cm]

% PARAMETERS
\def\SECTIONHEIGHT{0.1}
\def\SECTIONWIDTH{0.5}

\def\VISUALRATIO{1}

\def\HEIGHTTOTAL{60}
\def\WIDTHTOTAL{60}
\def\LINESNUMBER{10}

% projection parameters
\def\ISOX{0.75}
\def\ISOY{0.55}
\def\ISOZ{1.1}

% derived parameter
\pgfmathsetmacro{\xstep}{\WIDTHTOTAL/(\LINESNUMBER-1)}
\pgfmathsetmacro{\halfwidth}{\SECTIONWIDTH*\VISUALRATIO/2} %%%
\pgfmathsetmacro{\scaledheight}{\SECTIONHEIGHT*\VISUALRATIO}

% projection
\newcommand{\iso}[3]{({#1 + \ISOX*#2},{\ISOY*#2 + \ISOZ*#3})}

% filament segment
\newcommand{\filamentsegment}[4]{%
% #1 x1
% #2 y1
% #3 x2
% #4 y2

% offset for width
\pgfmathsetmacro{\dx}{#4-#2}
\pgfmathsetmacro{\dy}{-(#3-#1)}
\pgfmathsetmacro{\norm}{sqrt(\dx*\dx+\dy*\dy)}
\pgfmathsetmacro{\ox}{\halfwidth*\dx/\norm}
\pgfmathsetmacro{\oy}{\halfwidth*\dy/\norm}

% top
\fill[orange!60]
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{\scaledheight} --
\iso{#3+\ox}{#4+\oy}{\scaledheight} -- cycle;

% right side
\fill[orange!50]
\iso{#3+\ox}{#4+\oy}{0} --
\iso{#3+\ox}{#4+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{0} -- cycle;

% left side
\fill[orange!40]
\iso{#1-\ox}{#2-\oy}{0} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{\scaledheight} --
\iso{#3-\ox}{#4-\oy}{0} -- cycle;

% front
\fill[orange!60]
\iso{#1-\ox}{#2-\oy}{0} --
\iso{#1-\ox}{#2-\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{\scaledheight} --
\iso{#1+\ox}{#2+\oy}{0} -- cycle;
}

% path generation
\pgfmathsetmacro{\x}{0}
\pgfmathsetmacro{\y}{0}

\foreach \i in {1,...,\numexpr\LINESNUMBER-1\relax} {

    \pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
    \let\ynew\pgfmathresult

    \pgfmathsetmacro{\xnew}{\x+\xstep}

    \filamentsegment{\x}{\y}{\x}{\ynew}
    \filamentsegment{\x}{\ynew}{\xnew}{\ynew}

    \xdef\x{\xnew}
    \xdef\y{\ynew}
}

\pgfmathparse{\y<0.001 ? \HEIGHTTOTAL : 0}
\let\ynew\pgfmathresult

\filamentsegment{\x}{\y}{\x}{\ynew}

% AXES
\draw[ultra thick,red, -Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{20}{0}{0}
    node[above,scale=5.8]{X};

\draw[ultra thick,green!70!black,-Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{0}{20}{0}
    node[left,scale=5.8]{Y};

\draw[ultra thick,blue,-Stealth,line width=12pt]
    \iso{0}{0}{0} -- \iso{0}{0}{10}
    node[above,scale=5.8]{Z};

	\end{scope}
\end{tikzpicture}
```
{{</details>}}


Модель параметризирована, можно менять количество дорожек, ширину и высоту дорожки, а также ширину и длину проверяемой рабочей зоны стола.


```python
import FreeCAD
import PartDesign
import PartDesignGui
import Sketcher
import os


# PARAMETERS
EPS = 1E-3

SECTION_HEIGHT = 0.1  #[MM]
SECTION_WIDTH = 0.5  #[MM]

HEIGHT_TOTAL = 60  #[MM]
WIDTH_TOTAL = 60  #[MM]
LINES_NUMBER = 10  #minimum=2

x_step = WIDTH_TOTAL / (LINES_NUMBER - 1)


# MAKE DOCUMENT
App.newDocument().saveAs(os.path.join(os.curdir, "print_test.FCStd"))

document = App.activeDocument()


# SECTION SKETCH
document.addObject('PartDesign::Body','Body')
body = document.getObject('Body')
body.Label = 'Body'
body.newObject('Sketcher::SketchObject','SketchSection')
sketch_section = document.getObject('SketchSection')
sketch_section.AttachmentSupport = document.getObject('XZ_Plane')
sketch_section.MapMode = 'FlatFace'
document.recompute()

lastGeoId = len(sketch_section.Geometry)

geoList = []
geoList.append(Part.LineSegment(App.Vector(0, 0, 0.0),App.Vector(SECTION_WIDTH, 0, 0.0)))
geoList.append(Part.LineSegment(App.Vector(SECTION_WIDTH, 0, 0.0),App.Vector(SECTION_WIDTH, SECTION_HEIGHT, 0.0)))
geoList.append(Part.LineSegment(App.Vector(SECTION_WIDTH, SECTION_HEIGHT, 0.0),App.Vector(0, SECTION_HEIGHT, 0.0)))
geoList.append(Part.LineSegment(App.Vector(0, SECTION_HEIGHT, 0.0),App.Vector(0, 0, 0.0)))
document.recompute()

sketch_section.addGeometry(geoList,False)


# PATH SKETCH 
document.addObject('Sketcher::SketchObject', 'SketchPath')
sketch_path = document.getObject('SketchPath')

sketch_path.AttachmentSupport = document.getObject('XY_Plane')
sketch_path.MapMode = "Deactivated"
document.recompute()

lastGeoId = len(sketch_path.Geometry)

geoList = []
x = 0
y = 0
for _ in range(LINES_NUMBER - 1):
	y_new = HEIGHT_TOTAL if (y<EPS) else 0
	x_new = x + x_step
	geoList.append(Part.LineSegment(App.Vector(x, y , 0.0), App.Vector(x, y_new, 0.0)))
	geoList.append(Part.LineSegment(App.Vector(x, y_new , 0.0), App.Vector(x_new, y_new, 0.0)))
	
	y = y_new
	x = x_new

y_new = HEIGHT_TOTAL if (y<EPS) else 0
geoList.append(Part.LineSegment(App.Vector(x, y , 0.0), App.Vector(x, y_new, 0.0)))

sketch_path.addGeometry(geoList,False)
document.recompute()


# ADDITIVE PIPE
body.newObject('PartDesign::AdditivePipe','AdditivePipe')
pipe = document.getObject('AdditivePipe')
pipe.Profile = document.getObject('SketchSection')
pipe.Spine = (document.getObject('SketchPath'),[])
pipe.Transition = u"Right corner"
document.recompute()


# EXPORT STL FILE
stl_path = os.path.join(os.path.abspath(os.curdir), "print_test.stl")
__objs__ = []
__objs__.append(body)
if hasattr(Mesh, "exportOptions"):
    options = Mesh.exportOptions(stl_path)
    Mesh.export(__objs__, stl_path, options)
else:
    Mesh.export(__objs__, stl_path)

del __objs__


# SAVE AND CLOSE DOCUMENT
document.recompute()
document.save()
FreeCAD.closeDocument(document.Name)
```


