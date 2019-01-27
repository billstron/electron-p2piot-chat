import fs from 'fs';
import path from 'path';
import electron from 'electron';

export default function(opts = {}, defaults = {}) {
  const { fname = 'config.json' } = opts;
  const userDataPath = (electron.app || electron.remote.app).getPath('userData');
  const filePath = path.join(userDataPath, fname);
  let data = defaults;
  try {
    data = JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // console.error(error); // eslint-disable-line no-console
    data = defaults;
  }

  const self = {
    get(key) {
      return data[key];
    },

    set(key, value) {
      data[key] = value;
      fs.writeFileSync(filePath, JSON.stringify(data));
    },
  };

  return self;
}
