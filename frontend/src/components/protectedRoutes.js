import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser} from './../api/users';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
function ProtectedRoute({children}){ {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getLoggedInUser = async () =>{
        let response = null;
        try {
            dispatch(showLoader());
            response = await getLoggedUser();
            dispatch(hideLoader());
            if(response.success){
                setUser(response.data);
            }else{
                navigate('/login')
            }
        } catch (error) {
            dispatch(hideLoader());
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
