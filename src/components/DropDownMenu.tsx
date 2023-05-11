import React from  'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonCross from '../assets/button-cross.svg'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { logout } from '../store/slices/authSlice'

type PropsType = {
    setVisibleMenu: React.Dispatch<React.SetStateAction<boolean>>,
    userName: string,
    userImg: string
}

export const DropDownMenu = ({ setVisibleMenu, userName, userImg}: PropsType) => {

    const { isAuth } = useAppSelector(state => state.auth)

    const logoDropdownMenu: string = new URL('../assets/logo-DropDownMenu.png', import.meta.url).href
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const navigation = (
        <nav className='flex flex-col self-center items-center gap-[25px] mt-[38px] mb-[35px]'>
            <Link to='/' 
                onClick={() => setVisibleMenu(false)}
                className='text-white text-base hover:text-black hover:scale-[1.2] hover:opacity-25 transition'
            >Главная</Link>
            <Link to='/' 
                onClick={() => setVisibleMenu(false)}
                className='text-white text-base hover:text-black hover:scale-[1.2] hover:opacity-25 transition'
            >Тарифы</Link>
            <Link to='/' 
                onClick={() => setVisibleMenu(false)}
                className='text-white text-base hover:text-black hover:scale-[1.2] hover:opacity-25 transition'
            >FAQ</Link>
        </nav>
    )

    const handleClickToAuth = () => {
        navigate('/auth')
        setVisibleMenu(false)
    }

    const signIn =(
        <div className='flex flex-col'>
            <Link to='/' 
                onClick={() => setVisibleMenu(false)}
                className='text-white text-base opacity-40 hover:text-black hover:scale-[1.2] transition self-center mt-[40px]'
            >Зарегистрироваться</Link>
            <button
                onClick={handleClickToAuth}
                className='w-[295px] h-[52px] rounded-[5px] bg-[#7CE3E1] self-center text-3base mt-[20px] hover:text-[rgb(41,138,135)] hover:scale-[1.1] transition '
            >
                Войти
            </button>
        </div>
    )

    const handleClick = () => {
        dispatch(logout())
        setVisibleMenu(false)
        navigate('/')
    }

    const buttonSignOut = (
        <button
                onClick={handleClick}
                className='w-[295px] h-[52px] rounded-[5px] bg-[#7CE3E1] self-center text-3base mt-[20px] hover:text-[rgb(41,138,135)] hover:scale-[1.1] transition '
            >
                Выйти
        </button>
    )

    const userInfo = (
        <div className='flex gap-[10px] self-center items-center mt-[20px]'>
                <h3 className='text-white opacity-80'>{userName}</h3>
                <img src={userImg} alt="фото" className='rounded-[16px] w-[40px] h-[40px]' />
            </div>
    )

    return (
        <div className='absolute top-0 right-0 left-0 h-screen bg-[#029491] flex flex-col z-10 px-[15px]' >
            <div className='flex justify-between'>
                <Link to='/' onClick={() => setVisibleMenu(false)}>
                    <img src={logoDropdownMenu} alt="logo" />
                </Link>
                <button 
                    onClick={() => setVisibleMenu(false)} 
                    className='bg-none hover:text-black hover:scale-[1.2] transition mb-[8px] mr-[12px]'
                >
                    <img src={ButtonCross} alt=''/>
                </button>
            </div>
            {navigation}
            {!isAuth && signIn}
            {isAuth && userInfo}
            {isAuth && buttonSignOut}
        </div>
    )
}