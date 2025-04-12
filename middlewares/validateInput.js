function validateFolderInput(req, res, next) {
    const { name, isPrivate, links } = req.body;
    if (!name || typeof isPrivate !== 'boolean' || !Array.isArray(links)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    next();
  }
  
  module.exports = { validateFolderInput };