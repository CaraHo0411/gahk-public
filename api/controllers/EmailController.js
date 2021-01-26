/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        if (req.method == "POST") {

            await Email.create(req.body.Email);
            return res.send("Successfully Created!");
            // return res.redirect('/email/create')

            // "".replace("%eventname%","")

        } else {
            return res.view('Email/create');
        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "DELETE") {
            const eid = parseInt(req.params.id) || -1;

            var models = await Email.destroy(eid).fetch();

            if (models.length > 0)
                return res.send("Email Deleted.");
            else
                return res.send("Email not found.");

        } else {
            return res.send("Request Forbidden");
        }
    },

    // action - update
    update: async function (req, res) {

        var eid = parseInt(req.params.id) || -1;

        if (req.method == "GET") {

            var model = await Email.findOne(eid);

            res.set('X-XSS-Protection', 0);

            if (model != null)
                return res.view('Email/update', { 'email': model });
            else
                return res.send("No such Email!");

        } else {
            res.set('X-XSS-Protection', 0);
            var models = await Email.update(eid).set(req.body.Email).fetch();
            var model = await Email.findOne(eid);
            if (models.length > 0)
            return res.view('Email/update', { 'email': model });
            else
                return res.send("No such Email!");

        }
    },
    detail: async function (req, res) {

        var eid = parseInt(req.params.id) || -1;

        var models = await Email.find();
        // var models = model.emailtitle.replace("%eventname%", "")
        
        return res.view('Email/detail', { 'email': models });

       
    },

}

