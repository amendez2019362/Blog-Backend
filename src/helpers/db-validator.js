import Publication from '../publication/publication.model.js';

export const existsPublicationById = async (id = '') => {
    const existsPublication = await Publication.findById(id);
    
    if(!existsPublication){
        throw new Error(`The ID: ${id} does not exist`);
    }
}
