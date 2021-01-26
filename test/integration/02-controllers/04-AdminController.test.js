const supertest = require('supertest');
const Async = require('async');

describe('AdminController', function () {

    let cookie;

    describe('TC2900 - Admin page-search: # apply_search()', function () {
        it('Should return the searched results in body', function (done) {
            supertest(sails.hooks.http.app)
                .get('/admin/applyHandle/search?application=GRGS&category=&payStatus=unpaid&formStatus=ToBeCon&teamStatus=suTeam')
                .expect(302, done);
        })
    });
});