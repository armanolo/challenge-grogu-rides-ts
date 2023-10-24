import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../constants/ToastConfig';
import { useDispatch } from 'react-redux';
import { resetAction } from '../store/Actions';


export const Header = () => {
    const dispatch = useDispatch()

    const resetMethod = () => {
        dispatch(resetAction())
    }

	return (
        <div className="ui fixed inverted menu">
            <div className="ui segment">
                <div className="ui two column very relaxed grid">
                    <div className="column">
                        <h1 className="ui header">
                            Challenge
                        </h1>
                    </div>
                    <div className="column">
                        <button onClick={ 
                            () => {
                                //toast('Hi Joe 🦄!', { position: "top-right", autoClose: 2000,hideProgressBar: true, closeOnClick: true, pauseOnHover: true,draggable: true,progress: undefined,theme: "light"})
                                resetMethod();
                                toast('Hi the platform has been reseted 🦄!', TOAST_CONFIG)
                            }} className="ui red button">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
	)
}

