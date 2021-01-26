/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  //show all coach record
  personal_login: async function (req, res) {

    return res.view('membership/personal_login');

  },

  // action - create
  chineseMemberForm: async function (req, res) {

    if (req.method == 'GET') { return res.view('membership/chineseMemberform', { 'data': req.session.data || {} }); }

    // return res.view('membership/chineseMemberform', { 'data': req.session.data || {} });
    req.session.data = req.body.Membership;


    return res.view('membership/chineseMemberFormPreview', { 'data': req.session.data || {} });


  },


  chineseMemberFormPreview: async function (req, res) {
    if (req.method == 'POST') {

      req.session.data = req.body.Membership;

      return res.view('membership/confirm', { 'data': req.session.data || {} });
    }

  },






  confirm: async function (req, res) {



    if (req.method == 'POST') {
      await Membership.create(req.session.data);

      req.session.data = {};  //clear data of session


    }

  },

  //for admin
  update_membership: async function (req, res) {



    var pid = parseInt(req.params.id) || -1;

    if (req.method == 'GET') {


      var model = await Membership.findOne(pid);

      if (model != null) { return res.view('membership/update_membership', { 'member': model }); }

      else { return res.send('No such member!'); }

    } else {
      req.body.Membership.date = new Date(req.body.Membership.date);


      var model = await Membership.findOne(pid);

      if (model.CheckNo != req.body.Membership.CheckNo) {

        var html = await sails.renderView('membership/check_email', { model: model, layout: false });
        await sails.helpers.sendSingleEmail({
          to: model.Email,
          from: sails.config.custom.mailgunFrom,
          subject: '已收到閣下的支票',
          html: html
        });
      }


      var models = await Membership.update(pid).set({
        CheckNo: req.body.Membership.CheckNo,

        Application: req.body.Membership.Application,
        RenewalMemberNo: req.body.Membership.RenewalMemberNo,
        ChiName: req.body.Membership.ChiName,
        EngName: req.body.Membership.EngName,
        Date: req.body.Membership.Date,
        CorrespondenceChi: req.body.Membership.CorrespondenceChi,
        Mobile: req.body.Membership.Mobile,
        Hnumber: req.body.Membership.Hnumber,
        Email: req.body.Membership.Email,
        avatar: req.body.Membership.avatar,






      }).fetch();


      if (req.session.role == 'admin') {
        if (req.body.Membership.CheckNo != '') {
          models = await Membership.update(pid).set({
            check: '是',

          }).fetch();
        }
      }


      if (models.length > 0) {
        if (req.session.role == 'admin') {
          return res.redirect('/membership/admin');
        } else {
          return res.redirect('/membership/personal_login');
        }
      }

      else { return res.send('No such member!'); }

    }


  },




  //for user

  update_membershipUser: async function (req, res) {




    var pid = parseInt(req.session.userId) || -1;

    if (req.method == 'GET') {


      var model1 = await User.findOne(pid).populate('membership', { sort: 'MemberNo DESC' });

      if (!model1 || model1.membership.length == 0) { return res.notFound(); }

      // var model = await Membership.findOne(pid);
      var model = model1.membership[0];


      if (model != null) { return res.view('membership/update_membership', { 'member': model }); }

      else { return res.send('No such member!'); }

    }


  },




  confirm_membership: async function (req, res) {
    var year = new Date().getFullYear();
    var pid = parseInt(req.params.id) || -1;
    var num = (year % 100) * 1000;
    var models = await Membership.find({ where: { MemberNo: { '>': num } }, sort: 'MemberNo DESC', limit: 1 });
    var model = models[0];
    if (models.length > 0) {
      model = await Membership.update(pid).set({
        MemberNo: model.MemberNo + 1,
      }).fetch();
    } else {

      model = await Membership.update(pid).set({
        MemberNo: num + 1,
        comfirm_member: '是',

      }).fetch();
    }


    model = model[0];


    var html = await sails.renderView('membership/confirm_Member', { models: model, layout: false });
    await sails.helpers.sendSingleEmail({
      to: '16228375@life.hkbu.edu.hk',
      from: sails.config.custom.mailgunFrom,
      subject: '已確認成為會員',
      html: html
    });

    return res.redirect('/membership/admin');


  },



  confirm_membership: async function (req, res) {
    var year = new Date().getFullYear();
    var pid = parseInt(req.params.id) || -1;
    var num = (year % 100) * 1000;
    var models = await Membership.find({ where: { MemberNo: { '>': num } }, sort: 'MemberNo DESC', limit: 1 });
    var model = models[0];
    if (models.length > 0) {
      model = await Membership.update(pid).set({
        MemberNo: model.MemberNo + 1,
      }).fetch();
    } else {
      model = await Membership.update(pid).set({
        MemberNo: num + 1,
        comfirm_member: '是',
      }).fetch();
    }


    model = model[0];


    var html = await sails.renderView('membership/confirm_Member', { models: model, layout: false });
    await sails.helpers.sendSingleEmail({
      to: '16228375@life.hkbu.edu.hk',
      from: sails.config.custom.mailgunFrom,
      subject: '已確認成為會員',
      html: html
    });

    return res.redirect('/membership/admin');
  },


  confirm_membership: async function (req, res) {
    var year = new Date().getFullYear();
    var pid = parseInt(req.params.id) || -1;
    var num = (year % 100) * 1000;
    var models = await Membership.find({ where: { MemberNo: { '>': num } }, sort: 'MemberNo DESC', limit: 1 });
    var model = models[0];
    if (models.length > 0) {
      model = await Membership.update(pid).set({
        MemberNo: model.MemberNo + 1,
        comfirm_member: '是',
      }).fetch();
    } else {

      model = await Membership.update(pid).set({
        MemberNo: num + 1,
        comfirm_member: '是',

      }).fetch();
    }


    model = model[0];


    var html = await sails.renderView('membership/confirm_Member', { models: model, layout: false });
    await sails.helpers.sendSingleEmail({
      to: '16228375@life.hkbu.edu.hk',
      from: sails.config.custom.mailgunFrom,
      subject: '已確認成為會員',
      html: html
    });

    return res.redirect('/membership/admin');


  },


  canel_membership: async function (req, res) {
    var pid = parseInt(req.params.id) || -1;
    model = await Membership.update(pid).set({
      comfirm_member: '否',

    }).fetch();

    return res.redirect('/membership/admin');


  },








  csv: async function (req, res) {

    var csv = require('fast-csv');
    var arr = [];
    var models = await Membership.find();
    if (!models) { return res.notFound(); }

    models.forEach(element => {
      arr.push({
        會員編號: 'IND' + element.MemberNo,
        會藉類別: element.Application,
        續會會員號碼: element.RenewalMemberNo,
        中文名: element.ChiName,
        英文名: element.EngName,
        出生日期: element.Date,
        通訊地址: element.CorrespondenceChi,
        手提: element.Mobile,
        住宅: element.Hnumber,
        電郵: element.Email,



      });

    });

    res.set('Content-type', 'text/csv');
    csv.write(arr, { headers: true }).pipe(res);
  },





  confirm: async function (req, res) {



    if (req.method == 'POST') {
      var member = await Membership.create(req.session.data).fetch();

      await User.addToCollection(req.session.userId, 'membership').members(member.id);

      req.session.data = {};  //clear data of session


      // console.log(member.Email);
      // var models = await User.find();
      // var html = await sails.renderView('membership/Email1', {member: member, layout: false});
      // await sails.helpers.sendSingleEmail({
      //     to: '16217225@life.hkbu.edu.hk',
      //     from: sails.config.custom.mailgunFrom,
      //     subject: 'Subject',
      //     html: html
      // });



      console.log(member.Email);
      // var models = await User.find();
      var html = await sails.renderView('membership/Email1', { member: member, layout: false });
      await sails.helpers.sendSingleEmail({
        to: member.Email,
        from: sails.config.custom.mailgunFrom,
        subject: '已收到閣下的申請表',
        html: html
      });




      return res.redirect('personal_login');
    }

  },

  //chinese form (normal member) detail

  chineseMemberform_detail: async function (req, res) {

    var member = await Membership.findOne(req.params.id);
    if (req.method == 'GET') { return res.view('membership/chineseMemberform_detail', { 'member': member, 'reg': 0 }); }

  },


  // action - admin
  admin: async function (req, res) {


    var member = await Membership.find();
    if (req.method == 'GET') { return res.view('membership/admin', { 'member': member }); }





  },



};
