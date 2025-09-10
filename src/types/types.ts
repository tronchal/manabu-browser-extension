import {
    Categories as CategoriesJS,
    JLPTLevels as JLPTLevelsJS,
    DBFields as DBFieldsJS
} from './enums';

export const DBFields = DBFieldsJS;
export const Categories = CategoriesJS;
export const JLPTLevels = JLPTLevelsJS;

// Type definitions for better type safety
export type Category = typeof Categories[number];
export type JLPTLevel = typeof JLPTLevels[number];
export type DBField = typeof DBFields[number];

