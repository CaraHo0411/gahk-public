/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run *before* your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /*************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  *************************/

  // '*': true,
  AdminController: {
    '*': 'isAdmin'
  },
  UserController: {
    login: true,
    register: true,
    forgot: true,
    '*': 'isUser',
  },
  MembershipController: {
    
    '*': 'isUser',
  },
  AtheleteController: {
    '*': 'isUser',
  },
  CoachController: {
    coachform_detail: true,
    coach_record: true,
    indexAER:true,
    indexACRO:true,
    indexMAG:true,
    indexRG:true,
    indexWAG:true,
    indexTRA:true,
    '*': 'isUser',
  },
  ClubMemberController: {
    clubMemberForm: 'isUser',
    clubMemberFormPreview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirmAll: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    export_xlsx: 'isAdmin',
    import_xlsx: 'isAdmin',
  },

};
