import { useSelector } from 'react-redux';

const useUserAuth = () => {
  const loggedIn = useSelector((state) => state.buyerAuth.loggedIn);
  const user = useSelector((state) => state.buyerAuth.user);
  const token = useSelector((state) => state.buyerAuth.token);
  const refresh = useSelector((state)=>state.buyerAuth.refresh);
  

  return { loggedIn, user, token ,refresh};
};

export default useUserAuth;
