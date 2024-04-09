
import OrderDetailsScreen from './detailscreen';

const OrderDetails = async (params : any) => {

    const response = await fetch(
        `http://localhost:3000/api/order/orderId?query=${params.params.id}`
      );
      const order = await response.json();
      console.log("server side ",order)
  
    return <OrderDetailsScreen orderdetail={order} />;
};




export default OrderDetails