import { generateImageUrl } from '/src/utils/urlHelper';

import * as styles from '/src/components/Tile.module.css';

export default function Tile({ game, className }) {
    const { image } = game;
    const imgSrc = generateImageUrl(image.path, 204, 204);

    const classes = [styles.tile__container, className].join(' ');

    return (
        <a className={classes} href='/empty-href?'>
            <picture className={styles.tile__picture}>
                <img src={imgSrc} alt={game.name} className={styles.tile__picture__image} />
            </picture>
            <strong className={styles.tile__title}>{game.title}</strong>
        </a>
    );
}
