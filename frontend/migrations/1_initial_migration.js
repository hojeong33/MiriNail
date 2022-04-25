const Migrations = artifacts.require("Migrations");
const NailDesigns = artifacts.require("NailDesigns")

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NailDesigns);
};
