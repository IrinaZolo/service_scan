import React, {useState, useEffect} from  'react'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'
import { WhyUsCards } from '../data'

export const WhyUsSlider = () => {

    const [offset, setOffset] = useState<number>(0)
    const [screenWidth, setScreenWidth] = useState<number>(document.documentElement.clientWidth)
    const [opacityLeft, setOpacityLeft] = useState<number>(0)
    const [opacityRight, setOpacityRight] = useState<number>(100)


    useEffect(() => {
        const setWindowDimensions  = () => setScreenWidth(document.documentElement.clientWidth)
        window.addEventListener('resize', setWindowDimensions)
        return(() => {
            window.removeEventListener('resize', setWindowDimensions)
            setOffset(0)
        })
    },[])

    useEffect(() => {
        setOffset(0)
        setOpacityLeft(0)
        setOpacityRight(100)
    },[screenWidth])

    const handleClick = (e:React.MouseEvent) => {
        
        const qtyHiddenCards: number = (screenWidth >= 1440) ? 1 
            : (screenWidth < 1440 && screenWidth >= 1024) ? 2
                : 3
                
        const elementWidth: number = (screenWidth >= 1234 && screenWidth < 1440) ? 518
                : (screenWidth >= 1024 && screenWidth < 1234) ? 442
                    : (screenWidth < 768) ? 305 
                        : 414

        if (e.currentTarget.getAttribute('value') === 'left') {
            if (offset !== 0) {
                const newOffset: number = offset + elementWidth
                if (newOffset === 0) {
                    setOffset(newOffset)
                    setOpacityLeft(0)
                    setOpacityRight(100)
                }

                setOffset(newOffset)
                setOpacityRight(100)
            }
            
        }

        if (e.currentTarget.getAttribute('value') === 'right') {
            if (offset !== (-elementWidth*qtyHiddenCards)){
                const newOffset: number = offset - elementWidth
                if (newOffset === (-elementWidth*qtyHiddenCards)){
                    setOpacityRight(0)
                    setOffset(newOffset)
                    setOpacityLeft(100)
                }
                
                setOffset(newOffset)
                setOpacityLeft(100)
            }
            
        }
    }

    const slider = (
        <div className='flex justify-center'>
            <button className='hover:scale-[1.5] transition min-w-[20px] md:min-w-[39px]' style={{opacity: opacityLeft}}
                onClick={handleClick} value='left'><img src={arrowLeft} alt="left"/></button>
            <div className='flex max-w-[305px] md:max-w-[414px] lg:max-w-[886px] xl:max-w-[1036px] 2xl:max-w-[1260px] overflow-hidden'>
                {WhyUsCards.map( card => (
                    <div key={card.id} className='my-[10px] mx-[10px] lg:mx-[24px] xl:mx-[62px] 2xl:mx-[10px] min-w-[285px] 
                        md:min-w-[394px] h-[225px] flex flex-col p-[10px] md:p-[20px] rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)] 
                        transition-transform duration-[1000ms]' 
                        style={{transform: `translateX(${offset}px)`}}
                    >
                        <img src={card.icon} alt="" className='w-[64px] h-[64px] mt-[15px]'/>
                        <p className='text-2base mt-[15px]'>{card.description}</p>
                    </div>
                ))}
            </div>
            <button className='hover:scale-[1.5] transition min-w-[20px] md:min-w-[39px]' style={{opacity: opacityRight}}
                onClick={handleClick} value='right'>
                <img src={arrowRight} alt="right"/>
            </button>
        </div>
    )
    

    return (
        <div className='relative mt-[85px] lg:mt-[140px] mb-[60px] flex flex-col gap-y-[20px] lg:gap-y-[50px] xs:self-center md:self-auto'  >
            <h2 className='uppercase font-black text-2lg lg:text-[45px] lg:leading-[54px] xs:text-center 
                lg:text-start w-[250px] xs:w-auto'
            >
                Почему именно мы
            </h2>
            {slider}
        </div>
    )
}