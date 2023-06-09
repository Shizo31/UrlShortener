export = Document;

declare class Document {
    constructor(data: object, collection: any);

    readonly _id?: string;

    $save(instant: boolean = false): Promise<any>;

    $delete(): Promise<any>;
}
