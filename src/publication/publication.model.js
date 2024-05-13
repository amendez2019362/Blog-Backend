import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'The main text is required']
    },
    img: {
        type: String,
        required: [true, 'Image URL is required']
    },
    author: { 
        type: String,
        required: [true, 'Author is required']
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', publicationSchema);