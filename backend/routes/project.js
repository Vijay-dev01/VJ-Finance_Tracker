const express = require("express");
const {
  getProjects,
  newProject,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectscontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authenticate");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/projects' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })



router.route("/projects").get(getProjects);
router.route("/project/:id").get(getSingleProject)
.put(updateProject)
.delete(deleteProject)

//Admin routes
router.route("/admin/project/new").post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProject);
module.exports = router;
