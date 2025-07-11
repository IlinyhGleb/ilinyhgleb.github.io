+++
date = '2025-07-01T13:59:36+05:00'
draft = true
title = 'Циклические алгоритмы'
[params]
  math = true
tags = ["Python", "Информатика", "Основы программирования"]
weight = 5
+++

<!--more-->

### Предисловие
[//]: # (TODO объяснить ранее, что такое выражение) 
[//]: # (TODO чекнуть в справочнике определение цикла) 

Цикл - это специальное выражение в тексте программы, которое позволяет выполнять часть кода несколько раз

Циклы очень полезны в программировании, поскольку они позволяют не прописывать вручную одну и ту же операцию несколько раз. 

Допустимнам надо вывести на экран числа от 1 до 15, как бы это выглядело без циклов:
```python
print(1)
print(2)
print(3)
print(4)
print(5)
print(6)
print(7)
print(8)
print(9)
print(10)
print(11)
print(12)
print(13)
print(14)
print(15)
```

Решение этой же задачи с помощью цикла выглядит следующим образом:
```python
for i in range(1,16):
  print(i)
```

Согласитесь, что это намного

## Задача с предусловием (while)
```python

```

## Задача с счётчиком (for)
```python

```

### Общая схема цикла с предусловием (for)
```python

```

## Задача с постусловием (until)
```python

```

## Операторы управления циклом
```python

```

## Операторы управления циклом

Посчитать сумму первых \textbf{N} членов ряда до точности \\(\textbf{EPS} \\):

display inline \\( f(x) = x^2 \\)

display block 
$$ \sum_{i=1}^{\infty} \left(-1\right)^{i+1}\frac{1}{i}=\sum_{i=1}^{\infty} a_i=1-\frac{1}{2}+\frac{1}{3}-\frac{1}{4}+...  $$

```python
EPS = 1e-3
n = 1000
i = 1
summa = 0
while i < n:
  a_i = (-1)**(i + 1) / i
  summa += a_i
  if abs(a_i) < EPS:
    print(f"На {i}-oм∟шаге∟получена∟сумма∟{summa}∟точностью∟{EPS}")
    break
  i += 1
else:
  print(f"По∟окончанию∟цикла∟был∟получен∟результат∟{summa}")
```


## Задача с перебором массива (for each)
По массиву долгов студентов посчитать количество студентов на отчисление, у которых 3 и более долгов.
         
```python
debts = [5, 0, 1, 0, 9, 0, 0, 3, 0, 0, 0, 0, 1]
students_to_explusion = 0

for debt in debts:
    if debt >= 3:
        students_to_explusion += 1

print(f"На отчисление {students_to_explusion} студентов")

```
