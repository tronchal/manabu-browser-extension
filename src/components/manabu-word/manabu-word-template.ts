export default function(data: { [key: string]: any }) {
    return `
<link href="components/manabu-word/manabu-word.css" rel="stylesheet">

<section class="flex-1 content-center pt-12 pb-8 text-center">
    ${data.furigana && data.word.furigana && `
        <div class="text-1xl text-center mb-2">
            {{word.furigana}}
        </div>
    ` || ''}

    ${data.furigana && (data.word.onyomi || data.word.kunyomi) && `
        <div class="text-center mb-4 -mt-8">
            <p class="${data.word.onyomi ? '' : 'hidden'}"><span title="Onyomi reading">on</span>: {{word.onyomi}}</p>
            <p class="${data.word.kunyomi ? '' : 'hidden'}"><span title="Kunyomi reading">kun</span>: {{word.kunyomi}}</p>
        </div>
    ` || ''}

    <div class="text-8xl leading-24 text-center mb-16 text-word inline-block">
        <span class="hover:border-b border-dashed transition-all duration-50" :click="speak({{word.word}})">
            {{word.word}}
        </span>
    </div>

    <div class="text-2xl text-center mb-8">
        {{word.translation}}
    </div>

    ${data.description && data.word.description && `
        <div class="text-1xl text-center mb-8">
            {{word.description}}
        </div>
    ` || ''}

    ${data.examples && data.word.example && `
        <div class="text-center mb-8 rounded-xl bg-page p-2">
            <p>{{word.example}}</p>
            <p class="italic">{{word.example_translation}}</p>
        </div>
    ` || ''}
</section>

<section class="grid grid-cols-3 justify-items-center items-center">
    <span class="px-3 py-1 rounded-full text-sm font-medium capitalize bg-blue-100 text-(--color-darker) justify-self-start"
          title="Category">
        ${data.categories[data.word.category]}
    </span>

    <div class="flex gap-2">
        <a href="https://jisho.org/search?keyword={{word.sanitized}}" target="_blank"
           class="btn btn-primary" title="See the entry definition in jisho.org">Jisho</a>
        <a href="https://www.kanshudo.com/searcht?q={{word.sanitized}}" target="_blank"
           class="btn btn-primary" title="See examples in kanshudo.com">
            ${data.examples && data.word.example && '+' || ''}Examples
        </a>
        ${data.hasVoices && `
            <span class="btn btn-primary" title="Speak word"
                :click="speak({{word.word}})">
                <span title="Speaker icon" class="icon-sound"></span>
            </span>
        ` || ''}
        <!-- <button class="btn btn-primary" :click="loadNewWord()" title="New word">New word</button> -->
    </div>

    <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-(--color-darker) uppercase justify-self-end"
            title="JLPT level">
        ${data.JLPTLevels[data.word.level]}
    </span>
</section>

<!-- <div class="flex justify-center space-x-4 mt-6">
    <button class="btn btn-primary" id="newword-btn">New Word</button>
    <button class="btn btn-secondary ${data.isBookmarked ? 'bookmarked' : ''}" id="bookmark-btn">
        ${data.isBookmarked ? 'Unbookmark' : 'Bookmark'}
    </button>
</div> -->
`;
}
