import { useNavigate } from 'react-router-dom';

export let navigate = null;

export const NavigateSetter = () => {
    navigate = useNavigate();
    return null;
};
