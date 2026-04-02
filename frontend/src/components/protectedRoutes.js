import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ProtectedRoute({children}){ {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            
        }else{
            navigate('/login');
        }
    });
    <div>
        {children}
    </div>
}
export default ProtectedRoute;
