import axios from 'axios';
import { MainCharacterInstance } from '../models/mainCharacter';
import imageToBase64 from 'image-to-base64';

const api = axios.create({
  baseURL: "https://anapioficeandfire.com/api",
});

export const getInfoCharacter = async (url: string): Promise<MainCharacterInstance> => {
	try {
		var id: string = url.replace(/[^0-9]/g,'');
		const response = await api.get<MainCharacterInstance>(`/characters/${id}`);
		return response.data;
	} catch (err) {
		console.error(err);
	}
}

//Obtenha a informação completa dos principais personagens (povCharacters) das Crônicas do Gelo e Fogo.
export const getPovCharacters = async (): Promise<any> => {
	try {
		const response = await api.get('/books');
		let characters: string[] = [];
		var info: any[]  = [];

		if (!response) return 'Não foi possível encontrar';

		for (let i = 0; i < response.data.length; i++) {
			characters = response.data[i].povCharacters;
			
			for (let j = 0; j < characters.length; j++) {
				const infoCharacter = await getInfoCharacter(characters[j]);
				info.push(infoCharacter);
			}
		}
		return info;
		console.log('fim');
	} catch (err) {
		console.error(err);
	}
}

//CAPA - Obtenha a capa de um ou mais livros.
export const getCoverBook = async (isbn: string) => {
	try {
		return await imageToBase64(`https://covers.openlibrary.org/b/isbn/${isbn}.jpg`)
	} catch (err) {
		console.error(err);
	}
}