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
  const store = tx.objectStore('jate');
  // GRAB ALL CONTENT IN DB
  const req = objectStore.getAll();
  // CONFIRM DATA WAS FETCHED
  const res = await req;
  console.log('Data saved to the jateDB', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
