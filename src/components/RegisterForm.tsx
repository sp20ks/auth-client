import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../api/authService';

const schema = yup.object().shape({
    username: yup.string().required('Имя обязательно'),
    email: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup.string().min(6, 'Минимальная длина пароля — 6 символов').required('Пароль обязателен'),
});

const RegisterForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            await registerUser(data);
            alert('Регистрация успешна!');
        } catch (err) {
            alert('Ошибка регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Имя:</label>
                <input {...register('username')} />
                <p>{errors.username?.message}</p>
            </div>
            <div>
                <label>Email:</label>
                <input {...register('email')} />
                <p>{errors.email?.message}</p>
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" {...register('password')} />
                <p>{errors.password?.message}</p>
            </div>
            <button type="submit">Регистрация</button>
        </form>
    );
};

export default RegisterForm;
