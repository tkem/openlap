import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';
export interface TTSOptions {
    /** text to speak */
    text: string;
    /** cancel, boolean: true/false */
    identifier: string;
    /** voice identifier (iOS / Android) from getVoices */
    locale?: string;
    /** speed rate, 0 ~ 1 */
    rate?: number;
    /** pitch, 0 ~ 1 */
    pitch?: number;
    /** cancel, boolean: true/false */
    cancel?: boolean;
}
export interface TTSVoice {
    /** Voice name */
    name: string;
    /** Voice language */
    language: string;
    /** Voice identifier string */
    identifier: string;
}
/**
 * @name Text To Speech Advanced
 * @description
 * Text to Speech plugin
 * @usage
 * ```typescript
 * import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';
 *
 * constructor(private tts: TextToSpeechAdvanced) { }
 *
 * ...
 *
 * this.tts.speak('Hello World')
 *   .then(() => console.log('Success'))
 *   .catch((reason: any) => console.log(reason));
 *
 * ```
 * @interfaces
 * TTSOptions
 * TTSVoice
 */
export declare class TextToSpeechAdvancedOriginal extends AwesomeCordovaNativePlugin {
    /**
     * This function speaks
     *
     * @param textOrOptions {string | TTSOptions} Text to speak or TTSOptions
     * @returns {Promise<any>} Returns a promise that resolves when the speaking finishes
     */
    speak(textOrOptions: string | TTSOptions): Promise<any>;
    /**
     * Stop any current TTS playback
     *
     * @returns {Promise<any>}
     */
    stop(): Promise<any>;
    /**
     * Get all voices
     *
     * @returns {Promise<TTSVoice[]>}
     */
    getVoices(): Promise<TTSVoice[]>;
}

export declare const TextToSpeechAdvanced: TextToSpeechAdvancedOriginal;