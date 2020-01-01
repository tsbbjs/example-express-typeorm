import fs from 'fs-extra';
import path from 'path';

export default async () => {
  const confPath = path.join(process.cwd(), 'ormconfig.json');
  try {
    const exists = await fs.pathExists(confPath);
    if (exists) {
      const conf = await fs.readJSON(confPath);
      return conf;
    }
  } catch (error) {
    console.log('Get conf error:', error);
  }
  return {};
}