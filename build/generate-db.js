import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { distDir, srcDir } from './config.js';
import { join, dirname } from 'node:path';
import { Categories, JLPTLevels, DBFields } from '../src/types/enums.js';
import fs from 'node:fs';
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import csv from 'csv-parser';

async function start() {
    console.log('Running SQLite3 version', sqlite3.version.libVersion);

    const vocabDir = join(srcDir, 'data', 'vocab');
    let dirs = readdirSync(vocabDir);
    let id = 1;  // Term ID
    // Get folders by level
    for (const dir of dirs) {
        const fullPath = join(vocabDir, dir);
        if (statSync(fullPath).isDirectory()) {
            console.log('\nProcessing CSV files in', fullPath);
            const files = fs.globSync(join(fullPath, '*.csv'));
            const levelData = [];
            for (let i = 0; i < files.length; i++) {
                const filename = files[i];
                console.log('\nCreating database from', filename);
                const rows = await readCSV(filename);
                const records = await createDatabase(rows, filename.replace(/\.\w+$/, '.sqlite3'), id);
                id += records.length + 100;  // Add enough room for new entries between databases
                levelData.push(...records);
            }
            // Merge all databases of the same level
            console.log(`\nCreating ${dir.toUpperCase()} database`);
            await createDatabase(levelData, join(distDir, 'data', 'vocab', `${dir}.sqlite3`));
        }
    }
}

async function readCSV(filename) {
    return new Promise((resolve) => {
        const results = [];
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results));
    });
}

async function createDatabase(data, filename, id) {
    return new Promise((resolve) => {
        const db = new sqlite3.oo1.DB(':memory:', 'c');
        const numRecords = [];
        const records = [];
        let count = 0;
        try {
            db.exec(`
                CREATE TABLE IF NOT EXISTS words (
                    id INTEGER,
                    word TEXT NOT NULL,
                    furigana TEXT,
                    translation TEXT NOT NULL,
                    category INTEGER NOT NULL,
                    level INTEGER NOT NULL,
                    description TEXT,
                    example TEXT,
                    example_translation TEXT,
                    onyomi TEXT,
                    kunyomi TEXT
                );
                --VACUUM;
            `);

            // Prepare statement for inserting words
            const stmt = db.prepare(`
                INSERT INTO words (${DBFields.join(', ')})
                VALUES (${Array(DBFields.length).fill('?').join(', ')})
            `);
            for (let i = 0; i < data.length; i++) {
                let arr = data[i];
                if (id) {
                    arr = DBFields.map((field) => data[i][field]);
                    arr[0] = id++; // Push ID to first position
                    arr[4] = Categories.indexOf(arr[4]);  // String category to number
                    arr[5] = JLPTLevels.indexOf(arr[5]);  // String level to number
                }
                stmt.bind(arr);
                stmt.stepReset();
                count++;
                records.push(arr);
            }
            stmt.finalize();
            db.exec({
                sql: `
                    SELECT COUNT(word)
                    FROM words
                `,
                resultRows: numRecords
            });
        } catch(err) {
            console.log(err);
        } finally {
            // Save into file system
            const distFile = filename
                .replace(srcDir, distDir);
            mkdirSync(dirname(distFile), { recursive: true });

            const byteArray = sqlite3.capi.sqlite3_js_db_export(db);
            writeFileSync(distFile, Buffer.from(byteArray));

            db.close();
            console.log(`  Inserted ${numRecords[0]} records in the database out of ${count} entries from the CSV data`);
            console.log(`  Database created in ${distFile}`);
            resolve(records);
        }
    });
};

const sqlite3 = await sqlite3InitModule({
    print: console.log,
    printErr: console.error,
});
try {
    start(sqlite3);
} catch (err) {
    console.error(err.name, err.message);
}
