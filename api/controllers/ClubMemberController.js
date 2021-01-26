/**
 * ClubMemberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //clubMembership Application - Apply process
  // action - create
  clubMemberForm: async function (req, res) {

    if (req.method == 'GET') { return res.view('membership/clubMemberForm'); }

    req.session.data = req.body.ClubMember;

    return res.view('membership/clubMemberFormPreview', { 'data': req.session.data || {} });
  },

  clubMemberFormPreview: async function (req, res) {
    if (req.method == 'POST') {
      req.session.data.payStatus = "unpaid";
      req.session.data.formStatus = "ToBeCon";
      req.session.data.teamStatus = "suTeam";

      var condition = {};
      condition.clubYear = req.session.data.clubYear;

      //Set idCode to ClubMember
      var modelNum = await ClubMember.count({
          where: condition
      })
      var newID = modelNum + 1;
      var newIDCode = "CLUBMem" + req.session.data.clubYear + "-" + newID;
      req.session.data.idCode = newIDCode;

      //create ClubMember
      await ClubMember.create(req.session.data);

      req.session.data = null;
      req.session.clubMemdata = null;
      var user = await User.update(req.session.userId).set({
        clubMemdata: null
      }).fetch();
      if (user.length == 0) return res.notFound();

      return res.view('membership/clubMemberFormConfirm', { 'formIDCode': newIDCode });
    }

  },

  save: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    req.session.clubMemdata = req.body;

    var user = await User.update(req.session.userId).set({
        clubMemdata: req.body
    }).fetch();

    if (user.length == 0) return res.notFound();

    if (req.wantsJSON) {
        return res.json({ message: "儲存成功 Sucessfully save.", url: '/membership/clubMemberForm' });    // for ajax request
    } else {
        return res.redirect('/membership/clubMemberForm');           // for normal request
    }
},

//**************************admin/HandleApply*************************
  update: async function (req, res) {
    if (req.method == "GET") {
      var model = await ClubMember.findOne(req.params.id);

      if (!model) return res.notFound();

      return res.view('admin/applyHandle/clubMemEdit', { clubMem: model });

    } else {
      if (!req.body.ClubMember)
        return res.badRequest("Form-data not received.");

      var models = await ClubMember.update(req.params.id).set({
        clubYear: req.body.ClubMember.clubYear,
        OrgEngName: req.body.ClubMember.OrgEngName,
        OrgChiName: req.body.ClubMember.OrgChiName,
        AppEngName: req.body.ClubMember.AppEngName,
        AppChiName: req.body.ClubMember.AppChiName,
        clubAddr: req.body.ClubMember.clubAddr,
        clubTel: req.body.ClubMember.clubTel,
        clubEmail: req.body.ClubMember.clubEmail,
        clubWeb: req.body.ClubMember.clubWeb,
        MemberNo: req.body.ClubMember.MemberNo,
        brefDes: req.body.ClubMember.brefDes,
        resEngName: req.body.ClubMember.resEngName,
        resChiName: req.body.ClubMember.resChiName,
        position: req.body.ClubMember.position,
        resAddr: req.body.ClubMember.resAddr,
        resTel: req.body.ClubMember.resTel,
        resFax: req.body.ClubMember.resFax,
        resEmail: req.body.ClubMember.resEmail,
        year: req.body.ClubMember.year,
        clubFee: req.body.ClubMember.clubFee,
        partD:  req.body.ClubMember.partD,
        payStatus: req.body.ClubMember.payStatus,
        formStatus: req.body.ClubMember.formStatus,
      }).fetch();

      if (models.length == 0) return res.notFound();

      return res.redirect('/admin/applyHandle/clubMemberSearch');
    }
  },

  reject: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "rejected" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/clubMemberSearch' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/clubMemberSearch');           // for normal request
    }

  },

  confirmAll: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var condition = {};

    if(req.session.clubMemSearchResult == "") {
      var models = await ClubMember.find();

    } else {
      if (req.session.clubMemSearchResult.clubYear) condition.clubYear = req.session.clubMemSearchResult.clubYear;
      if (req.session.clubMemSearchResult.payStatus) condition.payStatus = req.session.clubMemSearchResult.payStatus;
      if (req.session.clubMemSearchResult.formStatus) condition.formStatus = req.session.clubMemSearchResult.formStatus;
  
      var models = await ClubMember.find({
        where: condition
      });
    }
    
    if (models.length == 0) return res.notFound();

    models.forEach(async function (model) {
      if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
        await ClubMember.update(model.id).set({ formStatus: "accepted" })
      }
    });

    if (req.wantsJSON) {
      return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/clubMemberSearch' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/clubMemberSearch');           // for normal request
    }
  },

  // action - confirm form
  confirm: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "accepted" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/clubMemberSearch' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/clubMemberSearch');           // for normal request
    }
  },

  dataDef: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/clubMemberSearch' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/clubMemberSearch');           // for normal request
    }

  },

  export_xlsx: async function (req, res) {
    var condition = {};
    if(req.session.clubMemSearchResult == "") {
      var models = await ClubMember.find();

    } else {
      if (req.session.clubMemSearchResult.clubYear) condition.clubYear = req.session.clubMemSearchResult.clubYear;
      if (req.session.clubMemSearchResult.payStatus) condition.payStatus = req.session.clubMemSearchResult.payStatus;
      if (req.session.clubMemSearchResult.formStatus) condition.formStatus = req.session.clubMemSearchResult.formStatus;
  
      var models = await ClubMember.find({
        where: condition
      });
    }

    var XLSX = require('xlsx');
    var wb = XLSX.utils.book_new();
    var payStatus, formStatus;
    var ws = XLSX.utils.json_to_sheet(models.map(model => {

      var n = new Date(model.createdAt);
      var cmonth = n.getMonth() + 1;
      var applyDate = n.getDate() + "/" + cmonth + "/" + n.getFullYear();

      var m = new Date(model.updatedAt);
      var umonth = m.getMonth() + 1;
      var updateDate = m.getDate() + "/" + umonth + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

      if (model.payStatus == "paid") {
        payStatus = "已付款 Paid";
      } else {
        payStatus = "未付款 Unpaid";
      }

      if (model.formStatus == "ToBeCon") {
        formStatus = "待處理 To be handled";
      } else if (model.formStatus == "accepted") {
        formStatus = "已確認 Accepted";
      } else if (model.formStatus == "rejected") {
        formStatus = "已拒絕 Rejected";
      } else if (model.formStatus == "dataDef") {
        formStatus = "資料不全 Data Deficiency";
      }

      return {
        "申請表編號 Application Number": model.idCode,
        "申請年份 Year of Application": model.clubYear,
        "機構(英文) Organization(English)": model.OrgEngName,
        "機構(中文) Organization(Chinese)": model.OrgChiName,
        "申請者姓名(英文) Name of Applicant(English)": model.AppEngName,
        "申請者姓名(中文) Name of Applicant(Chinese)": model.AppChiName,
        "申請者地址 Address": model.clubAddr,
        "申請者電話 Tel": model.clubTel,
        "申請者傳真 Fax": model.clubFax,
        "申請者電郵 E-mail": model.clubEmail,
        "申請者網址 Web-site": model.clubWeb,
        "機構成員人數 No. of Members in the Organization": model.MemberNo,
        "請簡單描述貴機構/團體/學校曾舉辦或參與的體操活動 Brief description of gymnastic activities which the Organization/Club/School has organized/taken part": model.brefDes,
        "機構代表/負責人姓名(英文) Organization Representative / Person in charge Name(English)": model.resEngName,
        "機構代表/負責人姓名(中文) Organization Representative / Person in charge Name(Chinese)": model.resChiName,
        "職位 Position held": model.position,
        "機構代表/負責人申請者地址 Organization Representative / Person in charge Address": model.resAddr,
        "機構代表/負責人申請者電話 Organization Representative / Person in charge Tel": model.resTel,
        "機構代表/負責人申請者傳真 Organization Representative / Person in charge Fax": model.resFax,
        "機構代表/負責人申請者電郵 Organization Representative / Person in charge E-mail": model.resEmail,
        "會員年長 Membership Year": model.year,
        "會員費 Membership Fee": model.clubFee,
        "付款狀況 Payment Status": payStatus,
        "申請狀況 Apply Status": formStatus,
        "提交日期 Apply Date": applyDate,
        "上次更新 Last upadated": updateDate,
      }
    }));
    XLSX.utils.book_append_sheet(wb, ws, "ClubMember");
    res.set("Content-disposition", "attachment; filename=ClubMember.xlsx");
    return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
  },

  import_xlsx: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    req.file('file').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
      if (err) { return res.serverError(err); }
      if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

      var XLSX = require('xlsx');
      var workbook = XLSX.readFile(uploadedFiles[0].fd);
      var ws = workbook.Sheets[workbook.SheetNames[0]];
      var data = XLSX.utils.sheet_to_json(ws, { range: 1, header: ["idCode", "clubYear", "OrgEngName", "OrgChiName", "AppEngName", "AppChiName", "clubAddr", "clubTel", "clubFax", "clubEmail", "clubWeb", "MemberNo", "brefDes", "resEngName", "resChiName", "position", "resAddr", "resTel", "resFax", "resEmail", "year", "clubFee", "payStatus", "formStatus"] });

      for (var i = 0; i < data.length; i++) {
        if (data[i].payStatus == "未付款 Unpaid") {
          data[i].payStatus = "unpaid";
        } else if (data[i].payStatus == "已付款 Paid") {
          data[i].payStatus = "paid";
        }

        if (data[i].formStatus == "待處理 To be handled") {
          data[i].formStatus = "ToBeCon";
        } else if (data[i].formStatus == "已確認 Accepted") {
          data[i].formStatus = "accepted";
        } else if (data[i].formStatus == "已拒絕 Rejected") {
          data[i].formStatus = "rejected";
        } else if (data[i].formStatus == "資料不全 Data Deficiency") {
          data[i].formStatus = "dataDef";
        }

      }


      console.log(data);


      var models = await ClubMember.createEach(data).fetch();
      if (models.length == 0) {
        return res.badRequest("No data imported.");
      }
      return res.redirect('/admin/applyHandle/clubMemberSearch');
    });

  },



};

