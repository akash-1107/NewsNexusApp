const express = require('express')
const router = express.Router()

// Function to get paginated data from an array
function getPaginatedData(data, page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    return paginatedData;
  }

router.post('/newsData', async (req, res) => {
    try {
        const page = parseInt(req.body.page)||1; // Get the page number from the request body, default to 1 if not provided
        const pageSize = 10; // Number of items to return per page
    
        const genPaginated = getPaginatedData(global.gen, page, pageSize);
        const businessPaginated = getPaginatedData(global.business, page, pageSize);
        const entertainmentPaginated = getPaginatedData(global.entertainment, page, pageSize);
        const sportsPaginated = getPaginatedData(global.sports, page, pageSize);
        const healthPaginated = getPaginatedData(global.health, page, pageSize);
        const sciencePaginated = getPaginatedData(global.science, page, pageSize);

        res.send([genPaginated, businessPaginated , entertainmentPaginated ,  sportsPaginated ,  healthPaginated , sciencePaginated ])

    } 
    catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
});



module.exports = router