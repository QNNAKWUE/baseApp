import List from '../models/List';

class ListController {
  static async createListController(req, res) {
    const { name } = req.body;
    const userId = req.user.id;
    try {
      const findListName = List.find((ListName) => ListName === name);
      if (findListName) {
        res.status(400).send({
          status: 'failed',
          message: 'List name already exist',
        });
      }

      const newList = {
        id: (List.length + 1),
        name,
        createdAt: Date.now(),
        userId,
      };

      List.push(newList);

      return res.status(200).send({
        status: 'success',
        message: 'List created successfully',
        data: {
          id: newList.id,
          name: newList.name,
          createdAt: new Date(),
          userId: newList.req.user.id,
        },
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        message: 'Server error',
      });
    }
  }

  static async getAllList(req, res) {
    const { userId } = req.user.id;
    try {
      const list = await List.find((mylist) => mylist.userId === userId).sort();
      if (!list) {
        return res.status(404).send({
          status: 'failed',
          message: 'Could not get List',
        });
      }
      return res.status(200).send({
        status: 'success',
        message: 'List fetched successfully',
        data: list,
      });
    } catch (err) {
      return res.status(500).send({
        status: 'failed',
        message: 'Server error',
      });
    }
  }

  static async getListById(req, res) {
    const { id } = req.params;
    try {
      const getList = List.find((list) => list.id === Number(id));
      if (!getList) return res.status(404).send({ status: 'failed', message: "The list with the given id wasn't found" });
      return res.status(200).send({ status: 'success', message: 'List fetched successfully' });
    } catch (err) {
      return res.status(500).send({
        status: 'failed',
        message: 'Server error',
      });
    }
  }

  static async updateList(req, res) {
    const { name } = req.body.name;
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const findList = List.find((list) => list.id === id && list.userId === userId);
      if (!findList) return res.status(404).send({ status: 'failed', message: 'Could not update list' });
      const updateList = {
        name, userId, createdAt: findList.createdAt, updatedAt: new Date(),
      };
      List.splice(id, 1, updateList);
      return res.status(200).send({ status: 'success', message: `${findList.name} updated successfully`, updateList });
    } catch (err) {
      return res.status(500).send({
        status: 'failed',
        message: 'Server error',
      });
    }
  }

  static async deleteList(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const findList = List.find((list) => list.id === id && list.userId === userId);
      if (!findList) return res.status(404).send({ status: 'failed', message: 'Could not delete list' });
      List.filter((mylist) => mylist.id !== id);
      return res.status(200).send({ status: 'success' });
    } catch (err) {
      return res.status(500).send({
        status: 'failed',
        message: 'Server error',
      });
    }
  }
}

export default ListController;
