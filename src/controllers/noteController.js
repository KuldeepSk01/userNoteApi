const noteModel = require("../model/note");

const addNote = async (req, res) => {
    console.log(req.userId);
    try {
        const { title, description } = req.body;
        /*
        this is first way to create and save 
        const addNote = await noteModel.create({
            title : title,
            description : description,
            userId : req.userId 
        });
        */
        const createNote = noteModel({
            title: title,
            description: description,
            userId: req.userId
        });
        await createNote.save();
        res.status(201).json({
            status: 201,
            message: "Note added ..",
            data: createNote
        });

    } catch (error) {
        console.log(error);
    }

};
const updateNote = async (req, res) => {
    console.log(req.userId);
    try {
        const { title, description } = req.body;
        const notId = req.params.Id;

        const newNote = {
            title: title,
            description: description,
            userId: req.userId
        }


       const nNote =  await noteModel.findByIdAndUpdate(notId, newNote, { new: true }); // new is update first  then return new value in this fun we have to pass id,model,option

        res.status(200).json({
            status: 200,
            message: "Note updated ..",
            data: nNote

        });

    } catch (error) {
        console.log(error);
    }

};

const deleteNote = async (req, res) => {
    console.log(req.userId);
    try {
        const notId = req.params.Id;
        const deletedNotes =   await noteModel.findByIdAndDelete(notId);
        res.status(201).json({
            status: 201,
            message: "Note deleted successfully .."
        });

    } catch (error) {
        console.log(error);
    }
};


const findNote = async (req, res) => {
    console.log(req.userId);
            const { title, description } = req.body;

    try {
        const notId = req.params.Id;
        const deletedNotes =   await noteModel.find({
            title : title
        });
        res.status(201).json({
            status: 201,
            message: "Note deleted successfully .."
        });

    } catch (error) {
        console.log(error);
    }

 };

const findAllNote = async (req, res) => {
    console.log(req.userId);
    try {

        const allNote = await noteModel.find({ userId: req.userId });
        res.status(200).json({
            status: 200,
            message: "Note Fetched successfully ..",
            data: allNote

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error ..",
        });
    }

};


module.exports = { addNote, updateNote, findNote, findAllNote, deleteNote };
