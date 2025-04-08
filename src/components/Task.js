import { useGetHomepageQuery } from '/src/services/api';

import * as styles from '/src/components/Task.module.css';

const CHUNK_SIZE = 6;

export default function Task() {
    const { data, error, isLoading } = useGetHomepageQuery();

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error 😵</div>;

    const chunkedGames = data.games.reduce((acc, game, index) => {
        const chunkIndex = Math.floor(index / CHUNK_SIZE);
        if(!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(game);
        return acc;
    }, []);

    return (
        <>
            <p>still empty :(</p>
        </>
    );
}
