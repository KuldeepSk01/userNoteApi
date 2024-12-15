const express = require("express");
const { addNote, updateNote, findNote, findAllNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middleware/auth");
const noteRouter = express.Router();


noteRouter.post("/",auth,addNote);
noteRouter.put("/:Id",auth,updateNote);    //u r passing Id variable the you must call with same params in controller file when u r update or delete
//noteRouter.get("/:Id",auth,findNote);
noteRouter.get("/",auth,findAllNote);
noteRouter.delete("/:Id",auth,deleteNote);


module.exports = noteRouter;