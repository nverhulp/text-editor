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
  console.log('Post to the database');
  // CONNECTION TO DATABASE AND VERSION WE WANT
  const jateDb = await openDB('jate', 1);
  // NEW TRANSACTION
  const tx = jateDb.transaction('jate', 'readwrite');
  // OPEN OBJECT STORE
  const objectStore = tx.objectStore('jate');
  // GRAB ALL CONTENT IN DB
  const req = objectStore.getAll();
  // CONFIRM DATA WAS FETCHED
  const res = await req;
  console.log('Data saved to the jateDB', res);
};

export const getDb = async () => {
  console.log('Getting data from the jateDB');
  // CONNECTION TO DATABASE AND VERSION WE WANT
  const jateDb = await openDB('jate', 1);
  // NEW TRANSACTION
  const tx = jateDb.transaction('jate', 'readwrite');
  // OPEN OBJECT STORE
  const objStore = tx.objectStore('jate');
  // GRAB ALL CONTENT IN DB
  const req = objStore.getAll();
  // CONFIRM DATA WAS FETCHED
  const res = await req;
  console.log('Data saved to the jateDB', res);
  return res;
};

initdb();
