import PWS from 'pws';
import Collection from './lib/Collection';
import argv from './types/argv';

export = RediDB;
declare class RediDB {
	constructor(argv: argv);

	on(event: 'connected', listener: () => void): this;
	on(event: 'disconnect', listener: () => void): this;
	on(event: 'error', listener: (err: string) => void): this;

	private link: string;
	private method: string;
	private ws: PWS;

	private authorization: {
		login: string;
		password: string;
	};

	create(database: string, collection: string): Collection;

	public async connect?(): Promise<void>;
	public disconnect?(): void;

	public readonly connected?: boolean;
}
