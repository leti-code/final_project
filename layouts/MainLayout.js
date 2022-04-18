import {useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import { setLogged } from 'store/slices/user/user.slice';


const MainLayout = ({children}) => {
  const dispatch = useDispatch();
  const {logged, token, username} = useSelector(state => state.user);


  useEffect(async () => {
    async function getUser(token) {
      try {
          const res = await fetch('/api/user/profile', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          })
          const user = await res.json();
          console.log("user:", user);
          return user;
      } catch (er) {
          return (null);
      }
  };
    const newToken = window.localStorage.getItem('byb_token');
    if (newToken) {
      const {user} = await getUser(newToken);
      dispatch(setLogged({  logged: true, token: newToken, username: user.username }));
    }  
  }, []);
  
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default MainLayout