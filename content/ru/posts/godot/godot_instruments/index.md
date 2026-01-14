+++
date = '2026-06-01T14:00:28+05:00'
draft = true
title = 'Инструменты для работы в Godot'
math = true
tags = ["Godot"]
categories = ['Godot']
+++

<!--more-->

https://github.com/godotengine/godot-git-plugin/wiki/Git-plugin-v3

https://gut.readthedocs.io/en/9.3.1/Parameterized-Tests.html
интеграционный тест в Godot 4.5.1
```
extends GutTest

var player: Player
var walk_state
const EPSILON := 1.0
const EPSILON_VECTOR := Vector2(EPSILON, EPSILON)

func before_each():
	player = preload("res://scenes/characters/player/player.tscn").instantiate()
	player.global_position = Vector2.ZERO
	add_child_autofree(player)

	await get_tree().process_frame

	# получаем walk_state из FSM
	walk_state = player.get_node("StateMachine/walk")


func test_player_moves_right():
	const TARGET_DISTANCE: float = 100.0
	const EXPECTED_VECTOR = Vector2(100.0, 0)
	const SECONDS: float = 5
	var player_target_position: Vector2

	# задаём цель справа
	player.target_position = Vector2(TARGET_DISTANCE, 0)
	player.has_target = true
	player.can_move = true

	# симулируем несколько секунд
	await PhysicsSimulationHelper.simulate(get_tree(), walk_state, {"seconds": SECONDS})
	player_target_position = player.target_position

	# проверяем, что игрок пошёл вправо
	assert_almost_eq(
		player_target_position,
		EXPECTED_VECTOR,
		EPSILON_VECTOR)
```

параметризованный тест:
```

extends GutTest

var player: Player
var walk_state
const EPSILON := 1.0
const EPSILON_VECTOR := Vector2(EPSILON, EPSILON)

func before_each():
	player = preload("res://scenes/characters/player/player.tscn").instantiate()
	player.global_position = Vector2.ZERO
	add_child_autofree(player)

	await get_tree().process_frame

	# получаем walk_state из FSM
	walk_state = player.get_node("StateMachine/walk")


var foo_params = ParameterFactory.named_parameters(
	['target_vector'],       # имена параметров
	[                        # значения параметров
		[Vector2(100.0, 0)],
		[Vector2(0, 100.0)],
		[Vector2(-20.0, 0)],
		[Vector2(0, -20.0)],
		[Vector2(200.0, 200.0)],
		[Vector2(-50.0, -50.0)],
		[Vector2(0.0, 0.0)],
	])

func test_player_moves_to_target(params = use_parameters(foo_params)):
	const SECONDS: float = 5
	var player_target_position: Vector2

	# задаём цель
	player.target_position = params.target_vector
	player.has_target = true
	player.can_move = true

	# симулируем несколько секунд
	await PhysicsSimulationHelper.simulate(get_tree(), walk_state, {"seconds": SECONDS})
	player_target_position = player.target_position

	# проверяем, что игрок оказался близ цели
	assert_almost_eq(
		player_target_position,
		params.target_vector,
		EPSILON_VECTOR)

```
