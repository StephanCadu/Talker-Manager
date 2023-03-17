const { readFile } = require('../helper');

const existingId = async (req, res, next) => {
  const { id } = req.params;
  const content = await readFile();
  const talker = content.find((talk) => talk.id === +id);
  if (!talker) {
    return res.status(400)
      .json({ message: 'Id não encontrado' });
  }
  next();
};

module.exports = existingId;