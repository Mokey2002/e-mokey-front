import { useSelector } from 'react-redux';

const useAuth = () => {
  const loggedIn = useSelector((state) => state.buyerAuth.loggedIn);
  const user = useSelector((state) => state.buyerAuth.user);
  const token = useSelector((state) => state.buyerAuth.token);
  

  return { loggedIn, user, token };
};

export default useAuth;
