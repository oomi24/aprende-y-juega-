
export enum GameType {
  TRACING = 'tracing',
  WORD_CHEF = 'word_chef',
  SYLLABLE_TREASURE = 'syllable_treasure',
  LETTER_RACE = 'letter_race'
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  level: number;
  stars: number;
}

export interface GameProgress {
  childId: string;
  gameType: GameType;
  score: number;
  completedAt: string;
}

export interface ReadingLevel {
  id: number;
  title: string;
  description: string;
  content: string[];
  unlocked: boolean;
}

export interface AccessibilityConfig {
  highContrast: boolean;
  largeText: boolean;
  gameSpeed: number;
  audioInstructions: boolean;
}
