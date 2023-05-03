import React from  'react'
import { useNavigate } from "react-router-dom"
import { WhyUsSlider } from '../components/WhyUsSlider'
import { OurRates } from '../components/OurRates'

type PropsType = {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export const MainPage = ({ auth, setAuth}: PropsType) => {

    const navigate = useNavigate()

    const mainImg: string = new URL('../assets/main-img1.jpg', import.meta.url).href
    const mainLargeImg: string = new URL('../assets/main-img2.jpg', import.meta.url).href

    const requestData = (
            <div className='flex flex-wrap gap-y-[23px] md:grid relative top-[25px] lg:top-[23px] md:grid-cols-[440px_1fr] lg:grid-cols-[535px_1fr] 
            xl:grid-cols-[645px_1fr] gap-x-[40px] justify-center'>
                <div className='flex flex-col md:mt-[52px] max-w-[500px] lg:max-w-[700px]'>
                    <h1 className='uppercase font-black text-[28px] leading-[33.6px] md:text-[32px] lg:text-[40px] lg:leading-[48px] 
                    xl:text-[60px] xl:leading-[72px]'>
                        сервис по поиску <br /> публикаций <br /> о компании <br /> по его ИНН
                    </h1>
                    <p className='text-[18px] leading-[22px] lg:text-[20px] lg:leading-[24px] md:max-w-[534px] mt-[15px]' >
                        Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                    </p>
                   {auth && ( <button 
                        onClick={() => navigate('/search')}
                        className='w-full md:w-[335px] h-[60px] rounded-[5px] bg-[#5970FF] text-white text-[20px] leading-[24px] lg:text-[22px] lg:leading-[27px] 
                        font-medium mt-[32px] md:mt-[55px] lg:mt-[70px] hover:bg-[#1b32c6] hover:scale-[1.05] transition'>
                        Запросить данные
                    </button>)}
                </div>
                <div className='max-w-[400px] md:max-w-none'><img src={mainImg} alt="" /></div>
            </div>
    )

    return (
        <main className='md:px-[15px] xl:px-[45px] flex flex-col'>
            {requestData}
            <WhyUsSlider />
            <div className='max-w-[1307px] h-[393px] lg:h-[575px] bg-cover' style={{backgroundImage: `url(${mainLargeImg})` }}></div>
            <OurRates />
        </main>
    )
}