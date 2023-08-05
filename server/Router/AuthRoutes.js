const express = require("express")

const authContorller = require("../Controllers/AuthControllers")
const notesContorller = require("../Controllers/NotesControllers")

const router = express.Router()

// router.get("/signup",authContorller.signup_get)
router.post("/signup",authContorller.signup_post)
router.get("/login",authContorller.login_get)
router.post("/login",authContorller.login_post)
router.get("/logout",authContorller.logout_get)
router.get("/getData",notesContorller.ShowAllData)
router.post("/addNote",notesContorller.createNotes)
router.put("/editNotes/:id",notesContorller.updateNotes)
router.delete('/delete/:id',notesContorller.deletionNotes)


module.exports = router;