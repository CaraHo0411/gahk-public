/**
 * TRGP.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    //Team_HKRGAgeGroupCompetitionform attributes
    compYear: {
      type: 'string'
    },

    teamName: {
      type: 'string',
    },

    Phone: {
      type: 'string',
    },

    Email: {
      type: 'string',
    },

    CoachName: {
      type: 'string',
    },

    CoachPhone: {
      type: 'string',
    },

    category: { 
      type:'string', 
    },

    //Applicant(1)
    havecname1: {
      type: "string"
    },

    Mate1ChiName: {
      type: 'string',
    },

    Mate1EngName: {
      type: 'string',
    },

    Mate1IDNo: {
      type: 'string',
    },

    Mate1Date: {
      type: 'ref',
      columnType: 'date'
    },

    //Applicant(2)
    havecname2: {
      type: "string"
    },

    Mate2ChiName: {
      type: 'string',
    },

    Mate2EngName: {
      type: 'string',
    },

    Mate2IDNo: {
      type: 'string',
    },

    Mate2Date: {
      type: 'ref',
      columnType: 'date'
    },

    //Applicant(3)
    havecname3: {
      type: "string"
    },

    Mate3ChiName: {
      type: 'string',
    },

    Mate3EngName: {
      type: 'string',
    },

    Mate3IDNo: {
      type: 'string',
    },

    Mate3Date: {
      type: 'ref',
      columnType: 'date'
    },

    //Applicant(4)
    havecname4: {
      type: "string"
    },

    Mate4ChiName: {
      type: 'string',
    },

    Mate4EngName: {
      type: 'string',
    },

    Mate4IDNo: {
      type: 'string',
    },

    Mate4Date: {
      type: 'ref',
      columnType: 'date'
    },

    TeamNumber: {
      type: 'number',
    },

    TeamPrice: {
      type: 'number',
    },

    TeamTotalPrice: {
      type: 'number',
    },

    Declaration: {
      type: "string"
    },

    VBRC: {
      type: "string"
    },

    leaderName: {
      type: "string",
    },

    leaderPosition: {
      type: "string",
    },

    payStatus: {
      type: "string", //unpaid; paid (decided by admin)
    },

    formStatus: {
      type: "string", //ToBeCon; accepted; rejected; dataDef(decided by admin)
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

