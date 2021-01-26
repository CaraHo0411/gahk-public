/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

const bcrypt = require('bcryptjs');

module.exports.bootstrap = async function (done) {

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  if (await User.count() == 0) {
    await User.createEach([
      { Username: 'user1', Password: await bcrypt.hash('user123456', 10), role: 'user', ChiName: '用戶1', EngName: 'User1', Email: 'kenny@user.com', Date: new Date() }
    ]);

  }

  const admin = await User.findOne({ Username: 'admin1' });
  if (!admin) {
    await User.create({Username:'admin1', Password:await bcrypt.hash('hkbu123456', 10), role:'admin',ChiName:'管理員1',EngName:'Administrator',Email:'kenny@admin.com',Date:new Date()});
    await User.create({Username:'admin2', Password:await bcrypt.hash('hkbu123456', 10), role:'admin',ChiName:'管理員2',EngName:'Administrator',Email:'17228786@life.hkbu.edu.hk',Date:new Date()});
    await User.create({Username:'admin3', Password:await bcrypt.hash('hkbu123456', 10), role:'admin',ChiName:'管理員3',EngName:'Administrator',Email:'172287862@life.hkbu.edu.hk',Date:new Date()});
    await User.create({Username:'coach1', Password:await bcrypt.hash('hkbu123456', 10), role:'coach',ChiName:'陳大文',EngName:'Coach',Email:'coach@coach.com',Date:new Date()});
    await User.create({Username:'coach2', Password:await bcrypt.hash('hkbu123456', 10), role:'coach',ChiName:'陳大文',EngName:'Coach',Email:'coach2@coach.com',Date:new Date()});
  }

  if (await Email.count() == 0) {
    await Email.createEach([
      { "title": "已成功報名", "emailtitle": "已成功報名 %eventname%", "emailcontent": "敬啟者﹕<P></P>閣下所報讀之%eventname%已被接納，敬請攜同收據於下列時間道體育館出席訓練班有關資料如下：<p></p>上課日期：%eventclassdate%<P></P>上課時間：%eventclasstime%<P></P>上課地點：%eventvenue%<P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 1 },
      { "title": "暫列入候補名單", "emailtitle": "暫列入候補名單 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下申請%eventname%的報名表，但該課程反應熱烈，申請暫列入侯補名單。<p></p>候補名單的申請有以下選擇﹕<br>1.   閣下可選擇繼續於候補名單，如有其他申請人退出，便有機會補上。<br>2.   閣下可通知本會轉讀其他課程，但需留意所轉讀之課程未必仍有空缺。 <P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 2 },
      { "title": "已收到付款", "emailtitle": "已收到付款 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下的支票，本會現正處理有關申請，請閣下耐心等待本會發出之確認信，最遲將於開班前兩星期收到通知。<P></P>如閣下未能收到任何通知，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 3 },
      { "title": "由已成功報名名單改為候補名單", "emailtitle": "由已成功報名名單改為候補名單 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下申請%eventname%的報名表，但該課程反應熱烈，改為暫列入候補名單。<p></p>候補名單的申請有以下選擇﹕<br>1.   閣下可選擇繼續於候補名單，如有其他申請人退出，便有機會補上。<br>2.   閣下可通知本會轉讀其他課程，但需留意所轉讀之課程未必仍有空缺。 <P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 4 },
      { "title": "由候補名單改為已成功報名名單", "emailtitle": "由候補名單改為已成功報名名單 %eventname%", "emailcontent": "<p>敬啟者﹕</p><p>閣下報讀之%eventname%付款詳情如下:&nbsp;</p><p>課程費用:%eventprice%&nbsp;</p><p>如有任何疑問，可致電2504 8233與本會職員聯絡。</p><p>請最遲於開班前兩星期提交支票寄往香港郵政總局第1111 號信箱。支票抬頭請寫上「中國香港體操總會之付款」，否則將被取消資格。</p><p>中國香港體操總會</p>", "emailtype": 5 },
      { "title": "付款詳情", "emailtitle": "%eventname%之付款詳情", "emailcontent": "<p>敬啟者﹕&nbsp;</p><p>閣下報讀之%eventname%付款詳情如下:&nbsp;&nbsp;</p><p>課程費用:%eventprice%&nbsp;&nbsp;</p><p>如有任何疑問，可致電2504 8233與本會職員聯絡。</p><p>請最遲於開班前兩星期提交支票寄往香港郵政總局第1111 號信箱。支票抬頭請寫上「中國香港體操總會之付款」，否則將被取消資格。</p><p>中國香港體操總會</p>", "emailtype": 6 }, ,
    ]);

  }

  if (await News.count() == 0) {
    await News.createEach([
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-10-16'), "endDate": new Date("2020-10-16"), "content": "本會熱烈恭賀香港技巧體操隊員林曉勵、栗島晴楓在2019年10月7日至10月13日於烏茲別克舉辦之技巧體操亞洲錦標賽2019女子雙人決賽中以19.570分，取得第3名!", "link": "http://www.gahk.org.hk/doc/ACROasianchamp2019news.pdf" },
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-10-16'), "endDate": new Date("2020-10-16"), "content": "本會熱烈恭賀香港體操隊員石偉雄在2019年10月4日至10月13日於德國史特加舉辦之第49屆競技體操世界錦標賽男子跳馬決賽中以14.466分，取得第7名，這成績使其成功贏取東京奧運參賽資格！", "link": "http://www.gahk.org.hk/doc/Website_49thWorld%20Championships.pdf" },
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-09-24'), "endDate": new Date("2020-09-24"), "content": "恭喜香港健美體操隊在2019年9月10 日至15日於上海舉辦之2019年全國健美操聯賽第四站取得優異成績。 運動員葉慧雯、吳倩儀、吳浩嵐、胡栢賢及李泳怡於成人組精英組五人操進入決賽；葉慧雯、吳倩儀及吳浩嵐更以第七名的成績晉級決賽，成續優異。", "link": "http://www.gahk.org.hk/doc/website_AERShanghai.pdf" },
    ]);
  }

  //Testing for online application
  if (await GRGS.count() == 0) {
    await GRGS.createEach([
      { teamName: "香港浸會大學第一隊", phone: "12345678", email: "hkbuteam1@gmail.com", category: "集體 A 組(五人圈操)", havecname1: "是 Yes", chiName1: "陳一文", engName1: "Chan Yin Man", ID1: "A1111111", birth1: "2000-01-12", havecname2: "是 Yes", chiName2: "陳二文", engName2: "Chan Yi Man", ID2: "L2222222", birth2: "2000-02-12", havecname3: "是 Yes", chiName3: "陳三文", engName3: "Chan San Man", ID3: "N3333333", birth3: "2000-03-12", havecname4: "是 Yes", chiName4: "陳四文", engName4: "Chan Sai Man", ID4: "Y4444444", birth4: "2000-04-12", havecname5: "是 Yes", chiName5: "陳五文", engName5: "Chan Mon Man", ID5: "A5555555", birth5: "2000-05-12", havecname6: "是 Yes", chiName6: "陳六文", engName6: "Chan Loi Man", ID6: "B6666666", birth6: "2000-06-12", coachName: "陳大文", coachPhone: 22222222, leaderName: "浸大文", leaderPosition: "浸會大學體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam",idCode: "GRGS2020-1" },
      { teamName: "香港大學第一隊", phone: "23456789", email: "hkuteam1@gmail.com", category: "集體 B 組(五人圈操)", havecname1: "是 Yes", chiName1: "陳大一", engName1: "Chan Da Yin", ID1: "Y1111112", birth1: "1998-06-14", havecname2: "是 Yes", chiName2: "陳大二", engName2: "Chan Da Yi", ID2: "W2222232", birth2: "2000-03-02", havecname3: "是 Yes", chiName3: "陳大三", engName3: "Chan Da San", ID3: "V3243331", birth3: "1999-05-15", havecname4: "是 Yes", chiName4: "陳大四", engName4: "Chan Da Sai", ID4: "Y4456444", birth4: "2000-09-10", havecname5: "是 Yes", chiName5: "陳大五", engName5: "Chan Da Mon", ID5: "Y5554355", birth5: "2000-01-30", havecname6: "是 Yes", chiName6: "陳大六", engName6: "Chan Da Loi", ID6: "W1266666", birth6: "2000-02-03", coachName: "陳大大", coachPhone: 28022219, leaderName: "李小小", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GRGS2020-2" },
      { teamName: "香港大學第二隊", phone: "34567890", email: "hkuteam2@gmail.com", category: "集體 B 組(五人圈操)", havecname1: "是 Yes", chiName1: "陳一一", engName1: "Chan Yin Yin", ID1: "A1115611", birth1: "1997-01-05", havecname2: "是 Yes", chiName2: "李月月", engName2: "Lee Yu Yu", ID2: "B1322210", birth2: "2002-02-02", havecname3: "是 Yes", chiName3: "陳金金", engName3: "Chan Kam Kam", ID3: "C4333243", birth3: "2003-09-09", havecname4: "是 Yes", chiName4: "林女女", engName4: "Lam Lui Lui", ID4: "H4467444", birth4: "2004-04-04", havecname5: "是 Yes", chiName5: "吳火火", engName5: "Ng Fo Fo", ID5: "Y2345555", birth5: "2006-09-01", havecname6: "是 Yes", chiName6: "陳手手", engName6: "Chan Sau Sau", ID6: "Y2366662", birth6: "2008-06-30", coachName: "金日一", coachPhone: 22255561, leaderName: "黃老老", leaderPosition: "香港大學體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GRGS2020-3" },
      // etc.
    ]);
  }

  if (await GRGP.count() == 0) {
    await GRGP.createEach([
      { teamName: "第一隊", phone: "12345688", email: "team1@gmail.com", category: "集體 C 組(三球兩帶)", havecname1: "是 Yes", chiName1: "陳一文", engName1: "Chan Yin Man", ID1: "A1111111", birth1: "2000-01-12", havecname2: "是 Yes", chiName2: "蔡水", engName2: "Choi Shau", ID2: "P5672222", birth2: "2008-09-13", havecname3: "是 Yes", chiName3: "陳文", engName3: "Chan Man", ID3: "O8833333", birth3: "2005-08-12", havecname4: "是 Yes", chiName4: "陳四", engName4: "Chan Sai", ID4: "Y6666044", birth4: "2003-06-16", havecname5: "是 Yes", chiName5: "周文", engName5: "Chow Man", ID5: "D1234555", birth5: "1996-01-11", havecname6: "是 Yes", chiName6: "郭文", engName6: "Kwok Man", ID6: "E6789666", birth6: "2001-06-11", coachName: "呂炎", coachPhone: 12322222, leaderName: "蔡一一", leaderPosition: "外國體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam", idCode: "GRGP2020-1" },
      { teamName: "第一隊", phone: "23456799", email: "team2@gmail.com", category: "集體 A 組(五人圈操)", havecname1: "是 Yes", chiName1: "林森", engName1: "Lam Sam", ID1: "B1111132", birth1: "1996-06-18", havecname2: "是 Yes", chiName2: "陳大心", engName2: "Chan Da Sam", ID2: "W2211232", birth2: "2002-03-02", havecname3: "是 Yes", chiName3: "周一", engName3: "Chou Yin", ID3: "G6743331", birth3: "1999-04-27", havecname4: "是 Yes", chiName4: "陳大", engName4: "Chan Da", ID4: "Y5456444", birth4: "2002-03-15", havecname5: "是 Yes", chiName5: "李五五", engName5: "Lee Mon Mon", ID5: "A2345655", birth5: "2002-01-31", havecname6: "是 Yes", chiName6: "陳六六", engName6: "Chan Loi Loi", ID6: "T1257666", birth6: "2003-02-02", coachName: "黃大", coachPhone: 28022555, leaderName: "黃井", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam", idCode: "GRGP2020-2" },
      { teamName: "第二隊", phone: "34566890", email: "team3@gmail.com", category: "集體 A 組(五人圈操)", havecname1: "是 Yes", chiName1: "李李樹", engName1: "Lee Lee Shu", ID1: "A1100001", birth1: "1999-01-25", havecname2: "是 Yes", chiName2: "李月月", engName2: "Lee Yu Yu", ID2: "B1322210", birth2: "2002-02-02", havecname3: "是 Yes", chiName3: "金中", engName3: "Kam Chao", ID3: "Y4333143", birth3: "2003-09-28", havecname4: "是 Yes", chiName4: "林女月", engName4: "Lam Lui Yuen", ID4: "H1267441", birth4: "2004-04-14", havecname5: "是 Yes", chiName5: "吳水", engName5: "Ng Shau", ID5: "Y2367455", birth5: "2006-09-1", havecname6: "是 Yes", chiName6: "呂手", engName6: "Lui Sau", ID6: "Q2356662", birth6: "1998-06-31", coachName: "田一", coachPhone: 22255312, leaderName: "郭水", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GRGP2020-3" },
      // etc.
    ]);
  }

  if (await TRGP.count() == 0) {
    await TRGP.createEach([
      {compYear: "2020", teamName: "機構一", Phone: "23456789", Email: "orgOne@gmail.com", CoachName: "張一一", CoachPhone: "91234567", category: "預備A,B組", havecname1: "是 Yes", Mate1ChiName: "王小明", Mate1EngName:"Wong Shui Ming", Mate1IDNo:"A123456(7)", Mate1Date:"2001-01-21", havecname2: "是 Yes", Mate2ChiName: "易千千", Mate2EngName: "Yik Ching Ching", Mate2IDNo: "B123456(7)", Mate2Date: "2000-11-28", havecname3: "否 No", Mate3ChiName: "", Mate3EngName: "Chan Tai Ming", Mate3IDNo: "C123456(7)", Mate3Date: "2001-04-05", havecname4: "是 Yes", Mate4ChiName: "王明明", Mate4EngName: "Wong Ming Ming", Mate4IDNo: "D123456(7)", Mate4Date: "2000-06-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "張進", leaderPosition: "機構一體操顧問", payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam", idCode: "TRGP2020-1"},
      {compYear: "2020", teamName: "機構二", Phone: "21855555", Email: "orgTwo@gmail.com", CoachName: "李二", CoachPhone: "61234567", category: "預備A,B組", havecname1: "是 Yes", Mate1ChiName: "陳嘉", Mate1EngName:"Cheng Ka", Mate1IDNo:"A234567(8)", Mate1Date:"2003-04-26", havecname2: "是 Yes", Mate2ChiName: "楊凡凡", Mate2EngName: "Yeung Fan Fan", Mate2IDNo: "B234567(8)", Mate2Date: "2001-10-29", havecname3: "是 Yes", Mate3ChiName: "李喜", Mate3EngName: "Lee Hei", Mate3IDNo: "C234567(8)", Mate3Date: "2000-12-05", havecname4: "是 Yes", Mate4ChiName: "方章", Mate4EngName: "Fong Cheung", Mate4IDNo: "D234567(8)", Mate4Date: "2002-07-12", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "陳明明", leaderPosition: "機構一體操部門主任", payStatus: "paid", formStatus: "ToBeCon", teamStatus:"suTeam", idCode: "TRGP2020-2"},
      {compYear: "2021", teamName: "機構三", Phone: "24443333", Email: "orgThree@gmail.com", CoachName: "陳三", CoachPhone: "90909090", category: "高級A組", havecname1: "否 No", Mate1ChiName: "", Mate1EngName:"Lam Ho", Mate1IDNo:"A345678(9)", Mate1Date:"2000-01-07", havecname2: "否 No", Mate2ChiName: "周年", Mate2EngName: "Chou Lin", Mate2IDNo: "B345678(9)", Mate2Date: "1999-09-28", havecname3: "是 Yes", Mate3ChiName: "李白白", Mate3EngName: "Lee Ba Ba", Mate3IDNo: "C345678(9)", Mate3Date: "1998-11-11", havecname4: "是 Yes", Mate4ChiName: "楊桃", Mate4EngName: "Yeung To", Mate4IDNo: "D345678(9)", Mate4Date: "1999-06-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "周月眉", leaderPosition: "行政體操顧問", payStatus: "unpaid", formStatus: "dataDef", teamStatus:"waitTeam", idCode: "TRGP2021-1"},
    ]);
  }

  if (await TRGS.count() == 0) {
    await TRGS.createEach([
      {teamName: "學校一", Phone: "27777777", Email: "schoolOne@gmail.com", CoachName: "周一", CoachPhone: "98765432", category: "初級A組", Mate1ChiName: "王小明", Mate1EngName:"Wong Shui Ming", Mate1IDNo:"A123456(7)", Mate1Date:"2001-01-21", Mate2ChiName: "易千千", Mate2EngName: "Yik Ching Ching", Mate2IDNo: "B123456(7)", Mate2Date: "2000-11-28", Mate3ChiName: "陳大明", Mate3EngName: "Chan Tai Ming", Mate3IDNo: "C123456(7)", Mate3Date: "2001-04-05", Mate4ChiName: "王明明", Mate4EngName: "Wong Ming Ming", Mate4IDNo: "D123456(7)", Mate4Date: "2000-06-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "張進", leaderPosition: "註校體操顧問", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "TRGS2020-1"},
      {teamName: "學校二", Phone: "29056565", Email: "schoolTwo@gmail.com", CoachName: "超二二", CoachPhone: "64321123", category: "初級A組", Mate1ChiName: "陳嘉", Mate1EngName:"Cheng Ka", Mate1IDNo:"A234567(8)", Mate1Date:"2003-04-26", Mate2ChiName: "楊凡凡", Mate2EngName: "Yeung Fan Fan", Mate2IDNo: "B234567(8)", Mate2Date: "2001-10-29", Mate3ChiName: "李喜", Mate3EngName: "Lee Hei", Mate3IDNo: "C234567(8)", Mate3Date: "2000-12-05", Mate4ChiName: "方章", Mate4EngName: "Fong Cheung", Mate4IDNo: "D234567(8)", Mate4Date: "2002-07-12", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "陳明明", leaderPosition: "體操教練", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "TRGS2020-2"},
      {teamName: "學校三", Phone: "23344344", Email: "schoolThree@gmail.com", CoachName: "李三", CoachPhone: "97717711", category: "初級A組", Mate1ChiName: "林好", Mate1EngName:"Lam Ho", Mate1IDNo:"A345678(9)", Mate1Date:"2000-01-07", Mate2ChiName: "周年", Mate2EngName: "Chou Lin", Mate2IDNo: "B345678(9)", Mate2Date: "1999-09-28", Mate3ChiName: "李白白", Mate3EngName: "Lee Ba Ba", Mate3IDNo: "C345678(9)", Mate3Date: "1998-11-11", Mate4ChiName: "楊桃", Mate4EngName: "Yeung To", Mate4IDNo: "D345678(9)", Mate4Date: "1999-06-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "周月眉", leaderPosition: "學校活動主任", payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam", idCode: "TRGS2020-3"},
    ]);
  }

  if (await ClubMember.count() == 0) {
    await ClubMember.createEach([
      {OrgEngName: "Hong Kong Baptist University Gymnastics Club", OrgChiName: "香港浸會大學體操會", AppEngName: "Chou Tai Tai", AppChiName: "周大大", clubAddr:"香港九龍九龍塘香港浸會大學", clubTel: "34110000", clubFax: "34117777", clubEmail: "hkbuGymClub@hkbu.edu.hk", clubWeb: "https://www.hkbu.edu.hk/tch/about/contact.jsp", MemberNo: 150, brefDes: "We are Hong Kong Baptist University Gymnastics Club.", resEngName: "Chan Kai Ki", resChiName: "陳佳淇", position: "學校活動主任", resAddr: "Flat 6E, 6/F, Chan Chan House, Hong Kong", resTel: "97788777", resFax: "21113111", resEmail: "chankaiki@gmail.com", year: 2, clubFee: "150", payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam",idCode: "CLUBMem2020-1"},
      {OrgEngName: "Mrs.LeeChan Gymnastics Company", OrgChiName: "李陳女士體操公司", AppEngName: "Lee Ming Wai", AppChiName: "李明惠", clubAddr:"香港中環李陳女士大廈21樓", clubTel: "24988899", clubFax: "24988877", clubEmail: "leechanGym@gmail.com", clubWeb: "https://www.leechanGym.org", MemberNo: 300, brefDes: "We are Mrs.LeeChan Gymnastics Company.", resEngName: "Yeung Ming Ka", resChiName: "楊明家", position: "李陳女士體操公司秘書長", resAddr: "Flat 22B, 2/F, Lee Chan House, Wai Chai, Hong Kong", resTel: "96667789", resFax: "96667744", resEmail: "yeungmingka@gmail.com", year: 5, clubFee: "1000", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "CLUBMem2020-2"},
    ]);
  }

  if (await Trampoline.count() == 0) {
    await Trampoline.createEach([
      {gender: "男 Male", category: "15 至 16 歲 15 to 16 years old", havecname1: "是 Yes", chiName1: "周小時", engName1: "Chou Shui Shi", birth1: "2005", email1: "choushuishi@gmail.com", phone1: "56777789", address1: "Flat 6E, 6/F, Happy Building, Kowloon Tang, Kowloon, Hong Kong", havecname2: "是 Yes", chiName2: "李清", engName2: "Lee Ching", birth2: "2005", email2: "leeching@gmail.com", phone2: "67788778", address2: "Flat 10G, 10/F, Crying Building, Kowloon Tang, Kowloon, Hong Kong", teamName: "雙人同步第一小隊", coachName: "曾昊", coachPhone: "97888903", coachNum: "", coachAddress: "Flat 1609, 16/F, Happy Estate, Happy House, Chai Wan, Hong Kong", parentName1: "周國恆", parentName2: "李建國", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "TRA2020-1"},
      {gender: "男 Male", category: "15 至 16 歲 15 to 16 years old", havecname1: "是 Yes", chiName1: "張三", engName1: "Cheung Sam", birth1: "2006", email1: "cheunsamsamson@gmail.com", phone1: "67888987", address1: "Flat 5F, 5/F, Happy Building, Kowloon Tang, Kowloon, Hong Kong", havecname2: "是 Yes", chiName2: "楊超", engName2: "Yeung Chiu", birth2: "2005", email2: "yeungchiu@gmail.com", phone2: "95477389", address2: "Flat 21A, 21/F, HaHa Building, Kowloon Tang, Kowloon, Hong Kong", teamName: "雙人同步第二小隊", coachName: "吳鳳", coachPhone: "67775555", coachNum: "A1112", coachAddress: "Flat 34A, 34/F, Happy Estate, Happy House, Chai Wan, Hong Kong", parentName1: "陳小寶", parentName2: "楊展桐", payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam",idCode: "TRA2020-2"},
      {gender: "女 Female", category: "17 歲或以上 17 years old or above", havecname1: "是 Yes", chiName1: "向海晴", engName1: "Heung Hoi Ching", birth1: "2000", email1: "heunghoiching@gmail.com", phone1: "98666846", address1: "Flat 17B, 17/F, Happy Building, Kowloon Tang, Kowloon, Hong Kong", havecname2: "是 Yes", chiName2: "時子瑤", engName2: "Shi Zi You", birth2: "1999", email2: "shiziyou@gmail.com", phone2: "90774756", address2: "Flat 22A, 22/F, ABC Building, Kowloon Tang, Kowloon, Hong Kong", teamName: "雙人同步第三小隊", coachName: "曹芷芳", coachPhone: "67547668", coachNum: "A6776", coachAddress: "Flat 13E, 13/F, CCC Estate, Haha House, Chai Wan, Hong Kong", parentName1: "向豺生", parentName2: "時鑿", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "TRA2020-3"},
    ]);
  }

  if (await Acroage.count() == 0) {
    await Acroage.createEach([
      {category: "4級(9歲或以上) Level 4(9 years old or above)", item: "男子雙人 Men's Double", cpChiName1: "景宇信", cpEngName1: "King Yu Shuen", gender1: "男 Male", birthday1: "2008-09-20", idNo1: "A456789(1)", contactNo1: "67888932", email1: "kingyushuen@gmail.com", address1: "Flat 1207, 12/F, See See Building, Wan Chai, Hong Kong", cpChiName2: "顧子恒", cpEngName2: "Koo Zi Wun", gender2: "男 Male", birthday2: "2010-11-25", idNo2: "B456789(1)", contactNo2: "98755567", email2: "kooziwun@gmail.com", address2: "Flat 23A, 23/F, See See Building, Wan Chai, Hong Kong", coachName: "白斯誠", cContactNo: "98000834", organName: "", receiptHeader: "運動員姓名 Athlete name", receiptName: "", parentName1: "趙俞", parentName2: "顧成功", payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam",idCode: "AGO2020-1"},
      {category: "4級(9歲或以上) Level 4(9 years old or above)", item: "混合雙人 Mixed double", cpChiName1: "張日", cpEngName1: "Cheung Yak", gender1: "男 Male", birthday1: "2009-05-13", idNo1: "A567890(1)", contactNo1: "98886746", email1: "shinnecheung@gmail.com", address1: "Flat 13D, 13/F, See See Building, Wan Chai, Hong Kong", cpChiName2: "李晞晴", cpEngName2: "Lee Hei Ching", gender2: "女 Female", birthday2: "2010-08-11", idNo2: "B567890(1)", contactNo2: "94563665", email2: "heihinglee@gmail.com", address2: "Flat 21A, 21/F, See See Building, Wan Chai, Hong Kong", coachName: "劉裕", cContactNo: "63347589", organName: "劉李美惠體操學校", receiptHeader: "學校/機構名稱 School/Institution Name", receiptName: "劉李美惠體操學校行政部", parentName1: "張中中", parentName2: "李樹", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "AGO2020-2"},
      {category: "2級(6至14歲) Level 2(6-14 years old)", item: "女子三人 Women's trio", cpChiName1: "周一", cpEngName1: "Chou Yak", gender1: "女 Female", birthday1: "2013-05-13", idNo1: "A678901(2)", contactNo1: "67447576", email1: "chouone@gmail.com", address1: "Flat 1D, 1/F, See See Building, Wan Chai, Hong Kong", cpChiName2: "周二", cpEngName2: "Chou Yi", gender2: "女 Female", birthday2: "2012-08-11", idNo2: "B678901(2)", contactNo2: "97787790", email2: "choutwo@gmail.com", address2: "Flat 2A, 2/F, See See Building, Wan Chai, Hong Kong", cpChiName3: "周三", cpEngName3: "Chou Sam", gender3: "女 Female", birthday3: "2013-07-14", idNo3: "B678901(5)", contactNo3: "98657299", email3: "chouthree@gmail.com", address3: "Flat 3A, 3/F, See See Building, Wan Chai, Hong Kong", coachName: "曾文", cContactNo: "67755877", organName: "Mrs. Chan Cheung International School", receiptHeader: "運動員姓名 Athlete name", receiptName: "", parentName1: "周年", parentName2: "周刊", parentName3: "周邊",payStatus: "unpaid", formStatus: "ToBeCon", teamStatus:"suTeam",idCode: "AGO2020-3"},   
    ]);
  }

  if (await GFA.count() == 0) {
    await GFA.createEach([
      {teamName: "普及第一隊", receiptHeader: "普及第一隊行政部", address: "Flat 601, 6/F, Sun Sun Building, Hong Kong", category: "幼稚園 Kindergarten", cpChiName:"陳楚", cpEngName: "Chan Cho", cpDayPhone: "23567456", cpMobilePhone: "90786678", email: "chancho@gmail.com", applicantNum: 18, crewNum: 3, checkNum: "C1234567", bankName: "恒生銀行", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GFA2020-1"},
      {teamName: "普及第二隊", receiptHeader: "普及第二隊行政部", address: "Flat 708, 7/F, Rainy Building, Hong Kong", category: "小學組 Primary School", cpChiName:"蔡芷芊", cpEngName: "Choy Ji Chin", cpDayPhone: "25567898", cpMobilePhone: "58339980", email: "jichinchoy@gmail.com", applicantNum: 20, crewNum: 5, checkNum: "A1234567", bankName: "中國銀行", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GFA2020-2"},
      {teamName: "普及第三隊", receiptHeader: "普及第三隊行政部", address: "Flat 2B, 2/F, SunShine Building, Hong Kong", category: "公開組 Open Group", cpChiName:"林木", cpEngName: "Lam Mo", cpDayPhone: "27654798", cpMobilePhone: "95657976", email: "momolam@gmail.com", applicantNum: 20, crewNum: 2, checkNum: "B12345677", bankName: "恒生銀行", payStatus: "unpaid", formStatus: "ToBeCon",teamStatus:"suTeam", idCode: "GFA2020-3"},
    ]);
  }





  return done();
};
