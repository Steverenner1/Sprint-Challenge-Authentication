const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Users = require("../users/usersModel.js");

describe("auth-router.js", () => {
  describe("POST /api/register", () => {
    describe("register()", () => {
      beforeEach(async () => {
        await db("users").truncate();
      });

      it("should add users to the db", async () => {
        await Users.add({ username: "steve", password: "sr" });

        let users = await db("users");

        expect(users).toHaveLength(1);
      });
    });
    
    describe('server', function() {
        describe('POST /', function() {
            it('should return 200 OK', function() {
                return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
            
            it('should return JSON formatted response', function() {
                return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
    
    
            });
        });
    });
  });
});