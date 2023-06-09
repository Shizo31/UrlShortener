import ICreateRequest from '../types/createRequest';
import IDeleteRequest from '../types/deleteRequest';
import IFilter from '../types/filter';
import IUpdateRequest from '../types/updateRequest';
import Document from './Document';

export = Collection;
declare class Collection {
	constructor(
		redi: any,
		{
			database: string,
			collection,
		}: {
			database: string;
			collection: string;
		}
	);

	private redi: ClassDecorator;
	private data: {
		database: string;
		collection: string;
	};

	create<T extends object>(...objects: Omit<T, '$save' | '$delete'>[]): Promise<ICreateRequest[]>;
	search<T extends Document>(filter?: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>): Promise<T[]>;
	searchOne<T extends Document>(filter?: Omit<IFilter<T>, '$max'> & Partial<Omit<T, '$save' | '$delete'>>): Promise<T | null>;
	update<T extends Document>(filter: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>, update: Partial<Omit<T, '$save' | '$delete'>>): Promise<IUpdateRequest[]>;
	instantUpdate<T extends Document>(filter: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>, update: Partial<Omit<T, '$save' | '$delete'>>): Promise<IUpdateRequest[]>;
	searchOrCreate<T extends Document>(
		filter?: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>,
		create?: Partial<Omit<T, '$save' | '$delete'>>
	): Promise<{
		created: boolean;
		data: T;
	}>;
	delete<T extends Document>(filter?: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>): Promise<IDeleteRequest[]>;
	count<T extends Document>(filter?: IFilter<T> & Partial<Omit<T, '$save' | '$delete'>>): Promise<number>;
}
