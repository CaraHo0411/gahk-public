/**
 * User.js
 *
 * @description :: A model definition represents a coachbase table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    Uid: {
      type: 'string'
    },

    supervises: {
      collection: 'Coach',
      via: 'worksFor'
    },

    Username: {
      type: 'string'
    },

    Password: {
      type: 'string'
    },

    FormSub:{

      type:'string'
    },

    role: {
      type: 'string',
      isIn: ['admin', 'user', 'member', 'athelete', 'coach', 'visitor'],
      defaultsTo: 'visitor'
    },

    ChiName: {
      type: 'string',

    },
    EngName: {
      type: 'string',

    },


    Date: {
      type: 'ref',
      columnType: 'datetime'
    },


    Mobile: {
      type: 'string',

    },
    Hnumber: {
      type: 'string',

    },

    Email: {
      type: 'string',
    },

    /////////////////////////////////////////////////////////////////////
    GRGSdata: {
      type: 'json',
    },

    GRGPdata: {
      type: 'json',
    },
    
    TRGPdata: {
      type: 'json',
    },

    TRGSdata: {
      type: 'json',
    },

    clubMemdata: {
      type: 'json',
    },


    tramData: {
      type: 'json',
    },

    gfaData: {
      type: 'json',
    },

    Acrodata: {
      type: 'json',
    },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    membership: {
      collection: 'Membership',
      via: 'user'
    },
    athelete: {
      collection: 'Athelete',
      via: 'user'
    },
    coach: {
      collection: 'Coach',
      via: 'user'
    }
  },

};

