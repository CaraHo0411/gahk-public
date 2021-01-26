/**
 * GRGS.js
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
    
    teamName: {
      type: "string",
      required: true,
    },

    phone: {
      type: "number"
    },

    email: {
      type: "string"
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

    ID1: {
      type: "string",
    },

    birth1: {
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

    ID2: {
      type: "string",
    },

    birth2: {
      type: "string"
    },

    //Applicant(3)
    havecname3: {
      type: "string"
    },

    chiName3: {
      type: "string"
    },

    engName3: {
      type: "string"
    },

    ID3: {
      type: "string",
    },

    birth3: {
      type: "string"
    },

    //Applicant(4)
    havecname4: {
      type: "string"
    },

    chiName4: {
      type: "string"
    },

    engName4: {
      type: "string"
    },

    ID4: {
      type: "string",
    },

    birth4: {
      type: "string"
    },

    //Applicant(5)
    havecname5: {
      type: "string"
    },

    chiName5: {
      type: "string"
    },

    engName5: {
      type: "string"
    },

    ID5: {
      type: "string",
    },

    birth5: {
      type: "string"
    },

    //Applicant(6)
    havecname6: {
      type: "string"
    },

    chiName6: {
      type: "string"
    },

    engName6: {
      type: "string"
    },

    ID6: {
      type: "string",
    },

    birth6: {
      type: "string"
    },

    coachName: {
      type: "string"
    },

    coachPhone: {
      type: "number"
    },

    leaderName: {
      type: "string"
    },

    leaderPosition: {
      type: "string"
    },

    NoOfTeam: {
      type: "number"
    },

    teamFee: {
      type: "number"
    },

    NoOfPeople: {
      type: "number"
    },

    insurance: {
      type: "number"
    },

    total: {
      type: "number"
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

