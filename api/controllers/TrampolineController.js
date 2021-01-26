/**
 * TrampolineController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //(preview)
    trampoline: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/trampoline'); }

        req.session.data = req.body.Trampoline;

        return res.view('pages/competition/form/TrampolinePreviewForm', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    trampolinePreviewForm: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to Trampoline
            var modelNum = await Trampoline.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "TRA" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create Trampoline
            await Trampoline.create(req.session.data);

            //clear formdata in session and user
            req.session.data = null;
            req.session.tramData = null;
            var user = await User.update(req.session.userId).set({
                tramData: null
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode, 'form': "trampoline" });
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.tramData = req.body;

        var user = await User.update(req.session.userId).set({
            tramData: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/competition/form/trampoline' });    // for ajax request
        } else {
            return res.redirect('/competition/form/trampoline');           // for normal request
        }
    },


    //**************************admin/HandleApply*************************
    update: async function (req, res) {

        if (req.method == "GET") {

            var models = await Trampoline.findOne(req.params.id);

            if (!models) return res.notFound();

            return res.view('admin/applyHandle/TrampolineEditForm', { trampoline: models });

        } else {

            if (!req.body.Trampoline)
                return res.badRequest("Form-data not received.");

            var model = await Trampoline.update(req.params.id).set({
                compYear: req.body.Trampoline.compYear,
                gender: req.body.Trampoline.gender,
                category: req.body.Trampoline.category,
                havecname1: req.body.Trampoline.havecname1,
                chiName1: req.body.Trampoline.chiName1,
                engName1: req.body.Trampoline.engName1,
                birth1: req.body.Trampoline.birth1,
                phone1: req.body.Trampoline.phone1,
                email1: req.body.Trampoline.email1,
                address1: req.body.Trampoline.address1,
                havecname2: req.body.Trampoline.havecname2,
                chiName2: req.body.Trampoline.chiName2,
                engName2: req.body.Trampoline.engName2,
                birth2: req.body.Trampoline.birth2,
                phone2: req.body.Trampoline.phone2,
                email2: req.body.Trampoline.email2,
                address2: req.body.Trampoline.address2,
                teamName: req.body.Trampoline.teamName,
                coachName: req.body.Trampoline.coachName,
                coachPhone: req.body.Trampoline.coachPhone,
                coachNum: req.body.Trampoline.coachNum,
                coachAddress: req.body.Trampoline.coachAddress,
                parentName1: req.body.Trampoline.parentName1,
                parentName2: req.body.Trampoline.parentName2,
                declaration0: req.body.Trampoline.declaration0,
                declaration1: req.body.Trampoline.declaration1,
                payStatus: req.body.Trampoline.payStatus,
                formStatus: req.body.Trampoline.formStatus,
                teamStatus: req.body.Trampoline.teamStatus,
            }).fetch();

            if (model.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/trampolineSearch');
        }
    },

    // action - confirm all
    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};
        if (req.session.tramSearchResult == "") {
            var models = await Trampoline.find();

        } else {
            if (req.session.tramSearchResult.compYear) condition.compYear = req.session.tramSearchResult.compYear;
            if (req.session.tramSearchResult.item) condition.item = req.session.tramSearchResult.item;
            if (req.session.tramSearchResult.category) condition.category = req.session.tramSearchResult.category;
            if (req.session.tramSearchResult.payStatus) condition.payStatus = req.session.tramSearchResult.payStatus;
            if (req.session.tramSearchResult.formStatus) condition.formStatus = req.session.tramSearchResult.formStatus;
            if (req.session.tramSearchResult.teamStatus) condition.teamStatus = req.session.tramSearchResult.teamStatus;

            var models = await Trampoline.find({
                where: condition
            });
        }

        
        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await Trampoline.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/trampolineSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/trampolineSearch');           // for normal request
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/trampolineSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/trampolineSearch');           // for normal request
        }

    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/trampolineSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/trampolineSearch');           // for normal request
        }
    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/trampolineSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/trampolineSearch');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/trampolineSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/trampolineSearch');           // for normal request
        }

    },

    //action - import excel
    import_xlsx: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.file('file').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            var XLSX = require('xlsx');
            var workbook = XLSX.readFile(uploadedFiles[0].fd);
            var ws = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(ws, { range: 1, header: ["idCode", "compYear", "gender", "category", "havecname1", "chiName1", "engName1", "birth1", "phone1", "email1", "address1", "havecname2", "chiName2", "engName2", "birth2", "phone2", "email2", "address2", "teamName", "coachName", "coachPhone", "coachNum", "coachAddress", "parentName1", "parentName2", "payStatus", "formStatus", "teamStatus"] });

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

                if (data[i].teamStatus == "正選 Successful Team") {
                    data[i].teamStatus = "suTeam";
                } else if (data[i].teamStatus == "後補 Team on Waitiing List") {
                    data[i].teamStatus = "waitTeam";
                }

            } console.log(data);

            var models = await Trampoline.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect('/admin/applyHandle/trampolineSearch');
        });
    },
    // action - export excel
    export_xlsx: async function (req, res) {

        var condition = {};
        if (req.session.tramSearchResult == "") {
            var models = await Trampoline.find();

        } else {
            if (req.session.tramSearchResult.compYear) condition.compYear = req.session.tramSearchResult.compYear;
            if (req.session.tramSearchResult.item) condition.item = req.session.tramSearchResult.item;
            if (req.session.tramSearchResult.category) condition.category = req.session.tramSearchResult.category;
            if (req.session.tramSearchResult.payStatus) condition.payStatus = req.session.tramSearchResult.payStatus;
            if (req.session.tramSearchResult.formStatus) condition.formStatus = req.session.tramSearchResult.formStatus;
            if (req.session.tramSearchResult.teamStatus) condition.teamStatus = req.session.tramSearchResult.teamStatus;

            var models = await Trampoline.find({
                where: condition
            });
        }

        var XLSX = require('xlsx');
        var wb = XLSX.utils.book_new();

        var ws = XLSX.utils.json_to_sheet(models.map(model => {
            var createTime = new Date(model.createdAt);
            var month = createTime.getMonth() + 1;
            var applyDate = createTime.getDate() + "/" + month + "/" + createTime.getFullYear();

            var updateTime = new Date(model.updatedAt);
            var month = updateTime.getMonth() + 1;
            var updateDate = updateTime.getDate() + "/" + month + "/" + updateTime.getFullYear() + " " + updateTime.getHours() + ":" + updateTime.getMinutes() + ":" + updateTime.getSeconds();

            if (model.formStatus == "accepted") {
                var formS = "已確認 Accepted";
            } else if (model.formStatus == "rejected") {
                var formS = "已拒絕 Rejected";
            } else if (model.formStatus == "dataDef") {
                var formS = "資料不全 Data Deficiency";
            } else if (model.formStatus == "ToBeCon") {
                var formS = "待處理 To be handled";
            }

            if (model.teamStatus == "suTeam") {
                var teamS = "正選 Successful Team";
            } else if (model.teamName == "waitTeam") {
                var teamS = "後備 Team on Waitiing List";
            }

            if (model.payStatus == "unpaid") {
                var payS = "未付款 Unpaid";
            } else if (model.payStatus == "paid") {
                var payS = "已付款 Paid";
            }

            return {
                "申請表編號 Application Number": model.idCode,
                "比賽年份 Year of Competition": model.compYear,
                "性別 Gender": model.gender,
                "參賽組別 Category": model.category,
                "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
                "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.chiName1,
                "參加者(1)英文姓名 Applicant(1) Name in English": model.engName1,
                "參加者(1)出生年份 Applicant(1) Date of Birth": model.birth1,
                "參加者(1)聯絡電話 Applicant(1) Contact Number": model.phone1,
                "參加者(1)電郵 Applicant(1) Email Address": model.email1,
                "參加者(1)通訊地址 Applicant(1) Postal Address": model.address1,
                "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
                "參加者(2)中文姓名 Applicant(2) Chinese Name": model.chiName2,
                "參加者(2)英文姓名 Applicant(2) English Name": model.engName2,
                "參加者(2)出生年份 Applicant(2) Date of Birth": model.birth2,
                "參加者(2)聯絡電話 Applicant(2) Contact Number": model.phone2,
                "參加者(2)電郵 Applicant(2) Email Address": model.email2,
                "參加者(2)通訊地址 Applicant(2) Postal Address": model.address2,
                "團體名稱 Organization Name": model.teamName,
                "教練姓名 Coach Name": model.coachName,
                "聯絡電話 Contact Number": model.coachPhone,
                "註冊教練編號 Registered Coach No.": model.coachNum,
                "通訊地址 Postal Address": model.coachAddress,
                "參加者(1)家長姓名 Applicant(1)'s Parent Name": model.parentName1,
                "參加者(2)家長姓名 Applicant(2)'s Parent Name": model.parentName2,
                "付款狀況 Payment Status": payS,
                "申請狀況 Apply Status": formS,
                "隊伍/團體狀況 Team Status": teamS,
                "提交日期 Apply Date": applyDate,
                "上次更新 Last upadated": updateDate
            }
        }));
        XLSX.utils.book_append_sheet(wb, ws, "Trampoline");

        res.set("Content-disposition", "attachment; filename=Trampoline.xlsx");
        return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
    },
};

