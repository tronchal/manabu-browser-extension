# Vocabulary
DeepSeek, Gemini.

I want a dataset in CSV format with the full official JLPT N1 list (canonical N1 vocabulary set as published by major JLPT study resources, plus commonly-taught extra JLPT N1 usage words) aligned with common study guides like JLPT Sensei, MLC Japanese School or Kanshudo. Do not include words of lower levels. Do not include particles. Do not repeat any entry.
The CSV must contains the following columns:
- id (incremental number starting with 1)
- word (the Japanese term, use kanji unless it is commonly written in hiragana or katakana)
- furigana (only if the term contains kanji, otherwise leave it empty)
- translation (meanings in English, separated by semicolon and a whitespace. Wrap the value with double quotes.)
- category (one of "adjective", "adverb", "conjunction", "copula", "counter", "expression", "interjection", "interrogative", "kanji", "noun", "number", "particle", "phrase", "pronoun", "suffix", "verb")
- level (JLPT level, from n1 to n5)
Ensure that the values of each row are separated by a comma to do not invalidate the CSV format.

Before starting, count the approximately total number of entries the dataset will have.
Generate the dataset broken into multiple batches of 200 words each.
Start creating the first batch.


# Kanji
DeepSeek.

Create a dataset in CSV format with the complete 370 list of JLPT N1 kanjis aligned with study guides like JMdict, KanjiDic2 or Kanshudo. Include only kanjis, not words. Do not include kanji of lower levels.
The CSV must contains the following columns:
- id (incremental number starting with 1)
- word (the kanji)
- onyomi (onyomi readings of the kanji in katakana, words separated by the character 、. Leave it empty if it does not have any onyomi readings)
- kunyomi (kunyomi readings of the kanji in hiragana, words separated by the character 、. If the word is composed of a root + suffix, separate the root from the suffix with a period. Leave it empty if it does not have any kunyomi readings)
- translation (common meanings of the kanji translated to English, separated by semicolon and a whitespace, wrapped with double quotes)
- category (kanji)
- level (JLPT level, from n1 to n5)


# Kanji list prefilled
DeepSeek, Grok.

The attached kanji contains the full list of JLPT N1 kanjis with the columns "word", "onyomi", "kunyomi", and "translation".
Generate a new CSV file where each row has the following columns populated according to the kanji in the column "word".
- onyomi (Onyomi readings of the kanji in katakana. Separate the readings by the character "、". Leave it empty if it does not have any onyomi readings.)
- kunyomi (Kunyomi readings of the kanji in hiragana. Separate the reading by the character "、". If the word is composed of a root + suffix, separate the root from the suffix with a period. Leave it empty if it does not have any kunyomi readings.)
- translation (Common meanings of the kanji translated to English. Separate the meanings by semicolon and a whitespace. Wrap the whole value with double quotes.)
Ensure that the values of each row are separated by a comma to do not invalidate the CSV format.

Fetch and populate this data from a reliable Japanese dictionary source like JMdict or KanjiDic2.


# Grammar
DeepSeek.

Create a dataset in CSV format with the complete full list of JLPT N1 grammar aligned with common study guides like JLPT Sensei or MLC Japanese School.
The CSV must contains the following columns:
- id (incremental number starting with 1)
- word (the Japanese grammar term, separated by the character 、if there are more than one term)
- furigana (only if the term contains kanji, otherwise leave it empty)
- translation (meanings in English, separated by semicolon and a whitespace, wrapped with double quotes)
- description (short description of the grammar term, convert double quotes to single quotes, wrapped with double quotes)
- example (example sentence using the grammar term)
- example_translation (translation of the example in English, wrapped with double quotes)
- category (one of "adjective", "adverb", "conjunction", "copula", "counter", "expression", "interjection", "interrogative", "kanji", "noun", "number", "particle", "phrase", "pronoun", "suffix", "verb")
- level (JLPT level, from n1 to n5)


# Phrases

I want a dataset in CSV format with some quintessential JLPT N1 only daily-use phrases or expressions aligned with common study guides like JLPT Sensei, MLC Japanese School or Kanshudo.
The CSV must contains the following columns:
- id (incremental number starting with 1)
- word (the Japanese phrase)
- furigana (only if the phrase contains kanji, otherwise leave it empty)
- translation (meanings in English, separated by semicolon and a whitespace. Wrap the value with double quotes.)


# De-duplicate
Gemini.

Given the following CSV file with a list of Japanese JLPT N1 grammar points, generate a CSV file where the rows whose first field "word" is identical or describes the same grammar point are removed, but keep the first row occurrence.


# Improve Quality
Gemini.

You are a Japanese language teacher.
The attached CSV text contains a list of Japanese JLPT N5 kanji.
Review and validate that the data in each row is correct. Review the following columns:
- word: the kanji.
- onyomi: onyomi readings.
- kunyomi: kunyomi readings.
- translation: common translations in English of the kanji.

Apply any correction needed to improve the data.
Do not break CSV format while applying corrections.
Generate a new CSV file with the corrections.