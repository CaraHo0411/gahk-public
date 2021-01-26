/**
 * AtheleteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  //show all athelete record
  athelete_record: async function (req, res) {
    var athelete = await Athelete.find();
    return res.view('membership/athelete_record', { 'athelete': athelete });

  },




  //action_create from athelete form


  atheleteform: async function (req, res) {

    if (req.method == 'GET')
    {return res.view('membership/atheleteform', { 'data': req.session.data || {} });}
    req.session.data = req.body.Athelete;
    return res.view('membership/atheleteFormPreview', { 'data': req.session.data || {} });

  },


  confirm_athelete: async function (req, res) {

    var year = new Date().getFullYear();
    var pid = parseInt(req.params.id) || -1;
    var num = (year % 100) * 1000;
    var models = await Athelete.find({ where: { AtheleteNo: { '>': num } }, sort: 'AtheleteNo DESC', limit: 1 });
    var model = models[0];
    if (models.length > 0) {
      var model = await Athelete.update(pid).set({
        AtheleteNo: model.AtheleteNo + 1,
        comfirm_athelete: '是',
      }).fetch();
    } else {

      model = await Athelete.update(pid).set({
        AtheleteNo: num + 1,
        comfirm_athelete: '是',
      }).fetch();
    }
    model = model[0];



    var html = await sails.renderView('membership/confirm_Athelete', { models: model, layout: false });

    await sails.helpers.sendSingleEmail({
      to: '16228375@life.hkbu.edu.hk',
      from: sails.config.custom.mailgunFrom,
      subject: '已確認成為運動員',
      html: html


    }

    );

    return res.redirect('/athelete/athelete_record');



  },

  update_athelete: async function (req, res) {


    var pid = parseInt(req.params.id) || -1;

    if (req.method == 'GET') {

      var model = await Athelete.findOne(pid);

      if (model != null)
      {return res.view('membership/update_athelete', { 'athelete': model });}
      else
      {return res.send('No such athelete!');}

    } else {

      var model = await Athelete.findOne(pid);
      if (model.CheckNo != req.body.Athelete.CheckNo) {
        var html = await sails.renderView('membership/check_email', { model: model, layout: false });
        await sails.helpers.sendSingleEmail({
          to: model.Email,
          from: sails.config.custom.mailgunFrom,
          subject: '已收到閣下的支票',
          html: html
        });
      }

      console.log(req.body.Athelete);
      req.body.Athelete.date = new Date(req.body.Athelete.date);
      var models = await Athelete.update(pid).set({

        CheckNo: req.body.Athelete.CheckNo,
        Choice1: req.body.Athelete.Choice1|| 'off',
        Choice2: req.body.Athelete.Choice2|| 'off',
        Choice3: req.body.Athelete.Choice3|| 'off',
        Choice4: req.body.Athelete.Choice4|| 'off',
        Choice5: req.body.Athelete.Choice5|| 'off',
        ChiName: req.body.Athelete.ChiName,
        EngName: req.body.Athelete.EngName,
        Gender: req.body.Athelete.Gender,
        Date: req.body.Athelete.Date,
        Email: req.body.Athelete.Email,
        Contact: req.body.Athelete.Contact,
        AddressChi: req.body.Athelete.AddressChi,
        AddressEng: req.body.Athelete.AddressEng,
        SchoolChi: req.body.Athelete.SchoolChi,
        SchoolEng: req.body.Athelete.SchoolEng,
        Class: req.body.Athelete.Class,
        ChiNamePar: req.body.Athelete.ChiNamePar,
        EngNamePar: req.body.Athelete.EngNamePar,
        EmailPar: req.body.Athelete.EmailPar,
        ContactPar: req.body.Athelete.ContactPar,
        EmergencyContactName: req.body.Athelete.EmergencyContactName,
        EmergencyContact: req.body.Athelete.EmergencyContact,
        avatar: req.body.Athelete.avatar,



      }).fetch();

      if(req.body.Athelete.CheckNo!=''){
        models = await Athelete.update(pid).set({
          check: '是',

        }).fetch();}


      if (models.length > 0)

      {return res.redirect('/athelete/athelete_record');}

      else
      {return res.send('No such athelete!');}

    }

  },







  atheleteFormPreview: async function (req, res) {
    if (req.method == 'POST') {

      req.session.data = req.body.Athelete;

      return res.view('athelete/confirm', { 'data': req.session.data || {} });
    }

  },

  confirm: async function (req, res) {



    if (req.method == 'POST') {
      var athelete = await Athelete.create(req.session.data).fetch();

      req.session.data = {};  //clear data of session

      console.log(athelete.Email);
      // var models = await User.find();
      var html = await sails.renderView('membership/Email2', { athelete: athelete, layout: false });
      await sails.helpers.sendSingleEmail({
        to: athelete.Email,
        from: sails.config.custom.mailgunFrom,
        subject: '已收到閣下的申請表',
        html: html
      });


      return res.redirect('personal_login');
    }
  },


  canel_athelete: async function (req, res) {
    var pid = parseInt(req.params.id) || -1;
    model = await Athelete.update(pid).set({
      comfirm_athelete: '否',

    }).fetch();

    return res.redirect('/athelete/athelete_record');


  },


  personal_login: async function (req, res) {

    return res.view('membership/personal_login');

  },




  //athelete form  detail

  athelete_detail: async function (req, res) {

    var athelete = await Athelete.findOne(req.params.id);
    if (req.method == 'GET')
    {return res.view('membership/athelete_detail', { 'athelete': athelete, 'reg': 0 });}


  },

  csv: async function (req, res) {
    var csv = require('fast-csv');
    var arr = [];
    var models = await Athelete.find();
    if (!models)
    {return res.notFound();}

    models.forEach(element => {
      arr.push({
        運動員編號: 'INDG' + element.AtheleteNo,
        競技體操: element.Choice1,
        健美體操: element.Choice2,
        藝術體操: element.Choice3,
        彈網: element.Choice4,
        技巧體操: element.Choice5,
        中文名: element.ChiName,
        英文名: element.EngName,
        性別: element.Gender,
        出生日期: element.Date,
        電郵: element.Email,
        聯絡電話: element.Contact,
        地址中: element.AddressChi,
        地址英: element.AddressEng,
        學校名稱中: element.SchoolChi,
        學校名稱英: element.SchoolEng,
        就讀級別: element.Class,
        運動員家長或監護人中文名: element.ChiNamePar,
        運動員家長或監護人英文名: element.EngNamePar,
        運動員家長或監護人電郵: element.EmailPar,
        運動員家長或監護人聯絡電話: element.ContactPar,
        緊急情況聯絡人姓名: element.EmergencyContactName,
        緊急情況聯絡人電話: element.EmergencyContact,



      });

    });

    res.set('Content-type', 'text/csv');
    csv.write(arr, { headers: true }).pipe(res);
  },



};
