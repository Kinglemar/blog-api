const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/jwt");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
//...

require("./config/google");
require("./config/passport");

//...

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.set("view engine", "ejs");
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
app.set("trust proxy", 1);
app.use(
  session({
    secret: "plain",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.session());

// limit repeated failed requests to auth endpoints
app.use("/v1/auth", authLimiter);

// v1 api routes
app.use("/v1", routes);
app.use(function (req, res, next) {
  if (!req.session) {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  }
  next();
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send({ status: httpStatus.OK, message: "Blog app ready" });
});
app.use((req, res, next) => {
  next(new ApiError(httpStatus.BAD_REQUEST, "Not found"));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
