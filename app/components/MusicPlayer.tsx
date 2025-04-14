import { useEffect, useRef, useState } from "react";
import "../styles/music.css";

export default function MusicPlayer(props: any) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playButtonRef = useRef<SVGElement | null>(null);
    const pauseButtonRef = useRef<SVGElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Ensure that refs are correctly assigned after the component mounts
        const audio = audioRef.current;
        const playButton = playButtonRef.current;
        const pauseButton = pauseButtonRef.current;

        // Ensure audio element is available
        if (audio && playButton && pauseButton) {
            // Initialize the play/pause button states
            if (audio.paused) {
                playButton.style.display = "block";
                pauseButton.style.display = "none";
            } else {
                playButton.style.display = "none";
                pauseButton.style.display = "block";
            }
        }
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        const playButton = playButtonRef.current;
        const pauseButton = pauseButtonRef.current;

        if (audio && playButton && pauseButton) {
            if (audio.paused) {
                audio.play();
                playButton.style.display = "none";
                pauseButton.style.display = "block";
                setIsPlaying(true);
            } else {
                audio.pause();
                playButton.style.display = "block";
                pauseButton.style.display = "none";
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className={isPlaying ? "player background__orange" : "player"}>
            <div className="play_pause-button" onClick={toggle}>
                <svg
                    ref={playButtonRef}
                    className="play-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                >
                    <polygon points="22,50 48,32 22,14" fill="#333" />
                </svg>
                <svg
                    ref={pauseButtonRef}
                    className="pause-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                >
                    <rect x="22" y="14" width="10" height="36" fill="#333" />
                    <rect x="38" y="14" width="10" height="36" fill="#333" />
                </svg>
            </div>
            <div>
                <p>{props.data.title}</p>
            </div>
            <audio ref={audioRef}>
                <source src={props.data.audioFile.url} />
            </audio>
        </div>
    );
}