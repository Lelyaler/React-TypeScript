export type AmbientTrackId = 'cyber' | 'fantasy' | 'rain';

export interface AmbientTrackInfo {
  id: AmbientTrackId;
  name: string;
  tagline: string;
}

export const AMBIENT_TRACKS: AmbientTrackInfo[] = [
  {
    id: 'cyber',
    name: 'Cyber Synth',
    tagline: 'Аналоговый синт и фоновые пэды',
  },
  {
    id: 'fantasy',
    name: 'Acoustic Calm',
    tagline: 'Акустические струнные переборы',
  },
  {
    id: 'rain',
    name: 'Night Rain',
    tagline: 'Фоновый шум дождя',
  },
];

const STORAGE_KEY = 'gamevault_ambient_config';

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning = false;
  private currentTrack: AmbientTrackId = 'cyber';
  private volume = 0.4;
  private activeNodes: { stop: () => void }[] = [];
  private listeners: Set<() => void> = new Set();
  private intervalTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.volume !== undefined) this.volume = parsed.volume;
          if (parsed.track !== undefined) this.currentTrack = parsed.track;
        }
      } catch {
        // ignore
      }
    }
  }

  private saveConfig() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ volume: this.volume, track: this.currentTrack })
      );
    } catch {
      // ignore
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getPlaying(): boolean {
    return this.isRunning;
  }

  public getCurrentTrack(): AmbientTrackId {
    return this.currentTrack;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.saveConfig();
    this.notify();
  }

  public toggle(track?: AmbientTrackId): void {
    if (this.isRunning) {
      if (track && track !== this.currentTrack) {
        this.setTrack(track);
      } else {
        this.stop();
      }
    } else {
      if (track) this.currentTrack = track;
      this.play();
    }
  }

  public setTrack(trackId: AmbientTrackId): void {
    this.currentTrack = trackId;
    this.saveConfig();
    if (this.isRunning) {
      this.stopNodes();
      this.startTrack(trackId);
    }
    this.notify();
  }

  public play(): void {
    this.getContext();
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTrack(this.currentTrack);
    this.notify();
  }

  public stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.stopNodes();
    this.notify();
  }

  private stopNodes() {
    if (this.intervalTimer !== null) {
      window.clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  private startTrack(trackId: AmbientTrackId) {
    const ctx = this.getContext();
    if (trackId === 'cyber') {
      this.playCyberAmbient(ctx);
    } else if (trackId === 'fantasy') {
      this.playFantasyAmbient(ctx);
    } else {
      this.playRainAmbient(ctx);
    }
  }

  // Track 1: Warm analog ambient pad chord progression
  private playCyberAmbient(ctx: AudioContext) {
    if (!this.masterGain) return;

    // Chords: Dm (D3, F3, A3) -> F (C3, F3, A3) -> Bb (Bb2, D3, F3) -> C (C3, E3, G3)
    const chords = [
      [146.83, 174.61, 220.0],
      [130.81, 174.61, 220.0],
      [116.54, 146.83, 174.61],
      [130.81, 164.81, 196.0],
    ];

    let chordIdx = 0;

    const playStep = () => {
      if (!this.isRunning || !this.masterGain) return;
      const master = this.masterGain;
      const freqs = chords[chordIdx % chords.length];
      chordIdx++;

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        // detune slightly for lush thickness
        osc.detune.setValueAtTime((idx - 1) * 7, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + idx * 80, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 2.5);
        gain.gain.linearRampToValueAtTime(0.001, now + 7.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start(now);
        osc.stop(now + 8);

        this.activeNodes.push({
          stop: () => {
            gain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
            osc.stop(ctx.currentTime + 0.3);
          },
        });
      });
    };

    playStep();
    this.intervalTimer = window.setInterval(playStep, 6000);
  }

  // Track 2: Ethereal harp/bell chimes over warm root drone
  private playFantasyAmbient(ctx: AudioContext) {
    if (!this.masterGain) return;

    // Root drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();

    drone.type = 'triangle';
    drone.frequency.setValueAtTime(110.0, ctx.currentTime); // A2

    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(260, ctx.currentTime);

    droneGain.gain.setValueAtTime(0.14, ctx.currentTime);

    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);

    drone.start();
    this.activeNodes.push({
      stop: () => {
        droneGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
        drone.stop(ctx.currentTime + 0.4);
      },
    });

    // Pentatonic bell chimes
    const scale = [220.0, 246.94, 277.18, 329.63, 369.99, 440.0, 493.88, 554.37];
    const playBell = () => {
      if (!this.isRunning || !this.masterGain) return;
      const master = this.masterGain;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 4);
    };

    playBell();
    this.intervalTimer = window.setInterval(playBell, 2400);
  }

  // Track 3: Soothing filtered rain and soft distant chords
  private playRainAmbient(ctx: AudioContext) {
    if (!this.masterGain) return;

    // Pink noise buffer generator for rain sound
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.18, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();

    this.activeNodes.push({
      stop: () => {
        rainGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        whiteNoise.stop(ctx.currentTime + 0.5);
      },
    });

    // Muted piano keys
    const chords = [174.61, 220.0, 261.63, 329.63];
    const playChime = () => {
      if (!this.isRunning || !this.masterGain) return;
      const master = this.masterGain;
      const freq = chords[Math.floor(Math.random() * chords.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 4.5);
    };

    this.intervalTimer = window.setInterval(playChime, 3200);
  }
}

export const ambientPlayer = new AmbientAudioEngine();
