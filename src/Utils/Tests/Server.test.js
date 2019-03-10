import Server from '../Server';
import fetch from 'jest-fetch-mock';

global.fetch = fetch;
const url = 'https://swapi.co';
const json = { results: [] };

describe('Server', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('Если запрос не вернул статус 200, то будет ошибка', async () => {
    fetch.mockResponseOnce(JSON.stringify(json), { status: 201 });

    const result = await Server.fetch(url);
    expect(result.error.status).toBeTruthy();
    expect(result.error.text).not.toBe('');
    expect(result.data).toBeNull();
  });

  it('Если запрос вернул статус 200, то получаем json', async () => {
    fetch.mockResponseOnce(JSON.stringify(json), { status: 200 });

    const result = await Server.fetch(url);
    expect(result.error.status).toBeFalsy();
    expect(result.error.text).toBe('');
    expect(result.data.results.length).toBe(0);
  });
});
