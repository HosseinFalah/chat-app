import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const login = () => {
        navigate('/chat-room', { state: { name, gender } });
    }
    
    return (
        <div className="bg-neutral-700 h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="bg-neutral-600 shadow-2xl drop-shadow-2xl max-w-2xl w-full rounded-xl">
                    <div className="flex flex-col items-center justify-center py-10">
                        <h1 className="text-4xl font-semibold text-center text-amber-500">ورود به چت روم</h1>
                        <div className="space-y-6 my-10">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="" className="text-white text-lg font-medium">نام خانوادگی:</label>
                                <input 
                                    type="text" 
                                    className="bg-neutral-500 py-3 px-4 rounded-xl w-80 text-white focus:ring-2 focus:ring-purple-600 outline-none border-none placeholder:text-gray-300" 
                                    placeholder="نام خانوادگی"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">جنسیت خود را تعیین کنید:</label>
                                <select 
                                    id="large" 
                                    value={gender} 
                                    onChange={e => setGender(e.target.value)} 
                                    className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none">
                                    <option value="-1">انتخاب کنید</option>
                                    <option value="male">مرد</option>
                                    <option value="famale">زن</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            className="bg-gradient-to-tr from-amber-600 to-yellow-400 py-3 px-10 rounded-lg text-white font-bold shadow-2xl"
                            onClick={login}
                        >
                            ورود
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home