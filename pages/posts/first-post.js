import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';



export default function FirstPost(){
    return  (
        <div> 
            <Layout>
                <Head> 
                    <title> Sinlge post page</title>
                </Head>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                    }
                />
                <h1>   My first Post </h1> 
                <p> <Link href="/"> Go HomePage </Link> </p>
            </Layout>
            
        </div>)
}