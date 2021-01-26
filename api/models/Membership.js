/**
 * Person.js
 *
 * @description :: A model definition represents a coachbase table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    check:{
      type: 'string'
    },


    comfirm_member:{
      type: 'string'
    },

    // upload attributes
    avatar: {
      type: 'string'
    },


    parentletter: {
      type: 'string'
    },




    // chinese , english membership form attribute

    Application: {
      type: 'string', //true=new member, false= renewal

    },
    MemberNo: {
      type: 'number',
      autoIncrement:true

    },

    RenewalMemberNo:{
      type:'string',
    },


    ChiName: {
      type: 'string',

    },
    EngName: {
      type: 'string',

    },


    Date: {
      type: 'ref',
      columnType: 'date'

    },
    CorrespondenceChi: {
      type: 'string',

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


    // },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    user: {
      collection: 'User',
      via: 'membership'
    }

  },


};

