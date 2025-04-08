import clsx from 'clsx'; 
import React, { useRef } from 'react';
import { generateImageUrl } from '/src/utils/urlHelper';

import * as styles from '/src/components/Tile.module.css';

export default function Tile({ game, className, onTileClick  }) {
    const { image } = game;
    const imgSrc = generateImageUrl(image.path, 204, 204);
    const classes = clsx(styles.tile__container, className);
    const videoRef = useRef(null);

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };
    
    const pauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };
    return (
        <div className={classes}
            onClick={() => {
                onTileClick(game.slug); 
            }}   
            onMouseEnter={playVideo}
            onMouseLeave={pauseVideo}
        >
            <picture className={styles.tile__picture}>
                <img src={imgSrc} alt={game.name ?? 'game-image'} className={styles.tile__picture__image} />
                <strong className={styles.tile__title}>{game.title}</strong>
            </picture>
            <video   preload="auto"   ref={videoRef} className={styles.tile__video} loop muted>
                <source src={game.video} type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
        </div>
    );
}