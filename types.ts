export interface BrandSettings {
  orgName: string;
  primaryColor: string; // Hex code
  logoUrl: string;
}

export interface Client {
  id: string;
  name: string;
  gamertag: string;
  game: string;
  rank: string;
  role: string;
  avatar: string;
  status: 'active' | 'pending' | 'inactive';
  nextSession?: string;
}

export interface TrainingTask {
  day: string;
  title: string;
  description: string;
  duration: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  game: string;
  targetRank: string;
  tasks: TrainingTask[];
  createdAt: string;
}

export interface VodComment {
  id: string;
  timestamp: number; // seconds
  text: string;
  author: 'Coach' | 'Player';
}
