const express = require('express');
const {
  readFile,
  writeFile,
  nextId,
  changeTalker,
  deleteTalker,
  searchTalkers,
} = require('../helper');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  existingId,
} = require('../middlewares');

const router = express.Router();

router.get(
  '/search',
  validateToken,
  async (req, res) => {
    const { q } = req.query;
    const talkers = await searchTalkers(q);
    res.status(200).json(talkers);
  },
);

router.get('/', async (_req, res) => res.status(200).json(await readFile()));

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const content = await readFile();
  const talker = content.find((talk) => talk.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talkerInfo = req.body;
    const talker = { id: await nextId(), ...talkerInfo };
    await writeFile(talker);
    res.status(201).json(talker);
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talkerInfo = req.body;
    const talker = { id: +id, ...talkerInfo };
    await changeTalker(talker);
    res.status(200).json(talker);
  },
);

router.delete(
  '/:id',
  validateToken,
  existingId,
  async (req, res) => {
    const { id } = req.params;
    await deleteTalker(+id);
    res.sendStatus(204);
  },
);

module.exports = router;