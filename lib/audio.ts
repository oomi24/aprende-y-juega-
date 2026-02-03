
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Audio context shared for playback
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return audioContext;
}

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

/**
 * Fallback to browser's native Speech Synthesis if API fails
 */
function playFallbackSpeech(text: string) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a Spanish voice
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang.startsWith('es-')) || voices.find(v => v.lang.includes('es'));
  
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  
  utterance.lang = 'es-VE'; // Prefer Venezuelan Spanish if possible
  utterance.pitch = 1.2;     // Slightly higher pitch for kids
  utterance.rate = 0.9;      // Slightly slower for clarity
  
  window.speechSynthesis.speak(utterance);
}

/**
 * Plays a phrase in Latin American Spanish using Gemini TTS.
 * Automatically falls back to Web Speech API if quota is exceeded or an error occurs.
 */
export async function playInstruction(text: string) {
  try {
    const ctx = getAudioContext();
    
    // Resume context if it was suspended (browser policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Dilo con entusiasmo y voz infantil amable en español latino (Venezuela): ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Friendly female voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini");
    }

    const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
  } catch (error: any) {
    console.error("Error playing Gemini audio instruction, falling back to Web Speech:", error);
    
    // If it's a quota error (429) or any other issue, use the native browser speaker
    playFallbackSpeech(text);
  }
}
