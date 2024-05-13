import { response, request } from "express";
import Publication from "./publication.model.js";

export const publicationGet = async (req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    try {
        const [total, publication] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .populate({
                    path: 'comments',
                    select: 'comment author -_id',
                    match: { state: true }
                })
                .skip(Number(from))
                .limit(Number(limit))
                .lean()
        ]);

        res.status(200).json({
            total,
            publication
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

export const publicationPost = async (req, res) => {

    const { title, description, img,  author, url } = req.body;
    const publication = new Publication({ title, description, img,  author, url });

    await publication.save();

    res.status(200).json({
        publication
    });

}

export const getPublicationById = async (req, res) => {

    const { id } = req.params;
    const publication = await Publication.findOne({ _id: id });

    res.status(200).json({
        publication
    })
}

export const publicationPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, ...rest } = req.body;

    await Publication.findByIdAndUpdate(id, rest);
    const publication = await Publication.findOne({ _id: id });

    res.status(200).json({
        msg: 'Publication successfully updated',
        publication
    });
}

export const publicationDelete = async (req, res) => {

    const { id } = req.params;

    await Publication.findByIdAndUpdate(id, { state: false });
    const publication = await Publication.findOne({ _id: id });

    res.status(200).json({
        msg: 'Publication successfully delete',
        publication
    });
}