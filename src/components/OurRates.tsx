import React from  'react'
import { Rates } from '../data'
import CheckMark from '../assets/checkMark.svg'


export const OurRates = () => {

    const rates = Rates.map( rate => (
        <div key={rate.id} className='box-border border-2 flex flex-col rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.2)] w-[335px] 
            lg:w-[415px] h-[512px] lg:h-[540px]' 
            style={rate.active ? {borderColor: rate.color}:{border: "none"}}
        >
            <div className='h-[132px] rounded-t-[10px] px-5'
                style={{backgroundColor: rate.color}}
            >
                <img src={rate.icon} alt="" className='float-right w-[60px] lg:w-[90px] mt-5'/>
                <div style={{color: rate.textColor}} className='mt-8'>
                    <h3 className='font-semibold text-3base lg:text-xl'>{rate.name}</h3>
                    <p className='text-2base mt-[20px]'>{rate.description}</p>
                </div>
            </div>
            <div className='flex flex-col px-2 ml-2 lg:ml-5'>
                <div className='h-[160px] flex flex-col'>
                    {rate.active && (
                        <div className='text-white text-center pt-[3px] w-[134px] h-[24px] rounded-[10px] bg-[#3BA5E0] self-end 
                            mt-[10px]'>
                            Текущий тариф
                        </div>
                    )}
                    <div className='flex items-center' style={ (!rate.active) ? {marginTop: "35px"} : {marginTop: "0"}}>
                        <h2 className='text-xl mr-6'>{rate.discountPrice} ₽</h2>
                        <h3 className='text-[25px] leading-[30px] opacity-50 line-through'>{rate.price} ₽</h3>
                    </div>
                    <p className='text-2base mt-2'>{rate.installment}</p>
                </div>
                <h3 className='text-2base lg:text-3base'>В тариф входит:</h3>
                {rate.services.map(service => (
                    <div className="flex gap-x-2 mt-2" key={rate.id + service}>
                        <img src={CheckMark} alt="" />
                        <span className='text-base lg:text-2base'>{service}</span>
                    </div>
                ))}
            </div>
            {rate.active && (
                <button className='h-[60px] w-[287px] lg:w-[355px] rounded-[5px] text-2base lg:text-3base bg-[#D2D2D2] hover:bg-[#acabab] 
                    hover:scale-[1.03] transition self-center mt-[25px] lg:mt-[50px]'>
                    Перейти в личный кабинет
                </button>
            )}
            {!rate.active && (
                <button className='h-[60px]  w-[287px] lg:w-[355px] rounded-[5px] text-2base lg:text-3base text-white bg-[#5970FF] 
                    hover:bg-[#3545af] hover:scale-[1.03] transition px-[45px] self-center mt-[25px] lg:mt-[50px]'>
                    Подробнее
                </button>
            )}
            
        </div>
    ))

    return (
        <div className='flex flex-col mt-[70px] lg:mt-[115px] gap-y-[35px] lg:gap-y-[65px] mb-[43px] lg:mb-[118px]' >
            <h2 className='uppercase text-2lg lg:text-[45px] lg:leading-[54px] font-black self-start xs:self-center lg:self-start'>наши тарифы</h2>
            <div className='flex flex-wrap gap-[42px] lg:gap-[37px] justify-center'>
                {rates} 
            </div>
        </div>
    )
}