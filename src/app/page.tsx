import Image from 'next/image'
import styles from './page.module.css'
import NavigationBar from '../components/navbar/NavigationBar'

export default function Home() {
  return (
    <div className={styles.main}>
      <NavigationBar/>
    </div>
  )
}
