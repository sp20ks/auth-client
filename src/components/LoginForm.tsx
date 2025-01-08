import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../api/authService';

const schema = yup.object().shape({
    username: yup.string().required('Имя обязательно'),
    password: yup.string().min(6, 'Минимальная длина пароля — 6 символов').required('Пароль обязателен'),
});

interface LoginProps {
    onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLogin }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            loginUser(data).then((resp) => {
                const refreshToken = resp.data.refresh_token;
                console.log(refreshToken);
                alert('Вход успешен!');
                onLogin(refreshToken);
            });
        } catch (err) {
            alert('Ошибка входа');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username:</label>
                <input {...register('username')} />
                <p>{errors.username?.message}</p>
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" {...register('password')} />
                <p>{errors.password?.message}</p>
            </div>
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
