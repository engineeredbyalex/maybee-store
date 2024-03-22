  // <div className="flex flex-col items-center justify-center w-full mt-10">
  //         {/* Tab for Wishlist */}
  //         <button onClick={() => setActiveTab('Wishlist')}>

  //            <p className="uppercase font-medium text-[#595959]">    Listă de dorinţe</p>
  //           </button>
  //         {/* Content for Wishlist Tab */}
  //         {activeTab === 'Wishlist' && (
  //           <div className="wishlist-container">
  //             {!wishlistLoaded && (
  //               <Spinner fullWidth={true} />
  //             )}
  //             {wishlistLoaded && (
  //               <div>
  //                 <h5 className="uppercase font-bold text-[#595959]">Wishlist</h5>
  //                 {wishedProducts.map(product => (
  //                   <div key={product._id} className="wishlist-item">
  //                     <p>{product.name} - {product.price}</p>
  //                     <Button onClick={() => productRemovedFromWishlist(product._id)}>Şterge</Button>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         )}

  //         {/* Tab for Orders */}
  //         <button onClick={() => setActiveTab('Orders')}>
  
  //              <p className="uppercase font-medium text-[#595959]">    Comezi</p>
  //           </button>
  //         {/* Content for Orders Tab */}
  //         {activeTab === 'Orders' && (
  //           <div className="orders-container">
  //             {!orderLoaded && (
  //               <Spinner fullWidth={true} />
  //             )}
  //             {orderLoaded && (
  //               <div>
  //                 <h5 className="uppercase font-bold text-[#595959]">Comenzi</h5>
  //                 {orders.map(order => (
  //                   <div key={order._id} className="order-item">
  //                     <div className="order-details">
  //                       <p className="order-number">Order Number: {order.orderNumber}</p>
  //                       <p className="order-date">Date: {order.date}</p>
  //                     </div>
  //                     <div className="order-products">
  //                       <p>Products:</p>
  //                       {order.products.map(product => (
  //                         <div key={product._id} className="product-item">
  //                           <p>{product.name} - {product.price}</p>
  //                           {/* Add more product details if needed */}
  //                         </div>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>