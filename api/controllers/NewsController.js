/**
 * NewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: async function(req, res) {
    return res.view('news/index', {news:await News.find({sort:'endDate DESC'})});
  },


};

