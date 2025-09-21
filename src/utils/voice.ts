let cachedVoices :SpeechSynthesisVoice[];

export async function getVoices(lang: string): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
        if (typeof window.speechSynthesis === "undefined") {
            reject('Speech synthesis not supported');
        }
        if (!cachedVoices) {
            window.speechSynthesis.onvoiceschanged = function() {
                cachedVoices = filterVoicesByLang(window.speechSynthesis.getVoices(), lang);
                resolve(cachedVoices);
            };
            return;
        }
        resolve(cachedVoices);
    });
}

function filterVoicesByLang(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice[] {
    return voices.filter((voice :SpeechSynthesisVoice) => {
        return voice.lang === lang;
    });
}

// https://eeejay.github.io/webspeechdemos/
export function speakText(text: string, voice: number) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = cachedVoices[voice];
        // utterance.volume = 0.5; // 0 ~ 1
        // utterance.pitch = 1; // 0 ~ 2
        // utterance.rate = 1; // 0.1 ~ 10
        speechSynthesis.speak(utterance);
    } else {
        console.warn('Speech synthesis not supported');
    }
}
