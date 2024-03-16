import React, { useEffect, useState } from 'react'
import "./MyCart.css"
import { useNavigate } from 'react-router-dom';
import { db ,auth} from '../firebase-config';
import { deleteDoc,doc,getDocs,collection,updateDoc } from 'firebase/firestore';
import Header from '../Components/Header';

const MyCart = () => {

    const collectionRef=collection(db,"myCart");
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();
  
  
  
    const productNavigate=(product)=>{
      navigate("/product",{state:{productDet:product}})
      }
      
  const userID = auth.currentUser;
  
    useEffect(()=>{
      console.log("useEffect in");
           const getProductData=async()=>{
            const res=await getDocs(collectionRef);
            setProducts(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,id:doc.id,prod_count:doc.data().prod_count})))
           }
           getProductData();
           console.log("useEffect out");
    },[])

    const discountPrice=(old_price,discount)=>{
        return (old_price-(old_price*discount)/100).toFixed(0);
      }
    
      const deleteProduct=async(id)=>{
        const prodId=doc(db,"myCart",id)
        await deleteDoc(prodId);
        alert("Product removed from cart!")
        window.location.reload();
      }
     

    const add=async(id,oldValue)=>{ 
        
       const ref=doc(db,"myCart",id)
        const newChange={"prod_count":oldValue+1}
      await updateDoc(ref,newChange)

      setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, prod_count: product.prod_count + 1 } : product
      )
    );
    }
    const sub=(id,oldValue)=>{
        if (oldValue > 1) {
            const ref = doc(db, "myCart", id);
            const newChange = { "prod_count": oldValue - 1 };
            updateDoc(ref, newChange);
      
        
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === id ? { ...product, prod_count: product.prod_count - 1 } : product
              )
            );
          }
    }
    const [totalPrice, setTotalPrice] = useState(0);

    const totalSum = () => {
      let total = 0;
      products.forEach((prod) => {
        if(prod.userID === userID.uid){
        total += discountPrice(prod.old_price, prod.discount) * prod.prod_count;}
      });
      setTotalPrice(total);
    };
  
    useEffect(() => {
      totalSum(); 
    }, [products]);

  return (
    <div>
        <Header></Header>
        <h3 className='prod-head'>My Cart :</h3>
       
<div className='checkout-main-div'>

<div  className="checkout-list">
{products.map((prod)=>{
if(prod.userID === userID.uid){  

    return (<div className='checkout-items' >
    <div><h6>{prod.name}</h6></div>
    <div className='pri-count-tot'><p style={{width:"70px"}}>Rs.{discountPrice(prod.old_price,prod.discount)}</p>
    <p style={{width:"20px"}}>X{prod.prod_count}</p>
    <p style={{width:"90px"}}>=  <span style={{fontWeight:"500", color:"#12ca7c"}}> Rs. {discountPrice(prod.old_price,prod.discount)*prod.prod_count}</span></p></div>


    </div>)}
    else{
      return null
    }

})}
</div>

<div className='checkout-total-div'>
   <div className='chekout-price-list'>
   <div className='price-topic'>
   <div className='list-topics'> 
   <p>Total Price </p>
    <p>Delivery Charge </p>
    <p>Other Tax </p>
    
    </div>
   <div className='list-prices'>
   <p style={{fontWeight:"500"}}> : Rs. {totalPrice}</p>
    <p style={{fontWeight:"500"}}> : Rs. 40</p>
    <p style={{fontWeight:"500"}}> : Rs. 30</p>
   
   </div>
   </div>
   <hr></hr>
   <h5>Grand Total  - <span  style={{color:"#12ca7b"}}>Rs. {totalPrice+30+40}</span></h5>
   
    <button className='btn  checkout'>CHECKOUT</button>
   </div>

</div>
</div>

<h3 className='prod-head'>Cart Items :</h3>

       
        <div className='grid-container-deal' >
      
{products.map((product) => {
  if(product.userID === userID.uid){ 

return (<div className='grid-items-deal' >




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' src={product.image} alt='img' onClick={()=>productNavigate(product)}></img>
   <div className='fav-bin' onClick={()=>{deleteProduct(product.id)}}> <img src='https://icons.veryicon.com/png/o/education-technology/plush-three-year-old-icon-gallery/delete-88.png' width="25" height="25"></img></div>   
    </div>
    
    <p className='deal-cont-p'>{product.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{product.old_price}</h6>
    <h5>Rs.{discountPrice(product.old_price,product.discount)}</h5>
    <h6 className='deal-discount'>{product.discount}% off</h6>
    </div>

    <div class="input-group quant">
                  <span class="input-group-text" onClick={()=>{sub(product.id,product.prod_count)}} style={{cursor:'pointer'}}>-</span>
                  <input type="text" class="form-control" value={product.prod_count} />
                  <span class="input-group-text" onClick={()=>{add(product.id,product.prod_count)}} style={{cursor:'pointer'}}>+</span>
     </div>
  
  </div>

</div>)}
})}

</div>


    </div>
  )
}

export default MyCart