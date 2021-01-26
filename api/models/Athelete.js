/**
 * Athelete.js
 *
 * @description :: A model definition.  Represents a coachbase table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    comfirm_athelete:{
      type: 'string'
    },

    check:{
      type: 'string'
    },

    // upload attributes
    avatar: {
      type: 'string'
    },

    // coach form attribute


    AtheleteNo: {
      type: 'number',
      autoIncrement:true

    },



    Choice1: {
      type: 'string',

    },

    Choice2: {
      type: 'string',

    },

    Choice3: {
      type: 'string',

    },

    Choice4: {
      type: 'string',

    },

    Choice5: {
      type: 'string',

    },

    ChiName: {
      type: 'string',

    },
    EngName: {
      type: 'string',

    },


    Gender: {
      type: 'string',
    },

    Date: {
      type: 'ref',
      columnType: 'date'

    },




    Email: {
      type: 'string',
    },


    Contact: {
      type: 'string',
    },


    AddressChi: {
      type: 'string',
    },


    AddressEng: {
      type: 'string',
    },



    SchoolChi: {
      type: 'string',
    },

    SchoolEng: {
      type: 'string',
    },


    Class: {
      type: 'string',
    },

    ChiNamePar: {
      type: 'string',
    },

    EngNamePar: {
      type: 'string',
    },



    EmailPar: {
      type: 'string',
    },

    ContactPar: {
      type: 'string',
    },



    EmergencyContactName: {
      type: 'string',
    },

    EmergencyContact: {
      type: 'string',
    },

    CheckNo:{
      type: 'number',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user: {
      collection: 'User',
      via: 'athelete'
    },
    CheckNo: {
      type: 'string',
    },


  },

};

