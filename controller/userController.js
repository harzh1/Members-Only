import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export const signup_get = (req, res, next) => {
  res.render("signup_form", { title: "Sign Up" });
};

export const login_get = (req, res) => {
  res.render("login_form", { title: "Log In", error: null });
};

export const logout_get = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export const profile_get = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: User profile GET");
});

export const signup_post = asyncHandler(async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
});

export const login_post = (req, res, next) => {
  passport.authenticate(
    "local",
    { successRedirect: "/posts", failureRedirect: "/posts" },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.render("login_form", {
          username: req.body.username,
          error: info,
        });
        return;
      } else {
        req.login(user, async function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });
      }
    }
  )(req, res, next);
};
