+++
date = '2025-12-24T08:00:00+05:00'
draft = true
title = 'Запуск Ansys Fluent в Batch режиме'
math = true
tags = ["Ansys", "Fluent", "APDL", "гидродинамика"]
+++

<!--more-->

Для запуска нужно в командной строке (cmd.exe или powershell) ввести команды две команды. 
- Первая - переключение на рабочую директорию. 
- Вторая - запуск программы Fluent.
Пример запуска:
```
cd d:\answork
"%AWP_ROOT212%\fluent\ntbin\win64\fluent.exe" 3d -g -i test.scm
```
%AWP_ROOT212% - переменная среды, в которой записан адрес директории ANSYS текущей версии, например
```
C:\Program Files\ANSYS Inc\v212
```
- 3d можно заменить на 2d, если задача плоская. 
- -g - ключ обозначает, что программа будет запущена без отображения графической оболочки, т.е. в фоне
- -i - входящий файл команд (input file), например test.scm:
```scheme
(define out (open-output-file "text_file_from_fluent.dat"))
(display "test text from fluent" out)
(newline out)
(close-output-port out)
(ti-menu-load-string "exit y")
```
такой файл создаёт текстовый файл text_file_from_fluent.dat, в котором записан текст:
```
test text from fluent
```
для того, чтобы файл test.scm был запущен, он предварительно должен быть помещён в рабочую директорию.
