/**
 * Trampoline.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    compYear: {
      type: 'string'
    },

    gender: { 
      type:'string', 
    },

    category: { 
      type:'string', 
    },

    //Applicant(1)
    havecname1: {
      type: "string"
    },

    chiName1: {
      type: "string"
    },

    engName1: {
      type: "string"
    },

    birth1: {
      type: "string"
    },

    email1: {
      type: "string"
    }, 

    phone1: {
      type: "number"
    },

    address1: {
      type: "string"
    },

    //Applicant(2)
    havecname2: {
      type: "string"
    },

    chiName2: {
      type: "string"
    },

    engName2: {
      type: "string"
    },

    birth2: {
      type: "string"
    },

    email2: {
      type: "string"
    }, 

    phone2: {
      type: "number"
    },

    address2: {
      type: "string"
    },

    teamName: {
      type: "string"
    },

    coachName: {
      type: "string"
    },

    coachPhone: {
      type: "number"
    },

    coachNum:{
      type: "string"
    },

    coachAddress:{
      type: "string"
    },

    
    parentName1: {
      type: 'string',
    },

    parentName2: {
      type: 'string',
    },

    payStatus: {
      type: "string", //unpaid; paid (decided by admin)
    },

    formStatus: {
      type: "string", //ToBeCon; accepted(decided by admin)
    },

    teamStatus: { 
      type: "string" //suTeam; waitTeam(decided by admin)
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

