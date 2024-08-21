import Link from "next/link";
import Layout from "../layout/Layout";

export default function CategoriesSection() {
    // Static categories data
    const categories = [
        {
            _id: '1',
            name: 'Lumânări',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2F1698693286725.jfif?alt=media&token=069df4d9-eff4-4679-899d-c56a7f1f237f',
            link: '/category/649d75d259d007b6f857ea09/',
        },
        {
            _id: '2',
            name: 'Ceară',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2F1716914406577.jfif?alt=media&token=18b486fe-7226-40f8-a903-bb5e2cd61eb0',
            link: '/category/649d75d259d007b6f857ea09/',
        },
        {
            _id: '3',
            name: 'Săpun',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2FIMG-20240709-WA0005.jpg?alt=media&token=8a535a56-2965-4686-9856-f32974d0b563',
            link: '/category/649d77e659d007b6f857ea90/',
        },
        {
            _id: '4',
            name: 'Gift Box',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2F1705934457260.jpg?alt=media&token=aefe8432-75ef-46b7-83d9-37943a4ba0c5',
            link: '/category/65ae6b91e3325b2795772c82/',
        },
        {
            _id: '5',
            name: 'Accesorii',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2F1717432337957.jpg?alt=media&token=98f75026-9971-48d1-a1a2-5d1ab10da31c',
            link: '/category/65ae753a7ae8d742ff8e4de4/',
        },
    ];

    return (
        <div className="py-[3.5rem]">
            <Layout>
                <div className="w-full h-full flex flex-col items-start justify-center gap-[3.5rem]">
                    <div >
                        <h3 className="font-semibold uppercase">Categorii</h3>
                        <Link href={'/categories/'}>
                            <p className="text-[#000]">Vezi mai multe</p>
                        </Link>
                    </div>
                    <div className="w-full h-auto gap-5 flex flex-col lg:grid lg:grid-cols-5">
                        {categories.map((cat) => (
                            <Link href={cat.link} key={cat._id}>
                                <div
                                    className="w-full flex flex-col items-start"

                                >
                                    <div className="w-full aspect-w-1 aspect-h-1 bg-cover bg-center relative rounded-xl"
                                        style={{ backgroundImage: `url(${cat.imageUrl})` }}
                                    />
                                    <h4 className="mt-2 text-center text-black">{cat.name}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
