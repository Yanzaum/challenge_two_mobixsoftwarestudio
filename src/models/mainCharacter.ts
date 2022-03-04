import mongoose from 'mongoose';

export interface MainCharacterInstance {
	url?: string;
	name?: string;
	gender?: string;
	culture?: string;
	born?: string;
	died?: string;
	titles?: string[];
	aliases?: string[];
	father?: string;
	mother?: string;
	spouse?: string;
	allegiances?: string[];
	books?: string[];
	povBooks?: string[];
	tvSeries?: string[];
	playedBy?: string[];
}

const Schema = mongoose.Schema;

const mainCharacterSchema = new Schema<MainCharacterInstance>({
	url: String,
	name: String,
	gender: String,
	culture: String,
	born: String,
	died: String,
	titles: [String],
	aliases: [String],
	father: String,
	mother: String,
	spouse: String,
	allegiances: [String],
	books: [String],
	povBooks: [String],
	tvSeries: [String],
	playedBy: [String],
})


export const MainCharacterModel = mongoose.model<MainCharacterInstance>('MainCharacter', mainCharacterSchema);