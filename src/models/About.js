import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    aboutme: String,
    noofprojects: String,
    yearofexperience: String,
    noofclients: String,
    skills: String,
  },
  {
    timeStamps: true,
  }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
