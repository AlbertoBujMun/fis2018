var chai = require("chai");
var mongoose = require("mongoose");
var Proyecto = require("../proyectos");
var expect = chai.expect;

describe("Proyecto DB connection", () => {
  before(done => {
    var dbUrl = process.env.DB || "mongodb://localhost/test";

    mongoose.connect(dbUrl);
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      done();
    });
  });

  beforeEach(done => {
    Proyecto.deleteMany({}, err => {
      done();
    });
  });

  it("writes a proyecto in the DB", done => {
    var proyecto = new Proyecto({ name: "pepe", phone: 888 });
    contact.save((err, contact) => {
      expect(err).is.null;
      Contact.find({}, (err, contacts) => {
        expect(contacts).to.have.lengthOf(1);
        // More "expects" could be done
        done();
      });
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
