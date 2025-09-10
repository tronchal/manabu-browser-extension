import { JapaneseWord } from '../types/interfaces';
import { openDatabase, SQLiteDatabase } from './database';
import { JLPTLevels, DBFields } from '../types/types';

function getQuery(columns: string[], filters: string[]|null = null) {
    return `
        SELECT ${columns.join(', ')}
        FROM words
        ${filters?.length && (
            'WHERE ' + filters.join(' AND ')
        ) || ''}
        ORDER BY RANDOM() LIMIT 1;
    `;
}

export async function getRandomWord(
    category: number = 0,
    level: number = 0
): Promise<JapaneseWord|undefined> {
    const filters = [];
    if (category > 0) {
        filters.push(`category = ${category}`);
    }
    if (level === 0) {
        // Get a random level not including the "all" level at position 0
        level = Math.floor( Math.random() * (JLPTLevels.length - 1) ) + 1;
    }
    filters.push(`level = ${level}`);
    const columns = Object.values(DBFields);
    const db: SQLiteDatabase = await openDatabase(level);
    let res = await db.query(getQuery(columns, filters));
    if (!res.length) {
        res = await db.query(getQuery(columns));
        if (!res.length) {
            return;
        }
    }
    const values = res[0];
    const word: { [key: string]: any } = {};
    columns.forEach((key, i) => {
        word[key] = values[i];
    });

    db.close();
    return word as JapaneseWord;
}

