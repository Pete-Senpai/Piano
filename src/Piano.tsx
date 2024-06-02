import React, { useEffect, useState, useRef } from 'react';
import * as Soundfont from 'soundfont-player';
import { notes } from './notes';
import './App.css';

interface PianoProps {}

const Piano: React.FC<PianoProps> = () => {
    const [keys, setKeys] = useState<string[]>([]);
    const [volume, setVolume] = useState<number>(1); // Default volume set to 1 (100%)
    const pianoRef = useRef<Soundfont.Player | null>(null);
    const audioContextRef = useRef<AudioContext>(new (window.AudioContext || (window as any).webkitAudioContext)());
    const gainNodeRef = useRef<GainNode | null>(null);
    const activeNotesRef = useRef<Map<string, any>>(new Map());

    useEffect(() => {
        // Create a GainNode and connect it to the audio context
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = volume;
        gainNodeRef.current.connect(audioContextRef.current.destination);

        Soundfont.instrument(audioContextRef.current, 'acoustic_grand_piano').then(piano => {
            pianoRef.current = piano;
        });

        const handleKeyDown = (e: KeyboardEvent) => {
            const note = notes[e.key];
            if (note && !keys.includes(note)) {
                setKeys(prevKeys => [...prevKeys, note]);
                playNote(note, e.key);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const note = notes[e.key];
            if (note) {
                setKeys(prevKeys => prevKeys.filter(key => key !== note));
                stopNote(note, e.key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [keys]);

    const playNote = async (note: string, key: string) => {
        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }
        if (pianoRef.current) {
            const audioNode = pianoRef.current.play(note, audioContextRef.current.currentTime, {
                gain: volume // Set the initial volume
            });
            audioNode.connect(gainNodeRef.current!); // Connect the audio node to the GainNode
            activeNotesRef.current.set(key, audioNode);
        }
    };

    const stopNote = (note: string, key: string) => {
        const audioNode = activeNotesRef.current.get(key);
        if (audioNode) {
            audioNode.stop();
            activeNotesRef.current.delete(key);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = newVolume;
        }
    };

    return (
        <div>
            <div id="piano">
                <div className="key" onMouseDown={() => playNote('C4', 'mouseC4')} onMouseUp={() => stopNote('C4', 'mouseC4')}>C4</div>
                <div className="key black" onMouseDown={() => playNote('C#4', 'mouseC#4')} onMouseUp={() => stopNote('C#4', 'mouseC#4')}>C#4</div>
                <div className="key" onMouseDown={() => playNote('D4', 'mouseD4')} onMouseUp={() => stopNote('D4', 'mouseD4')}>D4</div>
                <div className="key black" onMouseDown={() => playNote('D#4', 'mouseD#4')} onMouseUp={() => stopNote('D#4', 'mouseD#4')}>D#4</div>
                <div className="key" onMouseDown={() => playNote('E4', 'mouseE4')} onMouseUp={() => stopNote('E4', 'mouseE4')}>E4</div>
                <div className="key" onMouseDown={() => playNote('F4', 'mouseF4')} onMouseUp={() => stopNote('F4', 'mouseF4')}>F4</div>
                <div className="key black" onMouseDown={() => playNote('F#4', 'mouseF#4')} onMouseUp={() => stopNote('F#4', 'mouseF#4')}>F#4</div>
                <div className="key" onMouseDown={() => playNote('G4', 'mouseG4')} onMouseUp={() => stopNote('G4', 'mouseG4')}>G4</div>
                <div className="key black" onMouseDown={() => playNote('G#4', 'mouseG#4')} onMouseUp={() => stopNote('G#4', 'mouseG#4')}>G#4</div>
                <div className="key" onMouseDown={() => playNote('A4', 'mouseA4')} onMouseUp={() => stopNote('A4', 'mouseA4')}>A4</div>
                <div className="key black" onMouseDown={() => playNote('A#4', 'mouseA#4')} onMouseUp={() => stopNote('A#4', 'mouseA#4')}>A#4</div>
                <div className="key" onMouseDown={() => playNote('B4', 'mouseB4')} onMouseUp={() => stopNote('B4', 'mouseB4')}>B4</div>
            </div>
            <div>Currently pressed keys: {keys.join(', ')}</div>
            <div>
                <label htmlFor="volume">Volume: </label>
                <input 
                    type="range" 
                    id="volume" 
                    name="volume" 
                    min="0" 
                    max="2" // Allow boosting volume up to 200%
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                />
            </div>
        </div>
    );
};

export default Piano;