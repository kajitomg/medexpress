export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("DOMAIN") ? `${env.bool("SSL", false) ? "https" : "http"}://${env("DOMAIN")}/panel` : "http://localhost:1337",
  app: {
    keys: env.array("APP_KEYS"),
  },
});
