import user from './user/user';
import card from './card/card';

async function checkModelsStatus() {
  await Promise.all([user, card])
    .then((results) => {
      results?.forEach((result) => {
        result.init();
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default checkModelsStatus;
