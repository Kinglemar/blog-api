const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');


dotenv.config({ path: path.join(__dirname, '../.env') })

envVarsSchema = Joi.object().keys({
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(10080).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(90).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description('minutes after which reset password token expires'),
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4000),
    MONGODB_URL: Joi.string().required().description('Mongo db connection string'),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google Api client ID'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google client secret')
}).unknown();

const { value, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    jwt: {
        secret: value.JWT_SECRET,
        accessExpirationMinutes: value.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: value.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: value.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: value.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    port: value.PORT,
    env: value.NODE_ENV,
    mongoose: {
        url: value.MONGODB_URL,
        options: {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    google: {
        client_id: value.GOOGLE_CLIENT_ID,
        client_secret: value.GOOGLE_CLIENT_SECRET
    },
    email: {
        smtp: {
            host: value.SMTP_HOST,
            port: value.SMTP_PORT,
            auth: {
                user: value.SMTP_USERNAME,
                pass: value.SMTP_PASSWORD,
            },
        },
        from: value.EMAIL_FROM,
    },
}