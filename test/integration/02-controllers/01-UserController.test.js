const supertest = require('supertest');

describe('UserController', function () {

    describe('TC-100 - Login System: #login() with admin account', function () {
        it('should return status 200 with "Login successfully" in body', function (done) {
            supertest(sails.hooks.http.app)
                .post('/user/login')
                // The following two lines making the request as normal form submission instead of AJAX request
                .set('Accept', 'text/html,application/xhtml+xml,application/xml')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send("email=kenny@admin.com&password=hkbu123456")
                .expect(302, done);
        });
    });

    describe('TC200 - Login System: #login() with non-exists user account', function () {
        it('should return status 401 with "User not found" in body', function (done) {
            supertest(sails.hooks.http.app)
                .post('/user/login')
                .send("email=testing&password=123456")
                .expect(401, '找不到用戶', done);
        });
    });

    //describe('TC300 - Login System: #login() with empty', function () {
    //    it('should return status 403 with fail message and reminder tell user to enter information', function (done) {
    //        supertest(sails.hooks.http.app)
    //            .post('/user/login')
    //            .send("email=&password=")
    //            .expect(400, 'Bad Request', done);
    //   });
    //});

    //   describe('#logout()', function() {
    //     it('should return status 200 with "Log out successfully" in body', function (done) {
    //       supertest(sails.hooks.http.app)
    //       .get('/user/logout')
    //       .expect(200, '"Log out successfully"', done);
    //     });
    //   });

});