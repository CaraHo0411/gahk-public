describe('User (model) initial data', function () {

    describe('Admin user', function () {
        it('should find an User acting as "admin"', function (done) {
            User.find({ role: 'admin' })
                .then(function (users) {

                    if (users.length == 0) {
                        return done(new Error(
                            'Should return 1 user -- the admin ' +
                            'But instead, got: no user found'
                        ));
                    }
                    return done();
                })
                .catch(done);
        });
    });

    // describe('other user', function () {
    //     it('should find an User acting not as "admin"', function (done) {
    //         User.find({ role: { '!=': 'admin' } })
    //             .then(function (users) {

    //                 if (users.length == 0) {
    //                     return done(new Error(
    //                         'Should return at least 1 user ' +
    //                         'But instead, got: no user found'
    //                     ));
    //                 }
    //                 return done();
    //             })
    //             .catch(done);
    //     });
    // });

});