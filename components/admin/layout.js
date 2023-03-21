import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

const name = 'Massage at Home';
export const siteTitle = 'Muew Muew site title';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
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
            <h1> Admin Backend </h1>
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
                <li> <Link href='/'> About </Link> </li>
                <li> <Link href='/'> Contact  </Link> </li>
                <li> <Link href='/customer-login'> Customer Login/Register </Link> </li>
                <li> <Link href='/model-login'> Model Login/Register </Link> </li>
            </ul>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
              this is admin backend header for subpage {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <div className=''> Footer goes here </div>
    </div>
  );
}