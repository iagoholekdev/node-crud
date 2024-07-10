// user/utils/AbstractCrud.js

const { Model } = require('sequelize');

class AbstractCrud {
    constructor(model) {
        if (!(model.prototype instanceof Model)) {
            throw new Error('Invalid model passed to AbstractCrud constructor');
        }
        this.model = model;
    }

    async create(entity) {
        try {
            const newEntity = await this.model.create(entity);
            return newEntity.toJSON();
        } catch (error) {
            throw new Error(`Error creating entity: ${error.message}`);
        }
    }

    async read(id) {
        try {
            const entity = await this.model.findByPk(id);
            if (!entity) {
                throw new Error(`Entity with id ${id} not found`);
            }
            return entity.toJSON();
        } catch (error) {
            throw new Error(`Error reading entity: ${error.message}`);
        }
    }

    async update(id, updater) {
        try {
            const entity = await this.model.findByPk(id);
            if (!entity) {
                throw new Error(`Entity with id ${id} not found`);
            }
            const updatedEntity = await entity.update(updater);
            return updatedEntity.toJSON();
        } catch (error) {
            throw new Error(`Error updating entity: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const entity = await this.model.findByPk(id);
            if (!entity) {
                throw new Error(`Entity with id ${id} not found`);
            }
            await entity.destroy();
        } catch (error) {
            throw new Error(`Error deleting entity: ${error.message}`);
        }
    }

    async readByField(fieldName, value) {
        try {
            const entities = await this.model.findAll({
                where: {
                    [fieldName]: value
                },
                attributes: ['id', 'firstName'] 
            });
            console.log(entities.map(entity => entity.toJSON()));
            return entities.map(entity => entity.toJSON());
        } catch (error) {
            throw new Error(`Error reading entities by ${fieldName}: ${error.message}`);
        }
    }

}

module.exports = AbstractCrud;