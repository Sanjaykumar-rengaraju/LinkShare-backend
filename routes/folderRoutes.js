const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const { validateFolderInput } = require('../middlewares/validateInput');

router.post('/folders', validateFolderInput, folderController.createFolder);
router.get('/folders/:name', folderController.getPublicFolder);
router.post('/folders/:name/access', folderController.accessPrivateFolder);
router.delete('/folders/:name', folderController.deleteFolder);

module.exports = router;