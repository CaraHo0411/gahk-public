/**
 * ClubMember.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //clubMemberForm attribute
    clubYear: {
      type: 'string'
    },

    OrgEngName: {
      type: 'string',
    },

    OrgChiName: {
      type: 'string',
    },

    AppEngName: {
      type: 'string',
    },

    AppChiName: {
      type: 'string',
    },

    clubAddr: {
      type: 'string',
    },

    clubTel: {
      type: 'string',
    },

    clubFax: {
      type: 'string',
    },

    clubEmail: {
      type: 'string',
    },

    clubWeb: {
      type: 'string',
    },

    MemberNo: {
      type: 'number',
    },

    brefDes: {
      type: 'string'
    },

    resEngName: {
      type: 'string',
    },

    resChiName: {
      type: 'string',
    },

    position: {
      type: 'string',
    },

    resAddr: {
      type: 'string',
    },

    resTel: {
      type: 'string',
    },

    resFax: {
      type: 'string',
    },

    resEmail: {
      type: 'string',
    },

    year: {
      type: 'number',
    },

    clubFee: {
      type: 'string',
    },

    partD: {
      type: 'string',
    },

    payStatus: {
      type: "string", //unpaid; paid (decided by admin)
    },

    formStatus: {
      type: "string", //ToBeCon; accepted(decided by admin)
    },

    idCode: {
      type: "string"
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

