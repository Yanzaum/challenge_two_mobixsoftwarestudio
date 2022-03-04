import { Request, Response } from 'express';
import { MainCharacterModel, MainCharacterInstance } from '../models/mainCharacter';
import { getCoverBook } from '../services/api';

//PRINCIPAIS PERSONAGENS - Obtenha a informação completa dos principais personagens (povCharacters) das Crônicas do Gelo e Fogo.
export const mainCharacters = async (req: Request, res: Response)  => {
	let result: MainCharacterInstance[] = await MainCharacterModel.find({});
	
  if (result) {
    res.json({ 'povCharacters': result });
  } else {
		res.status(401).send({ error: 'Nenhum retorno.' })
  }
}

//CAPA - Obtenha a capa de um ou mais livros.
export const covers = async (req: Request, res: Response) => {
	var isbns = req.query.isbns;
	if (isbns) {
		let searchCovers: string[] = (isbns as string).split(',');
		let result: MainCharacterInstance[] = [];

		if (searchCovers.length > 0) {
			for (let i = 0; i < searchCovers.length; i++) {
				let response: any = await getCoverBook(searchCovers[i]);
				result.push(response);
			}
			res.json({ 'covers-base64': result });
		} else {
			res.status(400);
  		res.json({ error: 'É necessário informar o código (isbn) de uma os mais capas' });
		}		
	} else {
		res.status(400);
		res.json({ error: 'É necessário informar o código (isbn) do livro que você deseja buscar'});
	}
}

//PERSONAGEM - Obtenha o detalhe de um ou mais personagens.
export const characters = async (req: Request, res: Response) => {
	var characters = req.query.id;

	if (characters) {
		let searchCovers: string[] = (characters as string).split(',');
		let result: MainCharacterInstance[] = [];
		
		if (searchCovers.length === 1) {
			let response = await MainCharacterModel.findOne({ url: `https://anapioficeandfire.com/api/characters/${characters}` }).exec();
			result.push(response);
			res.json({ 'character': result });
		} else {
			for (let i = 0; i < searchCovers.length; i++) {
				let response = await MainCharacterModel.findOne({ url: `https://anapioficeandfire.com/api/characters/${searchCovers[i]}` }).exec();
				result.push(response);
			}
			res.json({ 'characters': result });
		}
	} else {
		res.status(400);
		res.json({ error: 'É necessário informar o código do personagem que você deseja buscar'});
	}
}

//LIVROS DO PERSONAGEM - Obtenha todos os livros relacionados a um personagem.
export const booksCharacter = async (req: Request, res: Response) => {
	var character = req.params.id;

	if (character) {
		let result: any = await MainCharacterModel.findOne({ url: `https://anapioficeandfire.com/api/characters/${character}` }, 'url name books povBooks').exec();
		res.json({ 'books': result });
	} else {
		res.status(400);
		res.json({ error: 'É necessário informar o código do personagem que você deseja buscar'});
	}
}
