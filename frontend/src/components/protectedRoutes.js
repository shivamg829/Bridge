import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser} from './../api/users';
function ProtectedRoute({children}){ {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const getLoggedInUser = async () =>{
        let response = null;
        try {
            response = await getLoggedUser();
            if(response.success){
                setUser(response.data);
            }else{
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')
            
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getLoggedInUser();
        }else{
            navigate('/login');
        }
    });
    <div>
        <p>Name: {user?.firstName + ' ' + user?.lastName}</p>
        {children}
    </div>
}}
export default ProtectedRoute;
