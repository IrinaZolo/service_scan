import React, {useState} from  'react'
import { Link, useNavigate } from 'react-router-dom'
import { DropDownMenu } from './DropDownMenu'
import loadingImg from '../assets/loading.svg'

type PropsType = {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Header = ({ auth, setAuth}: PropsType) => {
    
    
    const [ visibleMenu, setVisibleMenu ] = useState<boolean>(false) // fix видимость дроп-даун меню
    const [ loading ] = useState<Boolean>(false) // fix загрузка
    const usedCompanies: number = 34 // fix Использовано компаний 
    const limitCompanies: number = 100 // fix Лимит по компаниям
    const userName: string = 'Алексей А.' // fix Имя пользователя

    const navigate = useNavigate()

    const logo: string = new URL('../assets/logo.jpg', import.meta.url).href
    const userImg: string = new URL('../assets/userImg.jpg', import.meta.url).href

    const navigation = (
        <nav className='hidden gap-[25px] lg:gap-[50px] md:flex justify-self-center'>
            <Link to='/' className='hover:text-[#029491] hover:scale-[1.2] transition'>Главная</Link>
            <Link to='/' className='hover:text-[#029491] hover:scale-[1.2] transition'>Тарифы</Link>
            <Link to='/' className='hover:text-[#029491] hover:scale-[1.2] transition'>FAQ</Link>
        </nav>
    )

    const signIn = (
        <div className='hidden w-[230px] lg:w-[251px] md:flex justify-between justify-self-end'>
            <Link to='/' className='self-center opacity-40 hover:opacity-100 text-[14px]'>Зарегистрироваться</Link>
            <span className='bg-[#029491] w-[2px]'></span>
            <button 
                onClick={() => navigate('auth')}
                className='w-[65px] h-[26px] rounded-[5px] bg-[#7CE3E1] hover:bg-[#029491] transition'>
                Войти
            </button>
        </div>
    )

    const info = (
        <div className='bg-[#D9D9D9] grid items-center grid-cols-1 lg:grid-cols-[134px_1fr] h-[75px] lg:h-[63px] py-[5px] lg:py-[10px] px-[7px] rounded-[5px]'>
            <h4 className='text-[8px] lg:text-[10px] lg:text-end pr-[6px]'>Использовано компаний</h4>
            <p className='font-bold'>{usedCompanies}</p>
            <h4 className='text-[8px] lg:text-[10px] lg:text-end pr-[6px]'>Лимит по компаниям</h4>
            <p className='font-bold text-[#8AC540]'>{limitCompanies}</p>
        </div>
    )

    const infoLoading = (
        <div className='w-[132px] md:w-[175px] h-[75px] md:h-[63px] bg-[#D9D9D9] flex items-center justify-center p-[10px] rounded-[5px]'>
            <img src={loadingImg} alt="Загрузка" className='animate-spin'/>
        </div>
    )

    const dropDownMenuButton = (
        <div 
            className='flex flex-col md:hidden w-[30px] h-[25px] justify-between cursor-pointer'
            onClick={() => setVisibleMenu(true)}
        >
            <span className='bg-[#029491] h-[5px]'></span>
            <span className='bg-[#029491] h-[5px]'></span>
            <span className='bg-[#029491] h-[5px]'></span>
        </div>
    )

    const userInfo = (
        <div className='gap-[30px] md:gap-[13px] lg:gap-[23px] xl:gap-[128px] flex justify-self-end items-center'>
            {!loading && info}
            {loading && infoLoading}
            <div className='hidden md:grid items-center grid-cols-[1fr_32px] min-w-[112px]'>
                <div className='mr-[3px]'>
                    <h3>{userName}</h3>
                    <Link 
                        to='/' 
                        onClick={() => setAuth(!auth)} 
                    >
                        <h5 className='text-[10px] leading-[12px] opacity-40 text-end hover:opacity-100'>Выйти</h5>
                    </Link>
                </div>
                <img src={userImg} alt="фото" className='rounded-[16px] w-[32px] h-[32px]' />
            </div>
            {!visibleMenu && dropDownMenuButton}
            {visibleMenu && (
                <DropDownMenu 
                    setVisibleMenu={setVisibleMenu} 
                    auth={auth} 
                    setAuth={setAuth}
                    userName={userName}
                    userImg={userImg}
                />
            )}
        </div>
    )

    return (
        <header className='flex justify-between md:grid md:grid-cols-3 md:grid-rows-1 items-center w-full h-[93px] px-[15px] xl:px-[60px] md:py-[15px] py-[9px]'>
            <Link to='/'><img className='w-[111px] md:w-[141px]' src={logo} alt="Логотип"/></Link>
            {navigation}
            {!auth && signIn}
            {auth && userInfo}
            {!auth && !visibleMenu && dropDownMenuButton}
            {visibleMenu && (
                <DropDownMenu 
                    setVisibleMenu={setVisibleMenu} 
                    auth={auth} 
                    setAuth={setAuth} 
                    userName={userName}
                    userImg={userImg}
                />
            )}
        </header>
    )
}