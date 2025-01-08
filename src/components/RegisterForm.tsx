import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../api/authService';
import Form from './Form';
import Input from './Input';
import { translateError } from '../ErrorTranslator';

const schema = yup.object().shape({
    username: yup.string().required('Имя обязательно'),
    email: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup.string().min(6, 'Минимальная длина пароля — 6 символов').required('Пароль обязателен'),
});

const RegisterForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await registerUser(data);
            alert('Регистрация успешна!');
            navigate('/');
        } catch (err) {
            const readableError = translateError(err);
            alert(readableError);
        }
    };

    return (
        <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel='Регистрация'>
            <Input name='username' label='Имя' error={errors.username?.message} register={register} />
            <Input name='email' label='Email' error={errors.email?.message} register={register} />
            <Input type='password' name='password' label='Пароль' error={errors.password?.message} register={register} />
        </Form>
    );
};

export default RegisterForm;
