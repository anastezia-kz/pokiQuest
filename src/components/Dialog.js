import React, { useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { generateImageUrl } from '/src/utils/urlHelper';
import { useGetGameBySlugQuery } from '/src/services/api';

import * as styles from '/src/components/Dialog.module.css';


function GameDescription({  description }) {
    const sanitizedDescription = DOMPurify.sanitize(description);

    return (
        <div id="dialog-description" className={styles.dialog__description} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    );
}

export default function Dialog({slug, closeModal}) {
    const { data, error, isLoading } = useGetGameBySlugQuery({slug});

    const dialogRef = useRef();
 
    const { description, config, image, title } = data || {};

    const imgSrc = generateImageUrl(image?.path, 204, 204);

    useEffect(() => {
        if (slug && !isLoading && !dialogRef.current.open) {
            dialogRef.current.showModal()
        } else if (!slug || isLoading) {
            dialogRef.current?.close();
        }
    }, [slug, isLoading, closeModal]);
  
    if (isLoading) return <dialog className={styles.dialog}>Loading...</dialog>;
    

    return (
        <dialog ref={dialogRef} onCancel={closeModal} className={styles.dialog} style={{'--custom-dialog-background': `${config?.background?.color ?? '#fff'}`}}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            {error ? 
                <div>Error loading game details. Please try again later.</div>
                :<article className={styles.dialog__content}>
                    <img src={imgSrc} alt={title} onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} />
                    <h2 id="dialog-title">{title}</h2>
                    <GameDescription description={description} />
                </article>}
            <div className={styles.dialog__closeBtn}>
                <button onClick={closeModal} type="button" >Close</button>
            </div>
        </dialog>
    );
}
