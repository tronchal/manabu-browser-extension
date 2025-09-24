export default function(data: { [key: string]: any }) {
    return `
<link href="components/menu/menu.css" rel="stylesheet">

<div class="backdrop absolute inset-0 bg-card opacity-0 hidden transition-discrete transition-all"
     :click="close()"></div>

<form id="menu" class="absolute inset-0 bottom-auto bg-menu p-4 pb-10 translate-y-[-100%] transition-transform">
    <h4 class="text-xl mb-6">Options</h4>
    <div class="mx-auto w-fit mb-8">
        <div class="flex gap-4 flex-wrap justify-center mb-8">
            <select class="select" title="Show words of this category"
                    :change="selectCategory()">
                ${data.categories.map((value, key) =>
                    `<option value="${key}" ${ data.category === key ? 'selected' : "" }>
                        ${value}
                    </option>`
                )}
            </select>

            <select class="select" title="Show words of this JLPT level"
                    :change="selectLevel()">
                ${data.jlptLevels.map((value, key) =>
                    `<option value="${key}" ${ data.level === key ? 'selected' : "" }>
                        ${value}
                    </option>`
                )}
            </select>
        </div>

        <fieldset class="mb-4">
            <label class="toggle">
                <input type="checkbox" :change="changeSetting('furigana')" ${ data.furigana ? 'checked' : '' }>
                Show furigana
            </label>
        </fieldset>

        <fieldset class="mb-4">
            <label class="toggle">
                <input type="checkbox" :change="changeSetting('description')" ${ data.description ? 'checked' : '' }>
                Show description
            </label>
        </fieldset>

        <fieldset class="mb-4">
            <label class="toggle">
                <input type="checkbox" :change="changeSetting('examples')" ${ data.examples ? 'checked' : '' }>
                Show examples
            </label>
        </fieldset>
    </div>

    ${data.voices.length && `
        <h4 class="text-lg mb-4">Voice Settings</h4>
        <div class="mx-auto w-fit">
            <fieldset class="mb-4">
                Voice:
                <select class="select mb-2" title="Available voices in your device"
                        :change="selectVoice()">
                    ${data.voices.map((value, key) =>
                        `<option value="${key}" ${ data.voice === key ? 'selected' : "" }>
                            ${value.name} ${(!value.localService && '*' || '')}
                        </option>`
                    )}
                </select>
                <p class="text-sm italic">* Connects to online service</p>
            </fieldset>
        </div>
    ` || ''}
</form>

<button class="burguer-menu absolute top-2 right-2 p-2 flex flex-col justify-between cursor-pointer"
        :click="toggle()">
    <span></span>
    <span></span>
    <span></span>
</button>
`;
}
