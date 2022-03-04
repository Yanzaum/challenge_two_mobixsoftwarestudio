import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { getPovCharacters } from './api';
import { MainCharacterModel, MainCharacterInstance } from '../models/mainCharacter';

const USERNAME = process.env['usernameDB'];
const PASSWORD = process.env['passwordDB'];
const CLUSTER = process.env['clusterDB'];
const DBNAME = process.env['nameDB'];

const urlConnectionDB = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(urlConnectionDB);

const dbName = DBNAME;

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(DBNAME);
  const collection = db.collection('maincharacters');

	collection.drop();

	try {
		var results  = await getPovCharacters();

		if (!results) return 'Não foi possível encontrar';

		const insertResult = await collection.insertMany(results);
		console.log('Inserted documents =>', insertResult);
					
	  return 'Done, data entered into the database!';
	} catch (e) {
		return e;
	}
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());