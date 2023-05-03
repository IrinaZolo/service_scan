import React, { useState, useEffect, useRef } from  'react'

export const AuthForm = () => {

    const USER_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}|^[0-9-+]{12}$/;
    const PWD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('+7');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e:InputEvent) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd)
        setSuccess(true)
    }

    const userInput = (
        <>
            <label htmlFor="username" className='text-[16px] leading-[19px] text-[#949494]'>Логин или номер телефона:</label>
            <div className='relative flex flex-col'>
                <input 
                    type="text" 
                    className={(userFocus && ((user !== "+7") && user) && !validName ? 'border-[#FF5959] shadow-[0px_0px_20px_rgba(255,89,89,0.2)]' 
                        : 'border-[#C7C7C7]') + ' relative w-full h-[43px] border-[1px] rounded-[5px] my-[15px] px-[15px]'}
                    id='username'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && ((user !== "+7") && user) && !validName ? "absolute -bottom-2 self-center text-red-400" : "hidden"}>
                        Введите корректные данные   
                </p>
            </div>
            
        </>
    )

    const pwdInput = (
        <>
            <label htmlFor="password" className='text-[16px] leading-[19px] text-[#949494]'>Пароль:</label>
            <div className='relative flex flex-col'>
                <input
                    type="password"
                    id="password"
                    className={(pwdFocus && pwd && !validPwd ? 'border-[#FF5959] shadow-[0px_0px_20px_rgba(255,89,89,0.2)]' 
                        : 'border-[#C7C7C7]') + ' relative w-full h-[43px] border-[1px] rounded-[5px] my-[15px] px-[15px]'}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "absolute -bottom-2 self-center text-red-400" : "hidden"}>
                        Неправильный пароль   
                </p>
            </div>
            
        </>
    )

    return (
        <form  action="" className='mt-[40px]'>
            { userInput }
            { pwdInput }
            <button 
                disabled={!validName || !validPwd ? true : false} 
                className='mt-[17px] h-[60px] w-full text-center text-white text-[22px] leading-[27px] bg-[#5970FF] rounded-[5px] disabled:opacity-50'
            >
                Войти
            </button>
        </form>
    )
}