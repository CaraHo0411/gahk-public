/**
 * GFAController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GFA_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GFA_form'); }

        req.session.data = req.body.GFA;

        return res.view('pages/competition/form/GFA_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GFA_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to GFA
            var modelNum = await GFA.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "GFA" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create GFA
            await GFA.create(req.session.data);

            //clear formdata in session and user
            req.session.data = null;
            req.session.gfaData = null;
            var user = await User.update(req.session.userId).set({
                gfaData: null
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode, 'form': "gfa" });
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.gfaData = req.body;

        var user = await User.update(req.session.userId).set({
            gfaData: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/competition/form/GFA_form' });    // for ajax request
        } else {
            return res.redirect('/competition/form/GFA_form');           // for normal request
        }
    },

    //**************************admin/HandleApply*************************
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GFA.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GFAEditForm', { gfa: model });

        }
        else {

            if (!req.body.GFA)
                return res.badRequest("Form-data not received.");

            var models = await GFA.update(req.params.id).set({
                compYear: req.body.GFA.compYear,
                teamName: req.body.GFA.teamName,
                receiptHeader: req.body.GFA.receiptHeader,
                address: req.body.GFA.address,
                category: req.body.GFA.category,
                havecname: req.body.GFA.havecname,
                cpChiName1: req.body.GFA.cpChiName1,
                cpEngName1: req.body.GFA.cpEngName1,
                cpDayPhone: req.body.GFA.cpDayPhone,
                cpMobilePhone: req.body.GFA.cpMobilePhone,
                email: req.body.GFA.email,
                applicantNum: req.body.GFA.applicantNum,
                crewNum: req.body.GFA.crewNum,
                checkNum: req.body.GFA.checkNum,
                bankName: req.body.GFA.bankName,
                document: req.body.GFA.document,
                payStatus: req.body.GFA.payStatus,
                formStatus: req.body.GFA.formStatus,
                teamStatus: req.body.GFA.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/gfaSearch');
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/gfaSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/gfaSearch');           // for normal request
        }

    },

    // action - confirm all
    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};
        if (req.session.gfaSearchResult == "") {
            var models = await GFA.find();

        } else {
            if (req.session.gfaSearchResult.compYear) condition.compYear = req.session.gfaSearchResult.compYear;
            if (req.session.gfaSearchResult.category) condition.category = req.session.gfaSearchResult.category;
            if (req.session.gfaSearchResult.payStatus) condition.payStatus = req.session.gfaSearchResult.payStatus;
            if (req.session.gfaSearchResult.formStatus) condition.formStatus = req.session.gfaSearchResult.formStatus;
            if (req.session.gfaSearchResult.teamStatus) condition.teamStatus = req.session.gfaSearchResult.teamStatus;

            var models = await GFA.find({
                where: condition
            });
        }

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await GFA.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/gfaSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/gfaSearch');           // for normal request
        }
    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/gfaSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/gfaSearch');           // for normal request
        }
    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/gfaSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/gfaSearch');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/gfaSearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/gfaSearch');           // for normal request
        }

    },

    export_xlsx: async function (req, res) {
        var condition = {};
        if (req.session.gfaSearchResult == "") {
            var models = await GFA.find();

        } else {
            if (req.session.gfaSearchResult.compYear) condition.compYear = req.session.gfaSearchResult.compYear;
            if (req.session.gfaSearchResult.category) condition.category = req.session.gfaSearchResult.category;
            if (req.session.gfaSearchResult.payStatus) condition.payStatus = req.session.gfaSearchResult.payStatus;
            if (req.session.gfaSearchResult.formStatus) condition.formStatus = req.session.gfaSearchResult.formStatus;
            if (req.session.gfaSearchResult.teamStatus) condition.teamStatus = req.session.gfaSearchResult.teamStatus;

            var models = await GFA.find({
                where: condition
            });
        }

        var XLSX = require('xlsx');
        var wb = XLSX.utils.book_new();
        var payStatus, formStatus, teamStatus;
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

            if (model.teamStatus == "suTeam") {
                teamStatus = "正選 Successful Team";
            } else {
                teamStatus = "後補 Team on Waitiing List";
            }

            return {
                "申請表編號 Application Number": model.idCode,
                "比賽年份 Year of Competition": model.compYear,
                "團體名稱 Group Name": model.teamName,
                "收據抬頭 Receipt Header": model.receiptHeader,
                "聯絡地址 Address": model.address,
                "參賽組別 Category": model.category,
                "聯絡人是否有中文姓名 Contact Person Any Chinese name": model.havecname,
                "聯絡人中文姓名 Contact Person Name in Chinese": model.cpChiName,
                "聯絡人英文姓名 Contact Person Name in English": model.cpEngName,
                "聯絡電話(日間) Contact Number(Office Hour)": model.cpDayPhone,
                "聯絡電話(手提) Contact Number(Mobile)": model.cpMobilePhone,
                "聯絡人電郵地址 Contact Person Email Address": model.email,
                "參加人數 Number of Applicants": model.applicantNum,
                "工作人員人數 Number of Crews": model.crewNum,
                "支票編號 Check Number": model.checkNum,
                "銀行名稱 Name of Bank": model.bankName,
                "付款狀況 Payment Status": payStatus,
                "申請狀況 Apply Status": formStatus,
                "隊伍/團體狀況 Team Status": teamStatus,
                "提交日期 Apply Date": applyDate,
                "上次更新 Last upadated": updateDate,
            }
        }));
        XLSX.utils.book_append_sheet(wb, ws, "GFA");
        res.set("Content-disposition", "attachment; filename=GFA.xlsx");
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
            var data = XLSX.utils.sheet_to_json(ws, { range: 1, header: ["idCode", "compYear", "teamName", "receiptHeader", "address", "category", "havecname", "cpChiName", "cpEngName", "cpDayPhone", "cpMobilePhone", "email", "applicantNum", "crewNum", "checkNum", "bankName", "payStatus", "formStatus", "teamStatus"] });

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
            }

            console.log(data);


            var models = await GFA.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect('/admin/applyHandle/gfaSearch');
        });

    },



};

