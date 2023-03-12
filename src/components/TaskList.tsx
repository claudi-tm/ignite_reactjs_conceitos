import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");

	function handleCreateNewTask() {
		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
		const generated_id = () => {
			let values: string = "";
			for (let x = 0; x < 3; x++) {
				values = values.concat(
					Math.floor(Math.random() * 10).toString()
				);
			}
			return values;
		};

		if (newTaskTitle) {
			const new_task: Task = {
				id: Number(generated_id()),
				title: newTaskTitle,
				isComplete: false,
			};
			setTasks([...tasks, new_task]);
		} else {
			alert("Campo de input não pode estar vazio");
		}
	}

	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
		let modified_obj_index = tasks.findIndex((task) => task.id === id);
		tasks[modified_obj_index].isComplete
			? (tasks[modified_obj_index].isComplete = false)
			: (tasks[modified_obj_index].isComplete = true);
		setTasks([...tasks]);
	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID
		let modified_arr = tasks.filter((task) => task.id !== id);
		setTasks(modified_arr);
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input
						type="text"
						placeholder="Adicionar novo todo"
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button
						type="submit"
						data-testid="add-task-button"
						onClick={handleCreateNewTask}
					>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div
								className={task.isComplete ? "completed" : ""}
								data-testid="task"
							>
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() =>
											handleToggleTaskCompletion(task.id)
										}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button
								type="button"
								data-testid="remove-task-button"
								onClick={() => handleRemoveTask(task.id)}
							>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
