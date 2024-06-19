const Task = require("../models/taskModel");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
	try {
		const {
			user,
			title,
			description,
			adddate,
			duedate,
			priority,
			completed,
		} = req.body;
		const newTask = new Task({
			user,
			description,
			title,
			adddate,
			duedate,
			priority,
			completed,
		});
		await newTask.save();
		res.status(201).json(newTask);
	} catch (error) {
		res.status(201).json({ message: error.message });
	}
};

exports.getTaskByUser = async (req, res) => {
	const userId = req.params.id;
	let AllTasks;
	let userTask;

	try {
		AllTasks = await Task.find();
		userTask = AllTasks?.filter((task) => task?.user === userId);
		console.log(userId);
		res.json(userTask);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateStatus = async (req, res) => {
	try {
		const { id } = req.params;
		// const { completed } = req.body;
		const currentStatus = await Task.findById(id);

		const updatedStatus = await Task.findByIdAndUpdate(
			id,
			{ completed: !currentStatus.completed },
			{ new: true }
		);
		res.json(updatedStatus);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, duedate, priority } = req.body;
		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{ title, description, duedate, priority },
			{ new: true }
		);
		res.json(updatedTask);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		await Task.findByIdAndDelete(id);
		res.status(200).json({ message: "Task Deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
