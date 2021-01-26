/**
 * TRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    TRGSForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/TRGSForm'); }

        req.session.data = req.body.TRGS;

        return res.view('pages/competition/form/TRGSFormPreview', { 'data': req.session.data || {} });
    },

    //action - create
    TRGSFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to TRGS
            var modelNum = await TRGS.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "TRGS" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create TRGS
            await TRGS.create(req.session.data);

            //clear session data
            req.session.data = null;
            req.session.TRGSdata = null;
            var user = await User.update(req.session.userId).set({
                TRGSdata: null
            }).fetch();
            if (user.length == 0) return res.notFound();

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode });
        }
    },

    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.TRGSdata = req.body;
        req.session.data = null;

        var user = await User.update(req.session.userId).set({
            TRGSdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/competition/form/TRGSForm' });    // for ajax request
        } else {
            return res.redirect('/competition/form/TRGSForm');           // for normal request
        }
    },

    //**************************admin/HandleApply*************************
    update: async function (req, res) {
        if (req.method == "GET") {
            var model = await TRGS.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGSEdit', { TRGS: model });

        } else {
            if (!req.body.TRGS)
                return res.badRequest("Form-data not received.");

            var models = await TRGS.update(req.params.id).set({
                compYear: req.body.TRGS.compYear,
                teamName: req.body.TRGS.teamName,
                Phone: req.body.TRGS.Phone,
                Email: req.body.TRGS.Email,
                CoachName: req.body.TRGS.CoachName,
                CoachPhone: req.body.TRGS.CoachPhone,
                category: req.body.TRGS.category,
                havecname1: req.body.TRGS.havecname1,
                Mate1ChiName: req.body.TRGS.Mate1ChiName,
                Mate1EngName: req.body.TRGS.Mate1EngName,
                Mate1IDNo: req.body.TRGS.Mate1IDNo,
                Mate1Date: req.body.TRGS.Mate1Date,
                havecname2: req.body.TRGS.havecname2,
                Mate2ChiName: req.body.TRGS.Mate2ChiName,
                Mate2EngName: req.body.TRGS.Mate2EngName,
                Mate2IDNo: req.body.TRGS.Mate2IDNo,
                Mate2Date: req.body.TRGS.Mate2Date,
                havecname3: req.body.TRGS.havecname3,
                Mate3ChiName: req.body.TRGS.Mate3ChiName,
                Mate3EngName: req.body.TRGS.Mate3EngName,
                Mate3IDNo: req.body.TRGS.Mate3IDNo,
                Mate3Date: req.body.TRGS.Mate3Date,
                havecname4: req.body.TRGS.havecname4,
                Mate4ChiName: req.body.TRGS.Mate4ChiName,
                Mate4EngName: req.body.TRGS.Mate4EngName,
                Mate4IDNo: req.body.TRGS.Mate4IDNo,
                Mate4Date: req.body.TRGS.Mate4Date,
                TeamNumber: req.body.TRGS.TeamNumber,
                TeamPrice: req.body.TRGS.TeamPrice,
                TeamTotalPrice: req.body.TRGS.TeamTotalPrice,
                leaderName: req.body.TRGS.leaderName,
                leaderPosition: req.body.TRGS.leaderPosition,
                Declaration: req.body.TRGS.Declaration,
                payStatus: req.body.TRGS.payStatus,
                formStatus: req.body.TRGS.formStatus,
                teamStatus: req.body.TRGS.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};
        if (req.session.searchResult.compYear) condition.compYear = req.session.searchResult.compYear;
        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await TRGS.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await TRGS.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }
    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }
    },


    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    export_xlsx: async function (req, res) {
        var condition = {};
        if (req.session.searchResult.compYear) condition.compYear = req.session.searchResult.compYear;
        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await TRGS.find({
            where: condition
        });

        var XLSX = require('xlsx');
        var wb = XLSX.utils.book_new();
        var payStatus, formStatus, teamStatus;
        var ws = XLSX.utils.json_to_sheet(models.map(model => {

            var day1 = model.Mate1Date.split('-');
            var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
            var day2 = model.Mate2Date.split('-');
            var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
            var day3 = model.Mate3Date.split('-');
            var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
            var day4 = model.Mate4Date.split('-');
            var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];

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

            if (model.teamStatus == "suTeam") {
                teamStatus = "正選 Successful Team";
            } else {
                teamStatus = "後補 Team on Waitiing List";
            }

            return {
                "申請表編號 Application Number": model.idCode,
                "比賽年份 Year of Competition": model.compYear,
                "學校名稱(中文) School Name(Chinese)": model.teamName,
                "聯絡電話 Contact Number": model.Phone,
                "聯絡電郵 Email Address": model.Email,
                "教練姓名 Coach Name": model.CoachName,
                "教練聯絡電話 Coach Contact Number": model.CoachPhone,
                "組別 Category": model.category,
                "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
                "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.Mate1ChiName,
                "參加者(1)英文姓名 Applicant(1) Name in English": model.Mate1EngName,
                "參加者(1)身分證號碼  Applicant(1) ID Card Number": model.Mate1IDNo,
                "參加者(1)出生日期  Applicant(1) Date of Birth": date1,
                "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
                "參加者(2)中文姓名 Applicant(2) Name in Chinese": model.Mate2ChiName,
                "參加者(2)英文姓名 Applicant(2) Name in English": model.Mate2EngName,
                "參加者(2)身分證號碼  Applicant(2) ID Card Number": model.Mate2IDNo,
                "參加者(2)出生日期  Applicant(2) Date of Birth": date2,
                "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
                "參加者(3)中文姓名 Applicant(3) Name in Chinese": model.Mate3ChiName,
                "參加者(3)英文姓名 Applicant(3) Name in English": model.Mate3EngName,
                "參加者(3)身分證號碼  Applicant(3) ID Card Number": model.Mate3IDNo,
                "參加者(3)出生日期  Applicant(3) Date of Birth": date3,
                "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
                "參加者(4)中文姓名 Applicant(4) Name in Chinese": model.Mate4ChiName,
                "參加者(4)英文姓名 Applicant(4) Name in English": model.Mate4EngName,
                "參加者(4)身分證號碼  Applicant(4) ID Card Number": model.Mate4IDNo,
                "參加者(4)出生日期  Applicant(4) Date of Birth": date4,
                "團體項目(隊) Group Event(team(s)) ": model.TeamNumber,
                "費用(hk$)": model.TeamPrice,
                "總額 Total price($)": model.TeamTotalPrice,
                "學校負責人姓名 Leader's Name": model.leaderName,
                "學校負責人職位 Leader's Position": model.leaderPosition,
                "付款狀況 Payment Status": payStatus,
                "申請狀況 Apply Status": formStatus,
                "隊伍/團體狀況 Team Status": teamStatus,
                "提交日期 Apply Date": applyDate,
                "上次更新 Last upadated": updateDate,
            }
        }));
        XLSX.utils.book_append_sheet(wb, ws, "TRGS");
        res.set("Content-disposition", "attachment; filename=TRGS.xlsx");
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
            var data = XLSX.utils.sheet_to_json(ws, { range: 1, header: ["idCode", "compYear", "teamName", "Phone", "Email", "CoachName", "CoachPhone", "category", "havecname1", "Mate1ChiName", "Mate1EngName", "Mate1IDNo", "Mate1Date", "havecname2", "Mate2ChiName", "Mate2EngName", "Mate2IDNo", "Mate2Date", "havecname3", "Mate3ChiName", "Mate3EngName", "Mate3IDNo", "Mate3Date", "havecname4", "Mate4ChiName", "Mate4EngName", "Mate4IDNo", "Mate4Date", "TeamNumber", "TeamPrice", "TeamTotalPrice", "leaderName", "leaderPosition", "payStatus", "formStatus", "teamStatus"] });

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

                var day1 = data[i].Mate1Date.split('/');
                var date1 = day1[2] + "-" + day1[1] + "-" + day1[0];
                data[i].Mate1Date = date1;
                var day2 = data[i].Mate2Date.split('/');
                var date2 = day2[2] + "-" + day2[1] + "-" + day2[0];
                data[i].Mate2Date = date2;
                var day3 = data[i].Mate3Date.split('/');
                var date3 = day3[2] + "-" + day3[1] + "-" + day3[0];
                data[i].Mate3Date = date3;
                var day4 = data[i].Mate4Date.split('/');
                var date4 = day4[2] + "-" + day4[1] + "-" + day4[0];
                data[i].Mate4Date = date4;
            }


            console.log(data);


            var models = await TRGS.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect('/admin/applyHandle/HKRGASearch');
        });

    },



};

