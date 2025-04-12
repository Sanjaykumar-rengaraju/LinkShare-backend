const db = require('../config/firebase'); // This should be Firestore instance
const { hashPassword, comparePassword } = require('../utils/hashUtils');

exports.createFolder = async (req, res) => {
  const { name, isPrivate, password, links } = req.body;
  const folderRef = db.collection('folders').doc(name);
  const doc = await folderRef.get();

  if (doc.exists) {
    return res.status(409).json({ error: 'Folder name already taken' });
  }

  const folderData = {
    isPrivate,
    createdAt: Date.now(),
    links,
  };

  if (isPrivate) {
    if (!password) return res.status(400).json({ error: 'Password required for private folder' });
    folderData.passwordHash = await hashPassword(password);
  }

  await folderRef.set(folderData);
  res.status(201).json({ message: 'Folder created successfully' });
};

exports.getPublicFolder = async (req, res) => {
  const { name } = req.params;
  const folderRef = db.collection('folders').doc(name);
  const doc = await folderRef.get();

  if (!doc.exists) return res.status(404).json({ error: 'Folder not found' });

  const folder = doc.data();
  if (folder.isPrivate) return res.status(403).json({ error: 'Folder is private' });

  res.json({ name, links: folder.links });
};

exports.accessPrivateFolder = async (req, res) => {
  const { name } = req.params;
  const { password } = req.body;

  const folderRef = db.collection('folders').doc(name);
  const doc = await folderRef.get();

  if (!doc.exists) return res.status(404).json({ error: 'Folder not found' });

  const folder = doc.data();
  if (!folder.isPrivate || !folder.passwordHash) return res.status(400).json({ error: 'Folder is not private' });

  const match = await comparePassword(password, folder.passwordHash);
  if (!match) return res.status(401).json({ error: 'Incorrect password' });

  res.json({ name, links: folder.links });
};

exports.deleteFolder = async (req, res) => {
  const { name } = req.params;
  await db.collection('folders').doc(name).delete();
  res.json({ message: 'Folder deleted successfully' });
};