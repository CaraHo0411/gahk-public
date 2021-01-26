const supertest = require('supertest');
const Async = require('async');

describe('GRGSController', function () {

    let cookie;

    describe('TC1000 - Application-GRGS: #GRGS_form()', function () {
        it('should send data to req.session.data for preview', function (done) {
            supertest(sails.hooks.http.app)
                .post('/competition/form/GRGS')
                .expect(200, done);
        });
    });

    describe('TC1100 - Application-GRGS-preview: #GRGS_form_preview()', function () {
        it('Should return 200 and show the success message("提交成功!! Successfully Submitted!") in body', function (done) {
            supertest(sails.hooks.http.app)
                .post('/competition/form/GRGS')
                .send("GRGS[teamName]=香港中學第一隊 & GRGS[phone]=23456789 & GRGS[email]=hkschoolteamone@gmail.com & GRGS[coachName]=歐陽宥 & GRGS[coachPhone]=98765432 & GRGS[category]=集體 A 組(五人圈操) & GRGS[havecname1]=是 Yes & GRGS[chiName1]=陳大文 & GRGS[engName1]=Chan Tai Man & GRGS[ID1]=A123456(1) & GRGS[birth1]=2013-01-12 & GRGS[havecname2]=是 Yes & GRGS[chiName2]=陳小文 & GRGS[engName2]=Chan Siu Man & GRGS[ID2]=A123456(2) & GRGS[birth2]=2013-12-01 & GRGS[havecname3]=是 Yes & GRGS[chiName3]=陳大明 & GRGS[engName3]=Chan Tai Ming & GRGS[ID3]=A123456(3) & GRGS[birth3]=2013-12-01 & GRGS[havecname4]=是 Yes & GRGS[chiName4]=陳小明 & GRGS[engName4]=Chan Siu Ming & GRGS[ID4]=A123456(4) & GRGS[birth4]=2013-12-01 & GRGS[havecname5]=是 Yes & GRGS[chiName5]=陳大言 & GRGS[engName5]=Chan Tai Yin & GRGS[ID5]=A123456(5) & GRGS[birth5]=2013-12-01 & GRGS[havecname6]=是 Yes & GRGS[chiName6]=陳小言 & GRGS[engName6]=Chan Siu Ying & GRGS[ID6]=A123456(6) & GRGS[birth6]=2013-12-01 & GRGS[leaderName]=林子晴 & GRGS[leaderPosition]=活動主任 & GRGS[NoOfTeam]=1 & GRGS[teamFee]= 150 & GRGS[NoOfPeople]=6 & GRGS[insurance]=180 & GRGS[total]=330")
                .expect(200, done);
        })
    });

    // describe('TC1100 - Application-GRGS-preview: #GRGS_form_preview()', function () {
    //     it('Should return 200 and show the success message("提交成功!! Successfully Submitted!") in body', function (done) {
    //         Async.series([
    //             function(cb) {
    //               supertest(sails.hooks.http.app)
    //               .post('/competition/form/GRGS')
    //               .send("GRGS[teamName]=香港中學第一隊 & GRGS[phone]=23456789 & GRGS[email]=hkschoolteamone@gmail.com & GRGS[coachName]=歐陽宥 & GRGS[coachPhone]=98765432 & GRGS[category]=集體 A 組(五人圈操) & GRGS[havecname1]=是 Yes & GRGS[chiName1]=陳大文 & GRGS[engName1]=Chan Tai Man & GRGS[ID1]=A123456(1) & GRGS[birth1]=2013-01-12 & GRGS[havecname2]=是 Yes & GRGS[chiName2]=陳小文 & GRGS[engName2]=Chan Siu Man & GRGS[ID2]=A123456(2) & GRGS[birth2]=2013-12-01 & GRGS[havecname3]=是 Yes & GRGS[chiName3]=陳大明 & GRGS[engName3]=Chan Tai Ming & GRGS[ID3]=A123456(3) & GRGS[birth3]=2013-12-01 & GRGS[havecname4]=是 Yes & GRGS[chiName4]=陳小明 & GRGS[engName4]=Chan Siu Ming & GRGS[ID4]=A123456(4) & GRGS[birth4]=2013-12-01 & GRGS[havecname5]=是 Yes & GRGS[chiName5]=陳大言 & GRGS[engName5]=Chan Tai Yin & GRGS[ID5]=A123456(5) & GRGS[birth5]=2013-12-01 & GRGS[havecname6]=是 Yes & GRGS[chiName6]=陳小言 & GRGS[engName6]=Chan Siu Ying & GRGS[ID6]=A123456(6) & GRGS[birth6]=2013-12-01 & GRGS[leaderName]=林子晴 & GRGS[leaderPosition]=活動主任 & GRGS[NoOfTeam]=1 & GRGS[teamFee]= 150 & GRGS[NoOfPeople]=6 & GRGS[insurance]=180 & GRGS[total]=330")
    //               .expect(200)
    //               .then(res => {
    //                 const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
    //                 cookie = cookies.join(';');
    //                 cb();
    //               });
    //             },
    //             function(cb) {
    //               supertest(sails.hooks.http.app)
    //               .post('/competition/form/GRGS_Preview')
    //               .set('Cookie', cookie)
    //               .send('cookie')
    //               .expect(200, cb);
    //             }
    //           ], done);
    //         });
    // });

    describe('TC3400 - Admin page-edit: #update()', function () {
        it('Should return 302 and update the data', function (done) {
            GRGS.find().then(function (forms) {
                if (forms.length != 0) {
                    var id = forms[0].id;
                    supertest(sails.hooks.http.app)
                        .post('/admin/applyHandle/GRGSEditForm/' + id)
                        .send("GRGS[teamName]=香港中學第一隊 & GRGS[phone]=23456789 & GRGS[email]=hkschoolteamone@gmail.com & GRGS[coachName]=歐陽宥 & GRGS[coachPhone]=98765432 & GRGS[category]=集體 A 組(五人圈操) & GRGS[havecname1]=是 Yes & GRGS[chiName1]=陳大文 & GRGS[engName1]=Chan Tai Man & GRGS[ID1]=A123456(1) & GRGS[birth1]=2013-01-12 & GRGS[havecname2]=是 Yes & GRGS[chiName2]=陳小文 & GRGS[engName2]=Chan Siu Man & GRGS[ID2]=A123456(2) & GRGS[birth2]=2013-12-01 & GRGS[havecname3]=是 Yes & GRGS[chiName3]=陳大明 & GRGS[engName3]=Chan Tai Ming & GRGS[ID3]=A123456(3) & GRGS[birth3]=2013-12-01 & GRGS[havecname4]=是 Yes & GRGS[chiName4]=陳小明 & GRGS[engName4]=Chan Siu Ming & GRGS[ID4]=A123456(4) & GRGS[birth4]=2013-12-01 & GRGS[havecname5]=是 Yes & GRGS[chiName5]=陳大言 & GRGS[engName5]=Chan Tai Yin & GRGS[ID5]=A123456(5) & GRGS[birth5]=2013-12-01 & GRGS[havecname6]=是 Yes & GRGS[chiName6]=陳小言 & GRGS[engName6]=Chan Siu Ying & GRGS[ID6]=A123456(6) & GRGS[birth6]=2013-12-01 & GRGS[leaderName]=林子晴 & GRGS[leaderPosition]=活動主任 & GRGS[NoOfTeam]=1 & GRGS[teamFee]= 150 & GRGS[NoOfPeople]=6 & GRGS[insurance]=180 & GRGS[total]=330")
                        .expect(302, done);
                } else {
                    return done(new Error(
                        'No form can be edited'
                    ));
                }
            })
        });
    });

    // describe('TC2800 - (all)Application-save: #save()', function () {
    //     it('Should return 200 and show the success message (“儲存成功 Successfully save.”) in body', function (done) {
    //         supertest(sails.hooks.http.app)
    //             .post('/competition/form/GRGS/save')
    //             .send("GRGS[teamName]=香港中學第一隊 & GRGS[phone]=23456789 & GRGS[email]=hkschoolteamone@gmail.com & GRGS[coachName]=歐陽宥 & GRGS[coachPhone]=98765432 & GRGS[category]=集體 A 組(五人圈操) & GRGS[havecname1]=是 Yes & GRGS[chiName1]=陳大文 & GRGS[engName1]=Chan Tai Man & GRGS[ID1]=A123456(1) & GRGS[birth1]=2013-01-12 & GRGS[havecname2]=是 Yes & GRGS[chiName2]=陳小文 & GRGS[engName2]=Chan Siu Man & GRGS[ID2]=A123456(2) & GRGS[birth2]=2013-12-01 & GRGS[havecname3]=是 Yes & GRGS[chiName3]=陳大明 & GRGS[engName3]=Chan Tai Ming & GRGS[ID3]=A123456(3) & GRGS[birth3]=2013-12-01 & GRGS[havecname4]=是 Yes & GRGS[chiName4]=陳小明 & GRGS[engName4]=Chan Siu Ming & GRGS[ID4]=A123456(4) & GRGS[birth4]=2013-12-01 & GRGS[havecname5]=是 Yes & GRGS[chiName5]=陳大言 & GRGS[engName5]=Chan Tai Yin & GRGS[ID5]=A123456(5) & GRGS[birth5]=2013-12-01 & GRGS[havecname6]=是 Yes & GRGS[chiName6]=陳小言 & GRGS[engName6]=Chan Siu Ying & GRGS[ID6]=A123456(6) & GRGS[birth6]=2013-12-01 & GRGS[leaderName]=林子晴 & GRGS[leaderPosition]=活動主任 & GRGS[NoOfTeam]=1 & GRGS[teamFee]= 150 & GRGS[NoOfPeople]=6 & GRGS[insurance]=180 & GRGS[total]=330")
    //             .expect(200, '{\n  "message": "儲存成功 Successfully save.",\n  "url": "/competition/form/GRGS"\n}', done);
    //     })
    // });

    //   describe('TC3600 - Admin page-confirm all: #confirmAll()', function () {
    //      it('Should show the success message("已確認全部申請表 Sucessfully confirm all applications.") in body and jump to /admin/applyHandle/search', function (done) {
    //          GRGS.find().then(function (forms) {
    //              if (forms.length != 0) {
    //                  var id = forms[0].id;
    //                  supertest(sails.hooks.http.app)
    //                      .post('/admin/applyHandle/GRGS/confirmAll')
    //                      .expect(200, '{\n  "message": "已確認全部申請表 Sucessfully confirm all applications.",\n  "url": "/admin/applyHandle/search"\n}', done);
    //              } else {
    //                  return done(new Error(
    //                     'No form can be confirmed'
    //                  ));
    //              }
    //          })
    //      });
    //  });

});