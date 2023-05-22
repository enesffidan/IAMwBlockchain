const UserFactory = artifacts.require("UserFactory");

module.exports = function (deployer) {

    deployer.deploy(UserFactory)
};