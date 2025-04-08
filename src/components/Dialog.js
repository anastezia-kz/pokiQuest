import { useGetGameBySlugQuery } from '/src/services/api';

import * as styles from '/src/components/Dialog.module.css';

export default function Dialog() {
    const { error, isLoading } = useGetGameBySlugQuery();

    if (isLoading) return <dialog open className={styles.dialog}>Loading...</dialog>;
    if (error) return <dialog open className={styles.dialog}>Error 😵</dialog>;

    return (
        <dialog open className={styles.dialog}>
            <article className={styles.dialog__content}></article>
            <button type="button" className={styles.dialog__closeBtn}>Close</button>
        </dialog>
    );
}
