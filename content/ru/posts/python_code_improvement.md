+++
date = '2025-07-07T23:19:25+05:00'
draft = true
title = 'Улучшение кода'
math = true
tags = ["Python", "Информатика", "Основы программирования"]
categories = ['Основы программирования']
+++
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