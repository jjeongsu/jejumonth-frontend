import jejuAPI from '../config/axiosJejuConfig';

export async function getList(query) {
  console.log('query', query);
  try {
    const response = await jejuAPI.get('', {
      params: {
        ...jejuAPI.defaults.params,
        ...query,
      },
    });
    if (response.status !== 200) {
      throw 'state' + response.status;
    }
    return response.data;
  } catch (error) {
    console.log('search Error' + error);
  }
  return null;
}
