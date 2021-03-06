/**
 * @api {POST} /projects/:projectId/ask_to_join Ask to Join a project
 * @apiName Ask to join
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Message.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Request sent."
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const insertProjectUsers = require('./insertProjectUsers');
const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Ask to join a project by its id
 *
 * @param {string} req.params.projectId - Project id to retrieve info
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { projectId } = req.params;
  const { user } = req;
  if (!validator.isValidUuid(projectId)) {
    return res.status(404).json({
      msg: constants.messages.error.PROJECT_NOT_FOUND
    });
  }

  return database.projects
    .findById(projectId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: database.users,
          attributes: ['id', 'name', 'email'],
          through: {
            model: database.projects_users,
            attributes: ['role'],
            where: {
              ownerAccepted: true,
              contributorAccepted: true
            }
          }
        }
      ]
    })
    .then(async project => {
      if (!project) {
        return res.status(404).json({
          msg: constants.messages.error.INVALID_PROJECT_ID
        });
      }
      if (project.users.some(currentUser => currentUser.id === user.id)) {
        return res.status(400).json({
          msg: constants.messages.error.USER_ALREADY_JOINED
        });
      }
      await insertProjectUsers(
        project,
        [user],
        constants.roles.CONTRIBUTOR,
        false,
        true
      ).catch(err => {
        logger.error(err);
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      });
      res.status(200).json({
        msg: constants.messages.info.REQUEST_SENT
      });
      const owner = project.users.find(
        user => user.projects_users.role === constants.roles.OWNER
      );
      const token = generateToken(
        { userId: user.id, projectId: project.id },
        constants.values.INVITE_DATA_ENCRYPT_KEY,
        constants.values.INVITE_TOKEN_ENCRYPT_KEY,
        constants.values.TOKEN_EXPIRATION_IN_SECONDS
      );
      const subject = `${user.name} is requesting to join ${project.name}!`;
      const htmlBody = `<b><a href="https://${process.env.FRONTEND_HOST}/users/${user.id}">${
        user.name
      }</a> is requesting to join <a href="https://${process.env.FRONTEND_HOST}/projects/${
        project.id
      }">${project.name}</a></b>
      <br/><br/><a href="https://${process.env.HOST}/projects/${project.id}/accept_invite?inviteData=${token}"> Click here </a> to accept.`;
      return sendEmail(owner.email, subject, htmlBody).catch(err => {
        logger.error(err);
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
