const BaseRepository = require('./base_repository');

class AddressRepo extends BaseRepository {
    async findOne(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.findOne(conditions);
    }

    async findAll(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.find(conditions);
    }

    async create(payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.create(payload);
    }

    async updateOne(conditions, payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.updateOne(conditions, payload);
    }

    async findDetailed(id) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.findOne({ _id: id, user_id: this.context.id })
            .populate('emergency_contacts');
    }

    async findNearby(conditions, coordinates, radius = 10) {
        const mongo = await this.getMongoInstance();
        return mongo.Address.findOne({
            ...conditions,
            geograph: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius
                }
            }
        });
    }
}

module.exports = AddressRepo;
