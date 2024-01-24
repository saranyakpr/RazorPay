import React, { useState }  from 'react';
import logo from './img/fab.png';
import img from './img/img.jpg';
import imgs from './img/pay1.png';
import './Main.css';
// import { Helmet } from "react-helmet";
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom'



// key_id = rzp_test_8nJBROwG0rNSr0;
// key_secret = kOhW4nJMdOyASLJB92yTUOC9;

const Main = () => {

    // const navigate = useNavigate()

    const [Razorpay] = useRazorpay();

    let [price, setPrice] = useState('$99.00');
    let [name, setName] = useState('');
    let [emailId, setEmailId] = useState('');
    let [mobile, setMobile] = useState('');
    let [errorData, setErrorData] = useState({});


    const handlePayment = async (params) => {
        //const order = await createOrder(params); //  Create order on your backend
        let err={};
        
        if(name===""){
            err.name = 'enter your name'
        }
        if(emailId===""){
            err.emailId ="enter your emailid"
        }
        if(mobile===""){
            err.mobile ="enter your mobile"
        }
        if(mobile.length !== 10){
            err.mobile='enter your correct mobile number'
        }
        console.log(err)

        setErrorData({...err})

        if(Object.keys(err).length > 0){
            return false
        }

      
        const options = {
          key: "rzp_test_8nJBROwG0rNSr0", // Enter the Key ID generated from the Dashboard
          amount: price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Fabevy IT software development",
          description: "Test Transaction",
          image: logo,
          order_id: "order_NE67XUdaW72tgX", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response) {
            // navigate('/res');
            // console.log(response)
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            // console.log('razorpay_payment_id',response.razorpay_payment_id,'razorpay_order_id', response.razorpay_order_id, 'razorpay_signature', response.razorpay_signature)
          },
          prefill: {
            name: name,
            email: emailId,
            contact: mobile,
          },
          notes: {
            address: "Fabevy IT software development",
          },
          theme: {
            color: "#3399cc",
          },
        };
      
        const rzp1 = new Razorpay(options);
      
      
        rzp1.on("payment.failed", function (response) {
            // console.log(response)
        //   alert(response.error.code);
        //   alert(response.error.description);
        //   alert(response.error.source);
        //   alert(response.error.step);
        //   alert(response.error.reason);
        //   alert(response.error.metadata.order_id);
        //   alert(response.error.metadata.payment_id);
        alert("your payment is failed. Try again...!")
        });
      
       rzp1.open();
       //https://api.razorpay.com/v1/payments/:id
      };

  return (
    <div className='hole'>
        {/* <Helmet>
           <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </Helmet> */}
        <div className='container'>
            <div className='logo'>
                <img src={logo} alt='logo' className='logoImg'/>
                <h1>Fabevy IT software development</h1>
                <p className='border'></p>
                <h3>Image Gallery</h3>
                <img src={img} alt='img' width='50%' className='img' />
            </div>
            <div className='pay'>
                    <h3>Payment Details</h3>
                    <p className='border'></p>
                    <form method='post' action='https://script.google.com/macros/s/AKfycbyLMx37hPPRRaYpqazDKWqmHYh670CEjzMLUzr1h5cETScNaIfWKM5qaRPgNqqZOdlitQ/exec'>
                        <table>
                            <tr>
                                <td><label>Name</label></td>
                                <td>
                                   <input type='text' name='name' className='input'value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                </td>
                                {errorData["emailId"]&&  <span style={{color:'red',fontSize:10}}>{errorData["emailId"]}</span>}
                            </tr>
                            <tr>
                                <td><label>Amount</label></td>
                                <td>
                                <input type='text' name='amount' value={price} className='input' onChange={(e)=>{setPrice(e.target.value)}} />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Email</label></td>
                                <td>
                                <input type='email' name='email' className='input'value={emailId} onChange={(e)=>{setEmailId(e.target.value)}}/>
                                </td>
                                {errorData["emailId"]&&  <span style={{color:'red',fontSize:10}}>{errorData["emailId"]}</span>}
                            </tr>
                            <tr>
                                <td><label>Phone</label></td>
                                <td>
                                <input type='text' name='phone' className='input' value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
                                </td>
                                {errorData["mobile"]&&  <span style={{color:'red',fontSize:10}}>{errorData["mobile"]}</span>}
                            </tr>
                            </table>
                            <div className='payment'>
                                <div className='payimg'>
                                    <img src={imgs} alt='sales fruits' width='90%' height='8rem'/>
                                </div>
                                <div className='payamount'>
                                    {/* <input type='text' value={price}/> */}
                                    <button onClick={(e)=>{
                                        e.preventDefault()
                                        handlePayment()
                                        }} type='submit'>Pay {price}</button>
                                </div>
                            </div>
                        
                    </form>
                </div>
        </div>
    </div>
  )
}

export default Main