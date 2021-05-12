const crypto = require("crypto");
const UserModel = require("../models/User.model");
const ErrorResponse = require("../utils/errors.utils");
const sendEmail = require("../utils/sendEmail.utils");

module.exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });

    try {
      const mailTo = await UserModel.findOne({ email });

      if (!mailTo) {
        return next(new ErrorResponse("Email could not be sent", 404));
      }

      const activationToken = user.getActivationToken();

      await user.save();

      const activationUrl = `http://localhost:3000/activation/${activationToken}`;

      const message = `
        <h1>Someone is trying to register on StrenghtKeeper website</h1>
        <p>Please go to this link to activate you account</p>
        <a href=${activationUrl} clicktracking=off>${activationUrl}</a>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Account Activation",
          text: message,
        });

        const token = user.getSignedToken();

        res.status(200).json({ 
          success: true, 
          data: "Email sent",
          token
        });
      } catch (error) {
        user.activationToken = undefined;
        user.activationTokenExpire = undefined;

        await user.save();

        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (error) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.confirmEmail = async (req, res, next) => {
  const activationToken = crypto
    .createHash("sha256")
    .update(req.params.activationToken)
    .digest("hex");

  try {
    const user = await UserModel.findOne({
      activationToken,
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Activation Token", 404));
    }

    user.active = true;
    user.activationToken = undefined;
    user.resetActivationToken = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Acount is now active",
    });
  } catch (err) {
    next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
      <h1>You have requested a new password</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAccount = async (req, res, next) => {
  const {id} = req.params.id;
  try{
    const user = await UserModel.findOne({ id });

    if (user) {
      await user.remove();
      res.status(200).json({
        success: true,
      })
    } else {
      res.status(404).json({
        succes: false
      })
    }
  } catch (error) {
    next(error);
  }
}

module.exports.logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const userInfo = {active: user.active, email: user.email, username: user.username, id: user._id};
  res.status(statusCode).json({ success: true, token, userInfo });
};
