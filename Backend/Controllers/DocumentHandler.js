const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Document = require('../Models/Documents.js');


const uploadDocument = async (req, res) => {
    try {
        const { email, DocName } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'File not provided' });
        }

        const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: 'Invalid file type. Only PNG, JPEG, and PDF are allowed.' });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
            resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'auto', 
            folder: 'documents', 
        });

        const docUrl = cloudinaryResponse.secure_url;

        const newDocument = new Document({
            UserEmail: email,
            DocName,
            DocUrl: docUrl,
            DocDate: new Date(),
        });

        await newDocument.save();

        res.status(201).json({ message: 'File uploaded successfully', document: newDocument });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file', details: error.message });
    }
};

const getDocuments = async (req, res) => {
    try {
        const { email } = req.params;
        const documents = await Document.find({ UserEmail :email });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
};

const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();

        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Failed to fetch documents', error });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { fileName } = req.params;

        const document = await Document.findOne({ DocName: fileName });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const publicId = document.DocUrl.split('/').slice(-1)[0].split('.')[0];

        await cloudinary.uploader.destroy(`patient_documents/${publicId}`, { resource_type: 'raw' });

        await Document.deleteOne({ _id: document._id });

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting document', details: error.message });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    getAllDocuments,
    deleteDocument,
};
