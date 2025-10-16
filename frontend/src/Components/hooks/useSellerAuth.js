import { useSelector } from 'react-redux';

const useSellerAuth = () => {
  const loggedIn = useSelector((state) => state.sellerAuth.loggedIn);
  const seller = useSelector((state) => state.sellerAuth.seller);
  const token = useSelector((state) => state.sellerAuth.token);
  

  return { loggedIn, seller, token };
};

export default useSellerAuth;
