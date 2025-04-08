
import { useState } from 'react';

import Task from '/src/components/Task';

import * as styles from '/src/App.module.css';

import '/src/global.css';

export function App() {
    const [containerWidth, setContainerWidth] = useState(400); // looks hardcoded 🤔
    const [limit, setLimit] = useState(3); // looks hardcoded too

    const onWidthChange = (e) => {
    }

    const onLimitChange = (e) => {

    }

    return (
        <div className={styles.app}>
            <header className={styles.app__welcomeText}>
                <h1>Poki Frontend Assignment</h1>
            </header>

            <section className={styles.app__sliders}>
                <h3 className={styles.app__sliders__title}>Container Width</h3>
                <input className={styles.app__sliders__input} type="range" value={containerWidth} min="400" max="1200" step="200" onChange={onWidthChange} />

                <h3 className={styles.app__sliders__title}>Tiles Limit</h3>
                <input className={styles.app__sliders__input} type="range" value={limit} min="3" max="18" step="3" onChange={onLimitChange} />
            </section>

            <Task limit={limit} />
        </div>
    );
};
