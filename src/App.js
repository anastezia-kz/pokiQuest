import clsx from 'clsx'; 
import { useState, useLayoutEffect, useRef } from 'react';
import { useGetHomepageQuery } from '/src/services/api.js';

import Task from '/src/components/Task';

import * as styles from '/src/App.module.css';

import '/src/global.css';

const getSafeWidth = (requestedWidth) => {
    const maxAllowed = window.innerWidth - 32; 
    return Math.min(requestedWidth, maxAllowed);
};

export function App() {
    const [containerWidth, setContainerWidth] = useState(0); 
    const [limit, setLimit] = useState(10); 
    const boxRef = useRef(null);
    const { data, error, isLoading } = useGetHomepageQuery({limit});

    const TILE_WIDTH = 100;

    // 👾 Play around with actual screen width to see how it affects the layout
    useLayoutEffect(() => {
        const updateBoxSize = () => {
            const boxWidth = boxRef.current.getBoundingClientRect().width;
            const safeWidth = getSafeWidth(boxWidth);
            const maxTiles = Math.floor(safeWidth / TILE_WIDTH);
    
            setContainerWidth(safeWidth);
            setLimit(maxTiles);
        };
    
        updateBoxSize(); 
        window.addEventListener("resize", updateBoxSize);
        return () => window.removeEventListener("resize", updateBoxSize);
    }, []);

    const onWidthChange = (e) => {
        const requestedWidth = Number(e.target.value);
        const safeWidth = getSafeWidth(requestedWidth);
        setContainerWidth(safeWidth);
        setLimit(Math.floor(safeWidth / TILE_WIDTH));
    };
    
    const onLimitChange = (e) => {
        setLimit(Number(e.target.value)); 
    };


    return (
        <div className={styles.app}>
            <header className={styles.app__welcomeText}>
                <h1>Poki Frontend Assignment</h1>
            </header>
            <section className={styles.app__sliders}>
                <h3 className={styles.app__sliders__title}>Container Width</h3>
                <input className={styles.app__sliders__input} type="range" value={containerWidth} min="400" max="1200" step="200" onChange={onWidthChange} />            
                <h3 className={styles.app__sliders__title}>Tiles Limit</h3>
                {/* Ideally max property should be set to the length of data array from api response */}
                <input className={styles.app__sliders__input} type="range" value={limit} min="3" max='100' step="3" onChange={onLimitChange} />
            </section>
            <div ref={boxRef} className={clsx([styles.app__containerBox, 'sparkle-container'])} >
                <Task data={data} containerWidth={containerWidth} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
};

