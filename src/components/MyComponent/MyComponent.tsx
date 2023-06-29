import React from 'react'
import styles from './MyComponent.module.scss'
import { useIsMobile } from '../../hooks/useIsMobile'

export interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  const isMobile = useIsMobile()

  return (
    <div className={styles.myComponent}>
      <div className={styles.box}>{ isMobile ? 'mobile' : 'pc' }</div>
    </div>
  )
}

export default MyComponent
