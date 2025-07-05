const express = require('express');
const router = express.Router();


const cleanData = (req, res, next) => {
    const data = req.body;
    const cleanData = {};
    for (const key in data) {
        console.log("Key:", key);
        if (data[key] !== undefined) {
            cleanData[key] = data[key];
        }
        if (data[key] === null) {
            cleanData[key] = null;
        }
        if (data[key] === '') {
            cleanData[key] = '';
        }
        if (typeof data[key] === 'object') {
            cleanData[key] = cleanData(data[key]);
        }
        if (Array.isArray(data[key])) {
            cleanData[key] = data[key].map(item => cleanData(item));
        }
        if (typeof data[key] === 'string') {
            cleanData[key] = data[key].trim();
        }
        if (typeof data[key] === 'number') {
            cleanData[key] = data[key];
        }
        if (typeof data[key] === 'boolean') {
            cleanData[key] = data[key];
        }
        if (data[key].startsWith('<script>') || data[key].endsWith('</script>')) {
            cleanData[key] = '';
            console.log("New request body:", cleanData);
            cleanData["attaque"] = 'Un script a été injecté';
        }
        if (data[key].startsWith('[') && data[key].endsWith(']')) {
            cleanData[key] = JSON.parse(data[key]);
        }      
    }
    req.body = cleanData;
    console.log("New request body:", cleanData);
    next();
};

module.exports = cleanData;