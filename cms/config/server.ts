export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("DOMAIN") ? `${env("SSL") ? "http" : "https"}://${env("DOMAIN")}/panel` : "http://localhost",
  app: {
    keys: env.array("APP_KEYS"),
  },
});
