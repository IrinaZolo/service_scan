import { IRates, IWhyUsCards } from "./models/models";
import clockImg from './assets/clock.svg'
import loupeImg from './assets/loupe.svg'
import protectionImg from './assets/protection.svg'
import basketImg from './assets/basket.svg'


export const WhyUsCards: IWhyUsCards[] = [
    {
        id: 1,
        icon: clockImg,
        description: "Высокая и оперативная скорость обработки заявки"
    },
    {
        id: 2,
        icon: loupeImg,
        description: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
    },
    {
        id: 3,
        icon: protectionImg,
        description: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
    },
    {
        id: 4,
        icon: basketImg,
        description: "Доступные тарифы, возможность подобрать оптимальный набор инструментов для исследования."
    }

]

export const Rates: IRates[] = [
    {
        id: 1,
        icon: new URL('./assets/lamp.png', import.meta.url).href,
        name: "Beginner",
        description: "Для небольшого исследования",
        price: "1 200",
        discountPrice: "799",
        installment: "или 150 ₽/мес. при рассрочке на 24 мес.",
        services: [
            "Безлимитная история запросов",
            "Безопасная сделка",
            "Поддержка 24/7"
        ],
        color: "#FFB64F",
        active: true,
        textColor: "black"
    },
    {
        id: 2,
        icon: new URL('./assets/target.png', import.meta.url).href,
        name: "Pro",
        description: "Для HR и фрилансеров",
        price: "2 600",
        discountPrice: "1 299",
        installment: "или 279 ₽/мес. при рассрочке на 24 мес.",
        services: [
            "Все пункты тарифа Beginner",
            "Экспорт истории",
            "Рекомендации по приоритетам"
        ],
        color: "#7CE3E1",
        active: false,
        textColor: "black"
    },
    {
        id: 3,
        icon: new URL('./assets/laptop.png', import.meta.url).href,
        name: "Business",
        description: "Для корпоративных клиентов",
        price: "3700",
        discountPrice: "2 379",
        services: [
            "Все пункты тарифа Pro",
            "Безлимитное количество запросов",
            "Приоритетная поддержка"
        ],
        color: "#000000",
        active: false,
        textColor: "white"
    },

]