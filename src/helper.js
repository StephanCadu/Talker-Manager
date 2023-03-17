const fs = require('fs').promises;
const { join } = require('path');

const readFile = async () => {
  const contentJson = await fs.readFile(
    join(__dirname, './talker.json'),
    'utf-8',
  );
  const content = JSON.parse(contentJson);
  return content;
};

const writeFile = async (talker) => {
  const content = await readFile();
  await fs.writeFile(
    join(__dirname, './talker.json'),
    JSON.stringify([...content, talker], 4),
  );
};

const nextId = async () => {
  const content = await readFile();
  const maxId = Math.max(...content.map(({ id }) => id));
  return maxId + 1;
};

const changeTalker = async (talker) => {
  const content = await readFile();
  const newContent = content.map((talk) => {
    if (talk.id === talker.id) return talker;
    return talk;
  });
  await fs.writeFile(
    join(__dirname, './talker.json'),
    JSON.stringify(newContent, 4),
  );
};

const deleteTalker = async (id) => {
  const content = await readFile();
  const newContent = content.filter((talk) => talk.id !== id);
  await fs.writeFile(
    join(__dirname, './talker.json'),
    JSON.stringify(newContent, 4),
  );
};

const searchTalkers = async (search) => {
  const content = await readFile();
  const talkers = content
    .filter((talk) => !search || talk.name.includes(search));
  return talkers;
};

module.exports = {
  readFile,
  writeFile,
  nextId,
  changeTalker,
  deleteTalker,
  searchTalkers,
};