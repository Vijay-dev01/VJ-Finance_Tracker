const projects = require("../data/projects.json");
const Project = require("../models/projectModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "Backend/config/config.env" });
connectDatabase();

const seederprojects = async () => {
  try {
    await Project.deleteMany();
    console.log("Projects Deleted!");
    await Project.insertMany(projects);
    console.log("All Projects Added");
  } catch (err) {
    console.log("err", err.message);
  }
  process.exit();
};

seederprojects();
