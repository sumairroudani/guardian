const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 */
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
// UserSchema.method({
//   generatePassword(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   },
//   validPassword(password) {
//     return bcrypt.compareSync(password, this.password);
//   },
//   safeModel() {
//     return _.omit(this.toObject(), ['password', '__v']);
//   },
// });

/**
 * Statics
 */
// UserSchema.statics = {
//   /**
//    * Get user
//    * @param {ObjectId} id - The objectId of user.
//    * @returns {Promise<User, APIError>}
//    */
//   get(id) {
//     return this.findById(id)
//       .exec()
//       .then((user) => {
//         if (user) {
//           return user;
//         }
//         throw new APIError('No such user exists!', httpStatus.NOT_FOUND);
//       });
//   },

//   /**
//    * Get user by email
//    * @param {ObjectId} email - The email of user.
//    * @returns {Promise<User, APIError>}
//    */
//   getByEmail(email) {
//     return this.findOne({ email })
//       .exec()
//       .then((user) => {
//         if (user) {
//           return user;
//         }
//         throw new APIError('No such user exists!', httpStatus.NOT_FOUND);
//       });
//   },

//   /**
//    * List users in descending order of 'createdAt' timestamp.
//    * @param {number} skip - Number of users to be skipped.
//    * @param {number} limit - Limit number of users to be returned.
//    * @returns {Promise<User[]>}
//    */
//   list({ skip = 0, limit = 50 } = {}) {
//     return this.find()
//       .sort({ createdAt: -1 })
//       .skip(+skip)
//       .limit(+limit)
//       .exec();
//   },
// };

/**
 * @typedef User
 */
module.exports = mongoose.model('Admin', AdminSchema);