const notes = require('../models/notesmodel');


module.exports.ShowAllData =async (req,res)=>{
    try{
     const Notes=await notes.find();

     res.status(201).json(Notes);
    }catch(e){
        res.status(400).json({errors : "data is empty "});
    }

}


module.exports.createNotes = async(req,res)=>{
    const {title, des, color} = req.body
    try{
        const note = await notes.create({title, des , color})
        res.status(201).json(note);

    }catch(e){
        res.status(400).json({errors : "error in posted in notes "});
    }
}


module.exports.updateNotes = async(req,res)=>{
   
    notes.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
        res.status(200).json({
            comment: 'Patch attributes for a model instance and persist it into the data source.',
            responseType: 'success'
        });
        console.log(response)
    })
    .catch(err => {
        // console.log(err);
        res.status(400).json({
            error: "Cannot find digital image with id: " + req.params.id,
            errorMessage: err
        });
    });
}



module.exports.deletionNotes= async(req,res)=>{
    try{
        const note = await notes.findByIdAndDelete(req.params.id);
        res.status(200).json(note);
    }catch(e){
        res.status(400);
        throw new Error('Notes not found');
    }
   

  

  
}