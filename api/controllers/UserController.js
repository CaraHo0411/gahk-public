/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs');

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  index: async function (req, res) {
    return res.view('user/index');
  },
 
  login: async function (req, res) {
    if (req.method == 'GET') {return res.view('user/login');}

    if (!req.body.email) {return res.badRequest();}
    if (!req.body.password) {return res.badRequest();}

    var user = await User.findOne({ Email: req.body.email });

    if (!user) {
      res.status(401);
      return res.send('找不到用戶');
    }

    const match = await bcrypt.compare(req.body.password, user.Password);
    if (!match) {
      res.status(401);
      return res.send('密碼錯誤');
    }

    req.session.regenerate((err) => {
      if (err) {return res.serverError(err);}

      req.session.username = user.username;
      req.session.userId = user.id;

      req.session.ChiName = user.ChiName;
      req.session.Email = user.Email;

      req.session.role = user.role;
      req.session.user = user;

      req.session.GRGSdata = user.GRGSdata;
      req.session.GRGPdata = user.GRGPdata;
      req.session.TRGPdata = user.TRGPdata;
      req.session.TRGSdata = user.TRGSdata;
      req.session.clubMemdata = user.clubMemdata;
      req.session.tramData = user.tramData;
      req.session.gfaData = user.gfaData;
      req.session.Acrodata = user.Acrodata;

      //sails.log("[Session] ", req.session);
      req.session.EngName=user.EngName;

      req.session.FormSub=user.FormSub;

      return res.redirect(req.query.r || '/user');

      //sails.log('Session: ' + JSON.stringify(user));
      // return res.json(req.session);
      // return res.ok("Login successfully");

      //if(req.session.role=='admin'){
      //  return res.redirect('/membership/admin/');
      //} else {
      //  return res.redirect('/membership/personal_login/');
      //}
    });
  },

  logout: async function (req, res) {

    req.session.destroy(function (err) {
    
        if (err) return res.serverError(err);
        

        // return res.ok("Log out successfully.");

        
       

        return res.redirect("/coach");

    });
},

  register: async function (req, res) {
    //const firebaseAuth = require('firebase-admin').app('admin').auth();
    //console.log('register');

    if (req.method == 'GET') {
      return res.view('user/register');
    }

    //const fuser = await firebaseAuth.createUser({
    //  email: req.body.User.Email,
    //  password: req.body.User.Password,
    //  phoneNumber: '+852'+req.body.User.Mobile,
    //  displayName: req.body.User.Username
    //});
    ////console.log(fuser);
    //await firebaseAuth.setCustomUserClaims(fuser.uid, {role: req.body.User.role = 'user'});
    req.body.User.Uid = fuser.uid;
    req.body.User.Password = await bcrypt.hash(req.body.User.Password, 10);
    const user = await User.create(req.body.User).fetch();
    if (user) {
      req.session.user = user;
      return res.view('user/index');
    }
    return res.badRequest(error.message);
    //try {

    //} catch(error) {
    //  // Handle Errors here
    //  if (req.wantsJSON) {
    //    return res.json({error:error});
    //  }
    //  return res.badRequest(error.message);
    //}
  },

  //registerFormPreview: async function (req, res) {
  //  if (req.method == 'POST') {

  //    var users = await User.find({Username: req.body.User.Username});
  //    if (users.length > 0) {
  //      return res.badRequest('username already exists.');
  //    }

  //    req.session.data = req.body.User;
  //    return res.view('user/registerFormPreview', { 'userdata': req.session.data || {} });
  //  }

  //},

  //registerConfirm: async function (req, res) {

  //  if (req.method == 'POST') {
  //    const saltRounds = 10;
  //    const hash = await sails.bcryptjs.hash(req.session.data.Password, saltRounds);
  //    req.session.data.Password = hash;
  //    var user = await User.create(req.session.data).fetch();
  //    // await Membership.addToCollection('user', req.session.userId).members(member.id);

  //    req.session.data = {};  //clear data of session
  //    return res.view('user/login');

  //  }
  //},

  //registerAdmin:async function (req, res) {
  //  var user = await User.find();
  //  return res.view('user/registerAdmin', { 'user': user });
  //},

  detail: async function (req, res) {

    const id = req.session.role !== 'admin' || _.isEmpty(req.params.id) ? req.session.userId : req.params.id;
    if (!id) {return res.notFound();}

    if (req.method === 'GET') {
      const model = await User.findOne(id);
      if (!model) {return res.notFound();}

      return res.view('user/detail', { 'user': model });
    }

    if (_.isEmpty(req.body)) {
      return res.badRequest('Form-data not received.');
    }

    const data = {
      Username: req.body.Username,
      ChiName: req.body.ChiName,
      EngName: req.body.EngName,
      Date: new Date(req.body.Date),
      Mobile: req.body.Mobile,
      Hnumber: req.body.Hnumber,
      Email: req.body.Email,
    };

    if (!_.isEmpty(req.body.Password)) {
      data.Password = await require('bcryptjs').hash(req.body.User.Password, 10);
    }

    const models = await User.update(id).set(data).fetch();
    if (_.isEmpty(models)) {return res.notFound();}

    return res.redirect('/user/detail/'+id);
  },

  forgot: async function(req, res) {
    if (req.method === 'GET') {
      return res.view('user/forgot');
    }

    if (validateEmail(req.body.email)) {

    }
    return res.badRequest();
  },

  //update_user: async function (req, res) {

  //  var pid = parseInt(req.params.id) || -1;  //change string to integer

  //  if (req.method == 'GET') {

  //    var model = await User.findOne(req.params.id);

  //    if (!model) {return res.notFound();}

  //    return res.view('user/Update_User', { 'user': model });

  //  } else {

  //    if (typeof req.body.User === 'undefined')
  //    {return res.badRequest('Form-data not received.');}

  //    var models = await User.update(pid).set({
  //      Username: req.body.User.Username,
  //      Password: req.body.User.Password,
  //      ChiName: req.body.User.ChiName,
  //      EngName: req.body.User.EngName,
  //      Date: new Date(req.body.User.Date),
  //      Mobile: req.body.User.Mobile,
  //      Hnumber: req.body.User.Hnumber,
  //      Email: req.body.User.Email,
  //    }).fetch();

  //    console.log(models);

  //    if (models.length == 0) {return res.notFound();}

  //    return res.redirect('/user/registerAdmin');

  //  }
  //},



};
