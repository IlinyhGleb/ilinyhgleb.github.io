+++
date = '2025-07-07T23:19:25+05:00'
draft = true
title = 'Улучшение кода'
math = true
tags = ["Python", "Информатика", "Основы программирования"]
categories = ['Основы программирования']
+++

<!--more-->
было:
```Python
        # Применяем все правила
        for file_mapping in mappings:
            for rule in file_mapping['rules']:  # проход по правилам
                data = processed_data.get(id(rule), [])  # получаем данные из нужного правила
                if file_number < len(data):
                    target_sheet_name = rule['target'].get('sheet')
                    target_sheet = new_wb[target_sheet_name] if target_sheet_name else new_wb.active
                    if rule.get('target').get('append') and rule['target']['append']:
                        data[file_number] = (target_sheet[rule['target']['cell']].value or "") + " " + data[file_number]
                    target_sheet[rule['target']['cell']] = data[file_number]
```
стало:
```Python
        # Применяем все правила
        for file_mapping in mappings:
            for rule in file_mapping['rules']:  # проход по правилам
                data = processed_data.get(id(rule), [])  # получаем данные из нужного правила
                if file_number >= len(data):
                    continue
                target_sheet_name = rule['target'].get('sheet')
                target_sheet = new_wb[target_sheet_name] if target_sheet_name else new_wb.active
                if rule.get('target').get('append') and rule['target']['append']:
                    data[file_number] = (target_sheet[rule['target']['cell']].value or "") + " " + data[file_number]
                target_sheet[rule['target']['cell']] = data[file_number]
```


было:
```Python
    for root, dirs, files in os.walk(root_dir):
        if dir_callback is not None:
            if dir_filter is None or dir_filter(root):
                res, err = safe_dir_callback(root)
```

стало:
```Python
    for root, dirs, files in os.walk(root_dir):
        if dir_callback is None:
            continue            
        if dir_filter is not None and not dir_filter(root):
            continue        
        res, err = safe_dir_callback(root)
```



было:
```Python
def get_units_coefficient(units):
    units_coefficient = 1
    if units == 'mm':
        units_coefficient = 1e-3
    elif units == 'cm':
        units_coefficient = 1e-2
    elif units == 'km':
        units_coefficient = 1e3
    elif units == 'mkm':
        units_coefficient = 1e-6
    elif units == 'GPa':
        units_coefficient = 1e9
    elif limb.find('units').text == 'atm':
        units_coefficient = 101325
    return units_coefficient
```

стало:
```Python
    for root, dirs, files in os.walk(root_dir):
        if dir_callback is None:
            continue            
        if dir_filter is not None and not dir_filter(root):
            continue        
        res, err = safe_dir_callback(root)
```

