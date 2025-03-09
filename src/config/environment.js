import dotenv from "dotenv";

export const envConfig = () => {
  dotenv.config();

  if (!process.env.PORT) {
    console.log("PORT is not defined in .env file");
    process.exit(1);
  }
};
