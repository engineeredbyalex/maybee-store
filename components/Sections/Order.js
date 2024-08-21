import { HiOutlineTruck, HiOutlineGift, HiOutlineShoppingBag } from "react-icons/hi";

export default function OrderProcess() {
    return (
        <div className="w-screen h-auto py-10 flex flex-col items-center justify-center container ">
            <div className="w-full text-center mb-8">
                <h4 className="text-2xl font-semibold text-gray-800">Getting your products to you.</h4>
            </div>
            <div className="w-full h-auto flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-10">
                <div className="flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105">
                    <HiOutlineShoppingBag color="#4A4A4A" size={60} className="mb-4 transition-transform duration-300 transform hover:rotate-12" />
                    <p className="text-lg font-medium text-gray-600">Choose your products</p>
                    <h5 className="text-md text-gray-500">Browse and select your favorites.</h5>
                </div>
                <div className="flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105">
                    <HiOutlineTruck color="#4A4A4A" size={60} className="mb-4 transition-transform duration-300 transform hover:rotate-12" />
                    <p className="text-lg font-medium text-gray-600">Processing your order</p>
                    <h5 className="text-md text-gray-500">We prepare your items for shipment.</h5>
                </div>
                <div className="flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105">
                    <HiOutlineGift color="#4A4A4A" size={60} className="mb-4 transition-transform duration-300 transform hover:rotate-12" />
                    <p className="text-lg font-medium text-gray-600">Enjoying your products</p>
                    <h5 className="text-md text-gray-500">Experience the joy of your purchase.</h5>
                </div>
            </div>
        </div>
    );
}
