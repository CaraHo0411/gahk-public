/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/form' },

  '/': 'NewsController.index',
  '/aboutus': { view: 'pages/aboutus/index' },
  '/aboutus/office-bearers': { view: 'pages/aboutus/bearers' },

  '/about-gymnastics': { view: 'pages/gymnastics/index' },
  '/about-gymnastics/rhythmic': { view: 'pages/gymnastics/rhythmic' },
  '/about-gymnastics/acrobatic': { view: 'pages/gymnastics/acrobatic' },
  '/about-gymnastics/trampoline': { view: 'pages/gymnastics/trampoline' },
  '/about-gymnastics/aerobic': { view: 'pages/gymnastics/aerobic' },
  '/about-gymnastics/general': { view: 'pages/gymnastics/general' },

  '/training': { view: 'pages/training' },
  '/coach': { view: 'pages/coach' },
  '/judge': { view: 'pages/judge' },
  '/competition': { view: 'pages/competition/1920' },
  '/competition/2019/20': { view: 'pages/competition/1920' },
  '/competition/2018/19': { view: 'pages/competition/1819' },
  '/competition/2017/18': { view: 'pages/competition/1718' },
  '/competition/2016/17': { view: 'pages/competition/1617' },
  '/competition/2015/16': { view: 'pages/competition/1516' },
  '/competition/2014/15': { view: 'pages/competition/1415' },
  '/competition/2013/14': { view: 'pages/competition/1314' },
  '/competition/2012/13': { view: 'pages/competition/1213' },
  //'/competition/2011/12': { view: 'pages/competition/1112' },
  //'/competition/2010/11': { view: 'pages/competition/1011' },
  //'/competition/2009/10': { view: 'pages/competition/0910' },
  //'/competition/2008/09': { view: 'pages/competition/0809' },
  //'/competition/2007/08': { view: 'pages/competition/0708' },
  //'/competition/2006/07': { view: 'pages/competition/0607' },
  //'/competition/2005/06': { view: 'pages/competition/0506' },
  //'/competition/2004/05': { view: 'pages/competition/0405' },
  '/contactus': { view: 'pages/contactus' },
  '/badge': { view: 'pages/badge' },
  '/downloads': { view: 'pages/downloads' },
  '/links': { view: 'pages/links' },
  


  //********************Competition Application routes****************
  '/competition/2020/21': { view: 'pages/competition/2021' },
  '/competition/annex1': { view: 'pages/competition/form/annex1' },
  '/membership/clubMemberFormConfirm': { view: 'membership/clubMemberFormConfirm' },

  '/competition/form/GRGS': { view: 'pages/competition/form/GRGS' },
  '/competition/form/GRGP': { view: 'pages/competition/form/GRGP' },

  '/competition/form/acroage': { view: 'pages/competition/form/acroage' },

  '/competition/form/GFA_form': { view: 'pages/competition/form/GFA_form' },
  '/competition/form/confirm_form': { view: 'pages/competition/form/confirm_form' },
  '/competition/form/TRGSForm': { view: 'pages/competition/form/TRGSForm' },
  '/competition/form/TRGPForm': { view: 'pages/competition/form/TRGPForm' },
  '/competition/form/trampoline': { view: 'pages/competition/form/trampoline' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝



  'GET /membership/chinesememberform': 'MembershipController.chineseMemberForm',
  'GET /coach/update_coach/:id': 'CoachController.update_coach',
  'POST /coach/update_coach/:id': 'CoachController.update_coach',
  'GET /coach/coach_record': 'CoachController.coach_record',
  'POST /coach/coach_record': 'CoachController.coach_record',
  
  'GET /coach/coachform': 'CoachController.coachform',
  'POST /coach/coachform': 'CoachController.coachform',
  'GET /membership/confirm_Coach': 'CoachController.confirm',
  'POST /membership/confirm_Coach': 'CoachController.confirm',
  'GET /membership/coachformPreview': 'CoachController.coachformPreview',
  'POST /membership/coachformPreview': 'CoachController.coachformPreview',


  'GET /membership/admin/export.csv': 'MembershipController.csv',
  'GET /membership/chinesememberform_detail/:id': 'MembershipController.chineseMemberform_detail',
  'GET /membership/update_membership/:id': 'MembershipController.update_membership',
  'POST /membership/update_membership/:id': 'MembershipController.update_membership',
  '/membership/confirm_membership/:id': 'MembershipController.confirm_membership',
  '/membership/canel_membership/:id': 'MembershipController.canel_membership',

  'GET /athelete/athelete_detail/:id': 'AtheleteController.athelete_detail',
  'GET /athelete/athelete_record/export.csv': 'AtheleteController.csv',
  'GET /athelete/update_athelete/:id': 'AtheleteController.update_athelete',
  'POST /athelete/update_athelete/:id': 'AtheleteController.update_athelete',
  '/athelete/confirm_athelete/:id': 'AtheleteController.confirm_athelete',
  '/athelete/canel_athelete/:id': 'AtheleteController.canel_athelete',

//  'GET /coach/coach_record/export.csv': 'CoachController.csv',
  'GET /coach/coachform_detail/:id': 'CoachController.coachform_detail',
//  'GET /coach/update_coach/:id': 'CoachController.update_coach',
//  'POST /coach/update_coach/:id': 'CoachController.update_coach',
  '/coach/confirm_coach/:id' : 'CoachController.confirm_coach',
  '/coach/canel_coach/:id' : 'CoachController.canel_coach',
  '/coach/cancel_coach/:id' : 'CoachController.cancel_coach',
  '/coach/processing_coach/:id' : 'CoachController.processing_coach',
  '/index' : 'CoachController.coach_record',
  'GET /index': 'CoachController.coach_record',
  '/status' : 'CoachController.status',
  'GET /status': 'CoachController.status',


  '/index' : 'CoachController.coach_record',
  'GET /index': 'CoachController.coach_record',
  
  '/indexACRO' : 'CoachController.indexACRO',
  'GET /indexACRO': 'CoachController.indexACRO',

  '/indexAER' : 'CoachController.indexAER',
  'GET /indexAER': 'CoachController.indexAER',

  '/indexMAG' : 'CoachController.indexMAG',
  'GET /indexMAG': 'CoachController.indexMAG',

  '/indexRG' : 'CoachController.indexRG',
  'GET /indexRG': 'CoachController.indexRG',

  '/indexTRA' : 'CoachController.indexTRA',
  'GET /indexTRA': 'CoachController.indexTRA',

  '/indexWAG' : 'CoachController.indexWAG',
  'GET /indexWAG': 'CoachController.indexWAG',

  '/status' : 'CoachController.status',
  'GET /status': 'CoachController.status',


  'GET /user':'UserController.index',
  '/user/login':'UserController.login',
  '/user/logout':'UserController.logout',
  '/user/update_user/:id': 'UserController.Update_User',
  'GET /user/detail/:id': 'UserController.detail',
  '/user/register': 'UserController.register',
  '/user/forgot-password': 'UserController.forgot',

  'GET /admin': 'AdminController.index',

  'GET /admin/news': 'AdminController.news_list',
  '/admin/news/detail': 'AdminController.news_create',
  '/admin/news/detail/:id': 'AdminController.news_detail',
  'DELETE /admin/news/detail/:id': 'AdminController.news_delete',

  'GET /admin/email': 'AdminController.email_list',
  'POST /admin/email/:id': 'AdminController.email_detail',

  'GET /admin/user': 'AdminController.user_list',



  //********************Competition Application routes****************
  //'GET /competition/form/GRGS': 'GRGSController.GRGS_form',
  'POST /competition/form/GRGS': 'GRGSController.GRGS_form',
  'POST /competition/form/GRGS/save': 'GRGSController.save',
  'GET /pages/competition/form/GRGS_Preview': 'GRGSController.GRGS_form_preview',
  'POST /pages/competition/form/GRGS_Preview': 'GRGSController.GRGS_form_preview',

  'POST /competition/form/GRGP': 'GRGPController.GRGP_form',
  'POST /competition/form/GRGP/save': 'GRGPController.save',
  'GET /pages/competition/form/GRGP_Preview': 'GRGPController.GRGP_form_preview',
  'POST /pages/competition/form/GRGP_Preview': 'GRGPController.GRGP_form_preview',

  'POST /competition/form/GFA_form': 'GFAController.GFA_form',
  'GET /pages/competition/form/GFA_Preview': 'GFAController.GFA_form_preview',
  'POST /pages/competition/form/GFA_Preview': 'GFAController.GFA_form_preview',
  'POST /competition/form/GFA/save': 'GFAController.save',

  'POST /competition/form/TRGSForm': 'TRGSController.TRGSForm',
  'GET /pages/competition/form/TRGSFormPreview': 'TRGSController.TRGSFormPreview',
  'POST /pages/competition/form/TRGSFormPreview': 'TRGSController.TRGSFormPreview',
  'POST /competition/form/TRGSForm/save': 'TRGSController.save',

  
  'POST /competition/form/TRGPForm': 'TRGPController.TRGPForm',
  'GET /pages/competition/form/TPGPFormPreview': 'TRGPController.TPGPFormPreview',
  'POST /pages/competition/form/TRGPFormPreview': 'TRGPController.TRGPFormPreview',
  'POST /competition/form/TRGPForm/save': 'TRGPController.save',

  'GET /membership/clubMemberForm': 'ClubMemberController.clubMemberForm',
  'POST /membership/clubMemberForm': 'ClubMemberController.clubMemberForm',
  'GET /membership/clubMemberFormPreview': 'ClubMemberController.clubMemberFormPreview',
  'POST /membership/clubMemberFormPreview': 'ClubMemberController.clubMemberFormPreview',
  'POST /membership/clubMemberForm/save': 'ClubMemberController.save',

  'POST /competition/form/trampoline': 'TrampolineController.trampoline',
  'GET /pages/competition/form/TrampolinePreviewForm': 'TrampolineController.TrampolinePreviewForm',
  'POST /pages/competition/form/TrampolinePreviewForm': 'TrampolineController.TrampolinePreviewForm',
  'POST /competition/form/trampoline/save': 'TrampolineController.save',

  //'GET /competition/form/acroage': 'AcroageController.acroage',
  'POST /competition/form/acroage': 'AcroageController.acroage',
  'GET /pages/competition/form/acroage_preview': 'AcroageController.acroage_preview',
  'POST /pages/competition/form/acroage_preview': 'AcroageController.acroage_preview',
  'POST /competition/form/acroage/save': 'AcroageController.save',

  //*****************************Admin*****************************
  // 'GET /admin/applyHandle/search': 'AdminController.apply_search',
  'GET /admin/applyHandle/acroSearch': 'AdminController.acroSearch',
  'GET /admin/applyHandle/gfaSearch': 'AdminController.gfaSearch',
  'GET /admin/applyHandle/trampolineSearch': 'AdminController.trampolineSearch',
  'GET /admin/applyHandle/HKRGASearch': 'AdminController.HKRGASearch',
  'GET /admin/applyHandle/clubMemberSearch': 'AdminController.clubMemberSearch',

  'GET /admin/applyHandle/TrampolineEditForm/:id': 'TrampolineController.update',
  'POST /admin/applyHandle/TrampolineEditForm/:id': 'TrampolineController.update',
  'POST /admin/applyHandle/trampoline/confirmAll': 'TrampolineController.confirmAll',
  'POST /admin/applyHandle/reject/trampoline/:id': 'TrampolineController.reject',
  'POST /admin/applyHandle/confirm/trampoline/:id': 'TrampolineController.confirm',
  'POST /admin/applyHandle/dataDef/trampoline/:id': 'TrampolineController.dataDef',
  'POST /admin/applyHandle/waitingList/trampoline/:id': 'TrampolineController.waitingList',
  '/trampoline/export_xlsx': 'TrampolineController.export_xlsx',
  '/trampoline/import_xlsx': 'TrampolineController.import_xlsx',

  'GET /admin/applyHandle/GRGSEditForm/:id': 'GRGSController.update',
  'POST /admin/applyHandle/GRGSEditForm/:id': 'GRGSController.update',
  'POST /admin/applyHandle/GRGS/confirmAll': 'GRGSController.confirmAll',
  'POST /admin/applyHandle/reject/GRGS/:id': 'GRGSController.reject',
  'POST /admin/applyHandle/confirm/GRGS/:id': 'GRGSController.confirm',
  'POST /admin/applyHandle/dataDef/GRGS/:id': 'GRGSController.dataDef',
  'POST /admin/applyHandle/waitingList/GRGS/:id': 'GRGSController.waitingList',
  '/GRGS/export_xlsx': 'GRGSController.export_xlsx',
  '/GRGS/import_xlsx': 'GRGSController.import_xlsx',

  'GET /admin/applyHandle/GRGPEditForm/:id': 'GRGPController.update',
  'POST /admin/applyHandle/GRGPEditForm/:id': 'GRGPController.update',
  'POST /admin/applyHandle/GRGP/confirmAll': 'GRGPController.confirmAll',
  'POST /admin/applyHandle/reject/GRGP/:id': 'GRGPController.reject',
  'POST /admin/applyHandle/confirm/GRGP/:id': 'GRGPController.confirm',
  'POST /admin/applyHandle/dataDef/GRGP/:id': 'GRGPController.dataDef',
  'POST /admin/applyHandle/waitingList/GRGP/:id': 'GRGPController.waitingList',
  '/GRGP/export_xlsx': 'GRGPController.export_xlsx',
  '/GRGP/import_xlsx': 'GRGPController.import_xlsx',

  'GET /admin/applyHandle/TRGPEdit/:id': 'TRGPController.update',
  'POST /admin/applyHandle/TRGPEdit/:id': 'TRGPController.update',
  'POST /admin/applyHandle/TRGP/confirmAll': 'TRGPController.confirmAll',
  'POST /admin/applyHandle/reject/TRGP/:id': 'TRGPController.reject',
  'POST /admin/applyHandle/confirm/TRGP/:id': 'TRGPController.confirm',
  'POST /admin/applyHandle/dataDef/TRGP/:id': 'TRGPController.dataDef',
  'POST /admin/applyHandle/waitingList/TRGP/:id': 'TRGPController.waitingList',
  '/TRGP/export_xlsx': 'TRGPController.export_xlsx',
  '/TRGP/import_xlsx': 'TRGPController.import_xlsx',

  'GET /admin/applyHandle/TRGSEdit/:id': 'TRGSController.update',
  'POST /admin/applyHandle/TRGSEdit/:id': 'TRGSController.update',
  'POST /admin/applyHandle/TRGS/confirmAll': 'TRGSController.confirmAll',
  'POST /admin/applyHandle/reject/TRGS/:id': 'TRGSController.reject',
  'POST /admin/applyHandle/confirm/TRGS/:id': 'TRGSController.confirm',
  'POST /admin/applyHandle/dataDef/TRGS/:id': 'TRGSController.dataDef',
  'POST /admin/applyHandle/waitingList/TRGS/:id': 'TRGSController.waitingList',
  '/TRGS/export_xlsx': 'TRGSController.export_xlsx',
  '/TRGS/import_xlsx': 'TRGSController.import_xlsx',

  'GET /admin/applyHandle/clubMemEdit/:id': 'ClubMemberController.update',
  'POST /admin/applyHandle/clubMemEdit/:id': 'ClubMemberController.update',
  'POST /admin/applyHandle/clubMem/confirmAll': 'ClubMemberController.confirmAll',
  'POST /admin/applyHandle/reject/clubMem/:id': 'ClubMemberController.reject',
  'POST /admin/applyHandle/confirm/clubMem/:id': 'ClubMemberController.confirm',
  'POST /admin/applyHandle/dataDef/clubMem/:id': 'ClubMemberController.dataDef',
  '/clubMem/export_xlsx': 'ClubMemberController.export_xlsx',
  '/clubMem/import_xlsx': 'ClubMemberController.import_xlsx',


  'GET /admin/applyHandle/gfaEditForm/:id': 'GFAController.update',
  'POST /admin/applyHandle/gfaEditForm/:id': 'GFAController.update',
  'POST /admin/applyHandle/gfa/confirmAll': 'GFAController.confirmAll',
  'POST /admin/applyHandle/reject/gfa/:id': 'GFAController.reject',
  'POST /admin/applyHandle/confirm/gfa/:id': 'GFAController.confirm',
  'POST /admin/applyHandle/dataDef/gfa/:id': 'GFAController.dataDef',
  'POST /admin/applyHandle/waitingList/gfa/:id': 'GFAController.waitingList',
  '/gfa/import_xlsx': 'GFAController.import_xlsx',
  '/gfa/export_xlsx': 'GFAController.export_xlsx',

  'GET /admin/applyHandle/AcroageEdit/:id': 'AcroageController.update',
  'POST /admin/applyHandle/AcroageEdit/:id': 'AcroageController.update',
  'POST /admin/applyHandle/acroage/confirmAll': 'AcroageController.confirmAll',
  'POST /admin/applyHandle/reject/acroage/:id': 'AcroageController.reject',
  'POST /admin/applyHandle/confirm/acroage/:id': 'AcroageController.confirm',
  'POST /admin/applyHandle/dataDef/acroage/:id': 'AcroageController.dataDef',
  'POST /admin/applyHandle/waitingList/acroage/:id': 'AcroageController.waitingList',
  '/acroage/import_xlsx': 'AcroageController.import_xlsx',
  '/acroage/export_xlsx': 'AcroageController.export_xlsx',




  'GET /admin/user':'AdminController.user_list',
  'GET /coach/export_xlsx':'CoachController.export_xlsx',
  '/coach/export_xlsx': 'CoachController.export_xlsx',
  
};
