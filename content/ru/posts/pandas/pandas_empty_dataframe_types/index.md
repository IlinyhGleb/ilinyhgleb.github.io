+++
date = '2026-01-27T12:00:00+05:00'
draft = true
title = 'Создание пустого DataFrame с заданными типами столбцов в Pandas'
tags = ['pandas', 'python']
+++

<!--more-->

### Проблема

Проблема заключается в том, что в `pd.DataFrame()` нельзя явным образом назначить разные типы данных столбцам пустого DataFrame.

При этом в **pandas** часто возникает задача создать **пустой DataFrame**, но сразу с **явно заданными типами столбцов**.  

Наивное решение выглядит примерно так:

```python
df1 = pd.DataFrame(columns=['ID', 'first', 'second', 'third'])

for column in ['first', 'second']:
    df1[column] = df1[column].astype(float)

for column in ['ID', 'third']:
    df1[column] = df1[column].astype("string")

print(df1.dtypes)
````

вывод:
```bash
ID         string
first     float64
second    float64
third      string
dtype: object
```
Это рабочий вариант, однако каждый новый тип требует нового цикла, а каждый новый столбец требует расширения используемых в циклах списков. А главная проблема заключается в том, что функциональная часть кода и входные данные находятся в одном и том же месте.

---

### Решение 1 — создание DataFrame через `pd.Series(dtype=...)`

Самый прямолинейный и наглядный способ:

```python
df1 = pd.DataFrame({
    'ID': pd.Series(dtype='string'),
    'first': pd.Series(dtype='float64'),
    'second': pd.Series(dtype='float64'),
    'third': pd.Series(dtype='string')
})

print(df1.dtypes)
```

вывод:
```bash
ID         string
first     float64
second    float64
third      string
dtype: object
```

минусом является дублирование вызова функции ```pd.Series()```.

---

### Решение 2 — использование отдельной схемы типов столбцов и вспомогательной функции создания DataFrame

Для более масштабных случаев удобно использовать в вспомогательную функцию:

```python
def empty_df(schema: dict) -> pd.DataFrame:
    return pd.DataFrame({
        col: pd.Series(dtype=dtype)
        for col, dtype in schema.items()
    })
```

в которой можно использовать схему типизации столбцов как подгружаемый словарь. 

Использование:

```python
schema = {
    'ID': 'string',
    'first': 'float64',
    'second': 'float64',
    'third': 'string'
}

df1 = empty_df(schema)
print(df1.dtypes)
```
вывод:

```bash
ID         string
first     float64
second    float64
third      string
dtype: object
```

Таким образом, входные данные отделены от функционала создания DataFrame.

---

### Расширение схемы на основе существующего DataFrame

В случае, если нужно взять все столбцы и типы из другого DataFrame `df2`:

```python
df2 = empty_df({
    'fourth': 'float64',
    'fifth': 'int64',
})
```
и при этом добавить новые столбцы, можно расширить схему:

```python
# новые столбцы
schema = {
    'ID': 'string',
    'first': 'float64',
    'second': 'float64',
    'third': 'string'
}
# схема из df2
schema_df2 = df2.dtypes.to_dict()

# объединяем схемы
schema = {**schema, **schema_df2}

# создаём пустой DataFrame
df1 = empty_df(schema)
print(df1.dtypes)
```

вывод:
```bash
ID         string
first     float64
second    float64
third      string
fourth    float64
fifth       int64
dtype: object
```
