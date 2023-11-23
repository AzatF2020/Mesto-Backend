import mongoose from 'mongoose';
import dbConnectionStatus from '../utils/dbConnectionStatus';

async function DBConnection(uri: string) {
  try {
    await mongoose.connect(`${uri}`)
      .then(() => dbConnectionStatus.connected(`Connected to ${uri}`))
      .catch((err) => {
        dbConnectionStatus.error(`Error caused from ${uri}`);
        throw Error(err);
      });
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
}

export default DBConnection;
