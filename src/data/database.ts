import sqlite3InitModule, { Sqlite3Static, Database } from '@sqlite.org/sqlite-wasm';

export class SQLiteDatabase {
    private db: Database | undefined;
    private level: Number;

    constructor(level: Number) {
        this.level = level;
    }

    async open(sqlite3: Sqlite3Static) {
        console.log('Running SQLite3 version', sqlite3.version.libVersion);
        return fetch(`data/vocab/n${this.level}.sqlite3`)
            .then(res => res.arrayBuffer())
            .then((arrayBuffer) => {
                // https://sqlite.org/wasm/doc/trunk/cookbook.md
                const p = sqlite3.wasm.allocFromTypedArray(arrayBuffer);
                this.db = new sqlite3.oo1.DB();
                const rc = sqlite3.capi.sqlite3_deserialize(
                    this.db.pointer!,
                    'main',
                    p,
                    arrayBuffer.byteLength,
                    arrayBuffer.byteLength,
                    sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE
                );
                this.db.checkRc(rc);
            });
    };

    query(sql: string): Promise<Array<Array<string|number>>> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return resolve([]);
            }
            const resultRows: [] = [];
            try {
                this.db.exec({
                    sql,
                    resultRows
                });
            } catch(err) {
                reject(err);
            } finally {
                resolve(resultRows);
            }
        });
    }

    close() {
        if (this.db) {
            this.db.close();
            delete this.db;
        }
    }
}

export async function openDatabase(level: Number): Promise<SQLiteDatabase> {
    return new Promise(async (resolve) => {
        const sqlite3 = await sqlite3InitModule({
            print: console.log,
            printErr: console.error,
        });
        try {
            const db = new SQLiteDatabase(level);
            await db.open(sqlite3);
            // const res = await db.query(`
            //     SELECT COUNT(word)
            //     FROM words
            // `);
            // console.log(`Database loaded with ${res} words`);
            resolve(db);
        } catch (err: any) {
            console.error(err.name, err.message);
        }
    });
}
