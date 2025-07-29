// src/utils/khaltiConfig.js
const khaltiConfig = (amountInRupees, onSuccess) => ({
  publicKey: 'test_public_key_dc74be62fd524d4bba75f1b4040ec4c3', // 🔁 Replace with your real publicKey
  productIdentity: 'rentmyfit-product',
  productName: 'RentMyFit Checkout',
  productUrl: 'http://localhost:3000/dashboard', // ✅ Update as needed
  eventHandler: {
    onSuccess: (payload) => {
      console.log('Khalti Payment Success:', payload);
      onSuccess(payload);
    },
    onError: (error) => {
      console.error('Khalti Payment Error:', error);
      alert('Payment failed. Please try again.');
    },
    onClose: () => {
      console.log('Khalti payment widget closed');
    },
  },
  paymentPreference: ['KHALTI'],
});

export default khaltiConfig;
