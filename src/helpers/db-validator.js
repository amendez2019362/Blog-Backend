import Publication from '../publication/publication.model.js';
import Comment from '../comentario/comment.model.js'

export const existsPublicationById = async (id = '') => {
    const existsPublication = await Publication.findById(id);
    
    if(!existsPublication){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsCommentById = async (id = '') => {
    
    const existsComment = await Comment.findById(id);
    
    if(!existsComment){
        throw new Error(`The ID: ${id} does not exist`);
    }
}