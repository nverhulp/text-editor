import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT request to update the jateDB');
  // CONNECTION TO DATABASE AND VERSION WE WANT
  const jateDb = await openDB('jate', 1);
  // NEW TRANSACTION
  const tx = jateDb.transaction('jate', 'readwrite');
  // OPEN OBJECT STORE
  const objectStore = tx.objectStore('jate');
  // GRAB ALL CONTENT IN DB
  const request = objectStore.put({ id: 1, value: content });
  // CONFIRM DATA WAS FETCHED
  const result = await request;
  console.log('Data saved to the jateDB', result);
};

export const getDb = async () => {
  console.log('GET request for data from the jateDB');
  // CONNECTION TO DATABASE AND VERSION WE WANT
  const jateDb = await openDB('jate', 1);
  // NEW TRANSACTION
  const tx = jateDb.transaction('jate', 'readonly');
  // OPEN OBJECT STORE
  const objectStore = tx.objectStore('jate');
  // GRAB ALL CONTENT IN DB
  const request = objectStore.getAll();
  // CONFIRM DATA WAS FETCHED
  const result = await request;
  console.log('Data saved to the jateDB', result);
  return result;
};

initdb();
