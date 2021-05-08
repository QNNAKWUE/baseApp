import List from '../models/List';

class ListController{
    static async createListController(req, res){
        const {name, createdAt, userId} = req.body;
        try{
            const findListName = await List.find((findListName) => req.body.name === name);
            if(findListName) {
                res.status(400).send({
                    status: 'failed',
                    message: 'List name already exist'
                });

                const newList = {
                    id: (List.length + 1),
                    name,
                    createdAt: Date.now(),
                    userId: req.user.id
                }

                await List.push(newList);

                return res.status(200).send({
                    status: 'success',
                    message: 'List created successfully',
                    data: {
                        id: newList.id,
                        name: newList.name,
                        createdAt: Date.now(),
                        userId: newList.req.user.id
                    }
                })
            }
        }catch(err){
            return res.status(500).send({
                status: false,
                message: 'Server error'
            })
        }
    }

    static async getAllList(req, res){
        try{
            const list = await List.find().sort('name');
            if(!list){
                return res.status(404).send({
                    status: 'failed',
                    message: 'Could not get List'
                });
            }
            return res.status(200).send({
                status: 'success',
                message: 'List fetched successfully'
            });
        }catch(err){
            return res.status(500).send({
                status: 'failed',
                message: 'Server error'
            });
        }
    }

    static async getListById(req, res){
        const {id} = req.params;
        try{
            const getList = await List.findById(id);
            if(!getList) return res.status(404).send({status: 'failed', message: "The list with the given id wasn't found"});
            return res.status(200).send({status: 'success', message:'List fetched successfully'})
        }catch(err){
            return res.status(500).send({
                status: 'failed',
                message: 'Server error'
            });
        }
    }

    static async updateList(req, res){
        const { name } = req.body.name;
        const { id } = req.params;
        const { userId } = req.user.id;
        try{
            const list = await List.findByIdAndUpdate(req.user.id,{name: req.body.name}, {new: true});
            if(!list) return res.status(404).send({status: 'failed', message: 'Could not update list'});
            return res.status(200).send({status: 'success', message: `${list.name} updated successfully`, updateList});
    }catch(err){
        return res.status(500).send({
            status: 'failed',
            message: 'Server error'
        });
    }
}

static async deleteList(req, res){
    const { name } = req.body.name;
    const { id } = req.params;
    const { userId } = req.user.id;
    try{
        const list = await List.findByIdAndRemove(req.params).sort("name");
        if(!list) return res.status(404).send({status: 'failed', message: 'Could not delete list'});
        return res.status(200).send({status: 'success', message: `${list.name} deleted successfully`, deleteList});
}catch(err){
    return res.status(500).send({
        status: 'failed',
        message: 'Server error'
    });
}

}








}

export default ListController;

