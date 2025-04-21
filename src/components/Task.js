import clsx from 'clsx'; 
import { useSelector,useDispatch } from 'react-redux'
import { useMemo,useCallback } from 'react';
import { setDialogOpen, setSlug } from '/src/slices/task.slice';

import * as styles from '/src/components/Task.module.css';
import Tile from './Tile';
import Dialog from './Dialog';


const CHUNK_SIZE = 6;

export default function Task({ containerWidth, isLoading, error, data }) {
    const dispatch = useDispatch();

    const isDialogOpen = useSelector((state) => state.task.isDialogOpen);
    const slug = useSelector((state) => state.task.slug);

    const handleOpenDialog = useCallback((slug) => {
        dispatch(setSlug(slug));
        dispatch(setDialogOpen(true));
    }, [dispatch]);

    const closeDialog = () => {
        dispatch(setDialogOpen(false));
        dispatch(setSlug(null));
    };
    
    // const chunkedGames = data?.games.reduce((acc, game, index) => {
    //     const chunkIndex = Math.floor(index / CHUNK_SIZE);
    //     if(!acc[chunkIndex]) {
    //         acc[chunkIndex] = [];
    //     }
    //     acc[chunkIndex].push(game);
    //     return acc;
    // }, []);
    
    // shorter version of the above code
    const chunkedGames = Array.from({ length: Math.ceil(data?.games.length / CHUNK_SIZE) }, (_, index) =>
        data?.games.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)
    );

    const gridLayoutClass = useMemo(() => {
        if (containerWidth >= 1000) return styles.task__gridLarge;
        if (containerWidth >= 600) return styles.task__gridMedium;
        if (containerWidth >= 400) return styles.task__gridExtraSmall;
        return styles.task__gridSmall;
    }, [containerWidth]);

    if(isLoading) return <div>Loading...</div>;

    if(error) return <div>Error 😵</div>;

    return (
        <div
            className={styles.task__container}
            style={{ '--container-width': `${containerWidth}px` }}
        >
            {chunkedGames.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className={clsx(gridLayoutClass)}>
                    {chunk.map((game, index) => (
                        <Tile
                            key={game.id}
                            game={game}
                            className={styles[`task--${index + 1}`]}
                            handleOpenDialog={handleOpenDialog}
                        />
                    ))}
                </div>
            ))}
            {isDialogOpen && slug &&(
                <Dialog slug={slug} closeDialog={closeDialog}/>
            )}
        </div>
    );
}