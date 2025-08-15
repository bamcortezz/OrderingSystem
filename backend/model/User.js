const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
   {

      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      status: { type: String, enum: ['active', 'not_active'], default: 'active' },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      reset_token: { type: String },
      reset_token_expire: { type: Date }

   },
   {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
   }
);

userSchema.pre('save', async function (next) {

   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();

});

module.exports = mongoose.model('User', userSchema);