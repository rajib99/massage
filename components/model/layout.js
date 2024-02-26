import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import modelStyle from '../../styles/model.module.css';
import Link from 'next/link';

const name = 'Massage at Home';
export const siteTitle = 'Muew Muew site title';

export default function Layout({ children, home, availability }) {
  return (
    <div className={availability ? styles.container: styles.containerAvail }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1> Model Backend </h1>
            <ul className='menu'>
                <li> <Link href='/admin-backend'> Home </Link> </li>
                <li> <Link href='/admin-backend/logout'> Logout </Link> </li>
            </ul>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/logo.png"
                className={utilStyles.borderCircle}
                height={81}
                width={300}
                alt=""
              />
            </Link>
            <ul className='menu'>
                <li> <Link href='/'> Home </Link> </li>
                <li> <Link href='/'> Visit frontend site </Link> </li>
                <li> <Link href='/support'> Contact Support </Link> </li>
                <li> <Link href='/logout'> Logout </Link> </li>
            </ul>
          </>
        )}
      </header>
      <main className='main-admin-layout'>
        <section className={modelStyle.adminMenu}>
            <ul>
              <Link href="/model-backend/orders"> Orders </Link>
              <Link href="/model-backend/profile"> Profile Info </Link>
              <Link href="/model-backend/availability"> Availability </Link>
            </ul>
        </section>
        <section>
          {children}
        </section>
       </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <div className=''> Footer goes here </div>
    </div>
  );
}