import { useRouter } from 'next/router';
import Banner from '@/components/Basic/Banner';
import Header from '@/components/Basic/Header';
import Layout from '@/components/Layout/Layout';

const SuccessPage = () => {
    const router = useRouter();

    return (
        <div>
            <Banner />
            <Header />
            <div className='mt-[5rem]'>
                <Layout>
                    <div className='flex flex-col gap-3'>
                        <h1>Vă mulțumim pentru comandă</h1>
                        <p>Vă vom trimite un email când comanda dvs. va fi expediată.</p>
                    </div>
                </Layout>
            </div>

        </div>
    );
};

export default SuccessPage;
