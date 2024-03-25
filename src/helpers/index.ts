import { TEnvironment } from "../types";

export const parseEnvironment = (env: TEnvironment) => {
  switch (env) {
    case "development":
      return "Dev";
    case "production":
      return "Prod";
    case "test":
      return "Test";
    case "preproduction":
      return "Preprod";
    default:
      return "Unknown";
  }
};
