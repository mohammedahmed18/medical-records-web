import React from 'react';

import styles from './styles.module.css';

const NeonLoader = () => {
  return (
    <div className={styles['neon-loader']}>
      <div className={styles['neon-bar']}></div>
    </div>
  );
};

export default NeonLoader;
