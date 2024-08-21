const OrderStatusIndicator = ({ currentStatus }) => {
    const statusStages = ["Processing", "Shipped", "Delivered", "Cancelled"];
    const currentIndex = statusStages.indexOf(currentStatus);

    return (
        <div className="flex items-center space-x-4 relative mt-4">
            {statusStages.map((status, index) => (
                <div key={status} className="flex items-center relative">
                    <div
                        className={`w-4 h-4 rounded-full ${index <= currentIndex ? "bg-blue-600" : "bg-gray-300"
                            }`}
                    ></div>
                    {index < statusStages.length - 1 && (
                        <div
                            className={`h-0.5 flex-1 ${index < currentIndex ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        ></div>
                    )}
                    <div
                        className={`absolute top-6 text-xs ${index <= currentIndex ? "text-blue-600" : "text-gray-600"
                            }`}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {status}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatusIndicator;
