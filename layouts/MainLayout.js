import {useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import { setLogged} from 'store/slices/user/user.slice';

/*Main layout component has the structure and style of the main screen display */
const MainLayout = ({children}) => {
  /*we use the dispatcher and selector to get/set the value of redux stored of the user */
  const dispatch = useDispatch();
  const {logged, token, username} = useSelector(state => state.user);

  useEffect(async () => { //this function is called when the component is mounted (only once)
    async function getUser(token) { //this function is called to get the user information from the server passing the token for the middleware authorization
      try {
          const res = await fetch('/api/user/profile', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          })
          const user = await res.json();
          return user;
      } catch (er) {
          return ({success: false, user: null});
      }
  };
    
    /*Functions below manage that we keep the user state (as logged and to keep th token) even if the page is reload or if we go to another different page */  
    const newToken = window.localStorage.getItem('byb_token'); //We take from localStorage the token stored
    if (newToken) {
      //If we have a token, we check that it is a valid user and if it is, we set the user as logged and also all it's information
      const {success, user} = await getUser(newToken); 
      if (success === true) {
        dispatch(setLogged({  
          logged: true, 
          token: newToken, 
          username: user.username,
          email: user.email, 
          img: user.img, 
          active_maps: user.active_maps,
          actual_flag: user.actual_flag, 
          scores: user.scores, 
          maps_owned: user.maps_owned 
        }));
      } else {
        //If the token is not valid, we set the user as not logged and all its information as false/null
        dispatch(setLogged({  
          logged: false, 
          token: '', 
          username: '',
          email: '',
          img: '',
          active_maps: [],
          actual_flag: [],
          scores: [],
          maps_owned: []
      }));
      }
    }  
  }, []);
  
  /*Rendered component: loads the header, footer and a childern(any of the other components that we want to display between) */
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default MainLayout;