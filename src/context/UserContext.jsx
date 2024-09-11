import axios from "axios";
import { createContext ,useState ,useEffect} from "react";


export const UserContext=createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    const[ready,setReady] = useState(false);


    useEffect(() => {
        const fetchProfile=async ()=>{
            try {
              const {data}=  await axios.get('/profile');
              setUser(data.user);
            //   setReady(true);

            } catch (error) {
                console.log(error);
            }finally{
                setReady(true)
            }
       }
       fetchProfile();
    }, []);

  

    return(
        <UserContext.Provider value={{user,setUser ,ready}}>
        {children}
    </UserContext.Provider>
    )
   
}
