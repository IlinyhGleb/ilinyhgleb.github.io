+++
date = '2025-07-01T14:00:02+05:00'
draft = true
title = 'Функции в Python'
math = true
tags = ["Python", "Информатика", "Основы программирования"]
categories = ['Основы программирования']
courses = ['Основы программирования']
+++

<!--more-->

## 1. Что такое функция?


Функция - это именованный блок кода, который выполняет определенную задачу и может быть вызван из других частей программы.

**Основные характеристики:**
- Выполняется только при вызове
- Может принимать аргументы
- Может возвращать результат
- Улучшает читаемость и структуру кода

![Структура функции](function_structure.png)

Пример простой функции:
```python
def sum(x, y):
    return x + y
```

## 2. Зачем нужны функции?

**Пример задачи:** Вычислить выражение:
$$y(x)=\frac{x^2}{2!}+\frac{x^4}{4!}+\frac{x^6}{6!}$$

**Решение без функции:**
```python
fact1 = 1
for i in range(1, 3):
    fact1 *= i

fact2 = 1
for i in range(1, 5):
    fact2 *= i

fact3 = 1
for i in range(1, 7):
    fact3 *= i

y = x**2/fact1 + x**4/fact2 + x**6/fact3
```

**Решение с функцией:**
```python
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

y = x**2/factorial(2) + x**4/factorial(4) + x**6/factorial(6)
```

## 3. Типы функций

### 3.1. По области видимости

**Глобальные функции:**
- Доступны из любой части кода
- Определяются на уровне модуля

**Локальные функции:**
- Определяются внутри других функций
- Видимы только внутри родительской функции

Пример:
```python
def task1():  # Глобальная
    x = float(input("Введите x: "))
    
    def f(x):  # Локальная
        return x**5/factorial(5)
    
    print(f"f(x) = {f(x):.2f}")

task1()
print(f"3! = {factorial(3)}")  # Глобальная функция доступна
```

### 3.2. Лямбда-функции
Анонимные функции, определяемые через `lambda`:

```python
# Обычная функция
def search_len(arg_1):
    return len(arg_1)

# Лямбда-функция
result = lambda x: len(x)
```

### 3.3. Методы
Функции, привязанные к объектам:
```python
math.cos()  # Метод модуля math
list.append()  # Метод списка
```

## 4. Продвинутые возможности

### 4.1. Функции как аргументы

Функции можно передавать как аргументы другим функциям:

```python
import math
import matplotlib.pyplot as plt

def func_plot(f, start, end):
    DOTS_NUMBER = 10
    step = (end - start)/(DOTS_NUMBER - 1)
    x = [start + step*i for i in range(DOTS_NUMBER)]
    y = [f(xi) for xi in x]
    
    plt.plot(x, y)
    plt.grid()
    plt.show()

# Использование
func_plot(math.cos, -3, 3)
func_plot(lambda x: x**3 + 5, -2, 5)
```

### 4.2. Рекурсия

Функция, вызывающая саму себя:

```python
def factorial(n):
    if n == 0:  # Базовый случай
        return 1
    else:
        return n * factorial(n - 1)
```

**Плюсы рекурсии:**
- Упрощает решение сложных задач
- Делает код чище и понятнее

**Минусы:**
- Требует больше ресурсов
- Риск переполнения стека

### 4.3. Аргументы функций

**Значения по умолчанию:**
```python
def func_plot(f, start=0, end=1):
    # ...
    
func_plot(math.cos)  # Использует start=0, end=1
```

**Произвольное число аргументов:**
```python
def sum(*args):  # args - кортеж
    return sum(args)

def print_kwargs(**kwargs):  # kwargs - словарь
    print(kwargs)
```

## 5. Документирование функций

Рекомендуется добавлять docstring для описания функции:

```python
def vector_to_str(vector):
    '''
    Преобразует вектор в строку для вывода
    
    :param vector: исходный вектор (list)
    :return: строка представления вектора (str)
    '''
    return '[' + ', '.join(f'{item:.2f}' for item in vector) + ']'
```

