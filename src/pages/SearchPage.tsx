import React from  'react'

export const SearchPage = () => {
    return (
        <main style={{minHeight: 'calc(100vh - 230px)'}}>
            <div className='relative'>
                <h1 className='font-black uppercase text-2xl'>
                    Найдите необходимые данные в пару кликов.
                </h1>
                <p className='text-3base te'>
                    Задайте параметры поиска. Чем больше заполните, тем точнее поиск
                </p>
            </div>
        </main>
    )
}