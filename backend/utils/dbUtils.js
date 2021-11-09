const Db = require("../config/database");

const queryInterface = Db.getQueryInterface();
module.exports = async() => {
    await queryInterface.addConstraint('reactions', {
        fields: ['userId', 'postId'],
        type: 'unique',
        name: 'unique_reaction_per_user_per_post'
    });
}