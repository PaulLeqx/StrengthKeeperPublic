const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ExerciseSchema = new mongoose.Schema(
  {
    name: String,
    labels: [String],
    datasets: [Number],
  }
);
const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
module.exports = ExerciseModel;

const TrainingSchema = new mongoose.Schema(
  {
    name: String,
    exercise: {
      type: [
        {
          exerciseId: String,
          name: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
  }
);
const TrainingModel = mongoose.model('Training', TrainingSchema)
module.exports = TrainingModel;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      minLenght: 3,
      maxLength: 10,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      max: 1024,
      minLength: 6,
      select: false,
    },
    exercises: [ExerciseSchema],
    trainings: [TrainingSchema],
    activationToken: String,
    activationTokenExpire: Date,
    active: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// play function before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

UserSchema.methods.getActivationToken = function () {
  const activationToken = crypto.randomBytes(20).toString("hex");

  this.activationToken = crypto
    .createHash("sha256")
    .update(activationToken)
    .digest("hex");
  this.activationTokenExpire = Date.now() + 10 * (60 * 1000);

  return activationToken;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
