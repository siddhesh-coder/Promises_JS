//The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
//what is the use of promise -> it is use to prevent from the callback hell(pyramid of doom)
const GITHUB_API = "https://api.github.com/users/siddhesh-coder";

let user = fetch(GITHUB_API); //here we git the promise in the user

//now we want to manipulate that data see below

user.then(function(data){
   console.log(data); //it will print all data of that user and we can use that data in program (it is also called response)
   console.log(data.url); //...etc
});

//Note Promise has only 3 states
// 1 pending
// 2 fulfilled
// 3 rejected
//promise object are immutable the data cannot be changed can can only pass that data in our code


//eg no 2

// const cart = ["Reyzen Cpu","mouse","Gaming Keyboard"];

//to avoid this callback hell
// createOrder(cart,function(orderId){
//    ProceedToPayment(orderId,function(paymentInfo){
//       showOrderSummary(paymentInfo);
//    });
// });

//use promises

//using arrow func

// createOrder(cart)
//   .then((orderId)=> ProceedToPayment(orderId))
//   .then((paymentId)=> showOrderSummary(paymentId))
//   .then((paymentId)=> updateWalletBalance(paymentId))


//   1. Before promise we used to depend on callback functions which would result in 1.) Callback Hell (Pyramid of doom) | 2.) Inversion of control
//   2. Inversion of control is overcome by using promise.
//     2.1) A promise is an object that represents eventual completion/failure of an asynchronous operation.
//     2.2) A promise has 3 states: pending | fulfilled | rejected.
//     2.3)  As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
//     2.4) A promise resolves only once and it is immutable. 
//     2.5) Using .then() we can control when we call the cb(callback) function.
  
//   3. To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally. Chaining is done using '.then()'
//   4. A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value. This returned value will be used by the next .then()

//promise Chaining and Error Handling

const cart = ["Ryzen Cpu","mouse","Gaming Keyboard"];

//consuming code
const promise = orderCreate(cart);

console.log(promise); // promise status check

promise
.then(function (orderId){ //promise Chaining
   console.log(orderId);
   return orderId; //if regular func then you must return that func to perform chaining
})
.catch(function(err){//error handing if promise is rejected 
   console.log(err.message); //use catch were it is have changes to get error
})  
.then(function (orderId){
   return ProceedToPayment(orderId); // it will return promise and it is taken below no need to attch .then here
})
.then(function (paymentInfo){ //gaining promise here no need to attach promise above it will fall in to pyramid of promise
   console.log(paymentInfo);
})
// .catch(function(err){//error handing if promise is rejected 
//     console.log(err.message); //use catch were it is have changes to get error
// })
.then(function(orderId){
    console.log("No matter what happens, I will definitelly be called.");
});//note: after catch .then will be run fix before catch code will not run.

//producer code

function orderCreate(cart){
   const pr = new Promise(function(resolve, reject){  //Creation of promise
      //validating cart
      if(!validateCart(cart)){ //reject code
         const err = new Error("Cart is not valid");
         reject(err);
      }
      //logic of createOrder
      const orderId = "1234455";
      
      if(orderId){
         resolve(orderId);
      }

      //you can add also time

      // if(orderId){
      //    setTimeout(function (){
      //       resolve(orderId);
      //    },3000);
      // }

   });
   return pr;
}

function validateCart(cart){
   //you can add more functionalies in it but now just return true
   return true; //is you want to log error then return false
   //return false;
}

function ProceedToPayment(orderId){
     return new Promise(function(resolve,reject){
          //you can add more functionalies in it but now just return dummy output
          resolve("payment done successfully ");
     })
}

//below is my random example

// const cart = ["CPU","RAM","SSD"];

// //promise

// //consuming code

// createOrder(cart)
//   .then(function(orderId){
//   console.log("Order Created Id: "+ orderId);
//   return orderId;
// })
//   .then(function(){
//   return proceedToPayment();
// })
// .then(function(paymentInfo){
//    showOrderSummary(paymentInfo);
// })
// .then(function(){
//   updateWallet();
// })
//  .catch(function(err){
//   console.log(err.message);
// })
 
  

// function createOrder(cart){

//   const pr = new Promise(function(resolve,reject){
//     //validation of cart
//     if(!validateCart(cart)){
//     let err = new Error("Cart has the zero items");
//     reject(err);
//   }

//     //logic of createOrder
//     var orderId = "";

//     if(orderId.length !== 0){
//       resolve(orderId);
//     }else{
//       let err = new Error("OrderId is not valid");
//       reject(err);
//     }
    
//   });
//   return pr;
// }

// function proceedToPayment(orderId){
//   return new Promise(function(resolve,reject){
//           //you can add more functionalies in it but now just return dummy output
          
//           resolve("payment done successfully");
//      })
// }

// function showOrderSummary(paymentInfo){
//   console.log(`Payment Status: ${paymentInfo}`);
// }

// function updateWallet(){
//   const balance = "$"+10;
//   console.log("balance remain in wallet: "+balance);
// }

// function validateCart(cart){

//   if(cart.length === 0){
//     return false;
//   }else{
//     return true;
//   }
  
// }
