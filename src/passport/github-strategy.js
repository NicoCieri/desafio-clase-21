import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
import dotenv from "dotenv";

dotenv.config();

const userDao = new UserDao();

const strategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/users/github",
  scope: ["user:email"],
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const { value: email } = profile.emails?.[0] ?? [{ value: null }];

  if (!email) return done(null, false);

  const user = await userDao.getByEmail(email);

  if (user) return done(null, user);

  const newUser = await userDao.register({
    first_name: profile._json.name.split(" ")[0],
    last_name: profile._json.name.split(" ")[1],
    email,
    password: "",
    isGithub: true,
  });

  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
