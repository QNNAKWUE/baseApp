import Task from '../models/Task';
import List from '../models/List';

class TaskController {
  static async createTask(req, res) {
    const { listId, name } = req.body;
    const userId = req.user.id;

    try {
      const findList = List.find((list) => list.id === listId && list.userId === userId);
      if (findList) {
        const task = {
          name,
          userId,
          listId: findList.id,
          completed: false,
        };

        const createTask = Task.push(task);

        return res.status(201).send({
          success: true,
          data: createTask,
        });
      }

      return res.status(400).send({
        success: false,
        message: 'List does not exist',
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        message: 'Server error',
      });
    }
  }
}

export default TaskController;
