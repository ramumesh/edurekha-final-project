"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ordersPage = () => {

    const router = useRouter();
    const [item, setItem] = useState<IOrder[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetch(
                    `/api/order`
                );
                const resp = await response.json();
                console.log("order response  ", resp);
                // const array : ICart[] = []
                var totalTemp = 0
                resp.map((carttemp: ICart) => {
                    // console.log("array ", carttemp);
                    totalTemp = totalTemp + carttemp.productPrice;
                })


                setItem(resp);
                console.log("array ", item);


            } catch {
                console.log("err");
            }
        };

        async function removeCartItems () {
    
            try {
               
                const response = await fetch(
                    `/api/cart`, {
                    method: "DELETE",
                    body: JSON.stringify({ "sample" : "sample" }),
                });
        
                const resp = await response.json();
                console.log("delete clicked", resp)
                router.push("/orders")
               
        
            } catch {
                console.log("err");
            }
        };



        getOrders();
        removeCartItems();
    }, []);




    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">

                <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Order Number</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Total</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Items</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
                        </tr>
                    </thead>

                    {item.map((orderList)=>{
                        return <>
                        

                    <tbody>

                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{orderList.orderId}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{orderList.date}</td>
                            <td className="py-4 px-6 border-b border-grey-light">£{orderList.total}</td>
                            <td className="py-4 px-6 border-b border-grey-light">3 Items</td>
                            <td className="py-4 px-6 border-b border-grey-light">
                                <a href={`/orders/${orderList.orderId}`} 
                                className="text-blue-500 hover:text-blue-800">View</a>
                            </td>
                        </tr>

                    </tbody></>
                    })}

                    
                </table>
            </div>
        </div>
    )
}

export default ordersPage