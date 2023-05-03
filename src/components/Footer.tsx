import React from  'react'

export const Footer = () => {

    const logoDropdownMenu: string = new URL('../assets/logo-DropDownMenu.png', import.meta.url).href


    return (
        <footer className='h-[137px] bg-[#029491] text-white flex'>
            <div className='w-full px-[20px] xl:px-[45px] lg:mx-auto flex justify-between items-center justify-self-center'>
                <img src={logoDropdownMenu} alt="" className='self-start lg:self-auto lg:w-[141px] lg:ml-[15px]'/>
                <div className='text-end'>
                    <p className='mb-[22px]'>
                        г. Москва, Цветной б-р, 40<br/>
                        +7 495 771 21 11<br/>
                        info@skan.ru
                    </p>
                    <span>Copyright. 2022</span>
                </div>
            </div> 
        </footer>
    )
}