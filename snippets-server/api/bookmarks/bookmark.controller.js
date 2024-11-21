const Bookmark = require('./bookmark.model');

const getBookmarks = async (req, res) => {
    const filter = {};
    const bookmark = await Bookmark.find(filter);
    res.json(bookmark);
};

const createBookmark = async (req,res)=>{
    const { body } = req;

    try{
        const bookmarkDoc = new Bookmark(body);
        const bookmark = await bookmarkDoc.save();
        res.json(bookmark);
    }
    catch(error){
        res.status(500).json({ error: error.toString() });
    }

};

const deleteBookmark = async (req,res)=>{
    const { params } = req;
    const id = params.id;

    try{
        const deleted = await Bookmark.findOneAndDelete({
            _id: id
        });

        if(deleted){
            res.json({message: 'Success', bookmark: id});
        }
        else{
            res.status(404).json({ error: `No bookmark found by id: ${id}` });
        }
    }
    catch(error){
        res.status(500).json({ error: error.toString() });
    }

};

module.exports = {
    getBookmarks,
    createBookmark,
    deleteBookmark
};