import React, { useEffect } from 'react';
import * as Soundfont from 'soundfont-player';

// Define the type for props (if needed)
interface PianoProps {}

// Define the Piano component
const Piano: React.FC<PianoProps> = () => {
    // AudioContext is required for Soundfont.js
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Load the piano soundfont
    useEffect(() => {
        Soundfont.instrument(audioContext, 'acoustic_grand_piano').then(piano => {
            // Store the piano in a ref or state if needed
            (window as any).piano = piano;
        });
    }, [audioContext]);

    // Function to play a note
    const playNote = (note: string) => {
        const piano = (window as any).piano;
        if (piano) {
            piano.play(note);
        }
    };

    return (
        <div id="piano">
            <div className="key" onMouseDown={() => playNote('C4')}>C4</div>
            <div className="key black" onMouseDown={() => playNote('C#4')}>C#4</div>
            <div className="key" onMouseDown={() => playNote('D4')}>D4</div>
            <div className="key black" onMouseDown={() => playNote('D#4')}>D#4</div>
            <div className="key" onMouseDown={() => playNote('E4')}>E4</div>
            <div className="key" onMouseDown={() => playNote('F4')}>F4</div>
            <div className="key black" onMouseDown={() => playNote('F#4')}>F#4</div>
            <div className="key" onMouseDown={() => playNote('G4')}>G4</div>
            <div className="key black" onMouseDown={() => playNote('G#4')}>G#4</div>
            <div className="key" onMouseDown={() => playNote('A4')}>A4</div>
            <div className="key black" onMouseDown={() => playNote('A#4')}>A#4</div>
            <div className="key" onMouseDown={() => playNote('B4')}>B4</div>
        </div>
    );
};

export default Piano;
