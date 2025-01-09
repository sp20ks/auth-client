import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../api/authService';
import Form from './Form';
import Input from './Input';
import { translateError } from '../errorTranslator';

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
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const resp = await loginUser(data);
            const refreshToken = resp.data.refresh_token;
            alert('Вход успешен!');
            onLogin(refreshToken);
            navigate('/');
        } catch (err) {
            const readableError = translateError(err);
            alert(readableError);
        }
    };

    return (
        <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel='Войти'>
            <Input name='username' label='Имя' error={errors.username?.message} register={register} />
            <Input type='password' name='password' label='Пароль' error={errors.password?.message} register={register} />
        </Form>
    );
};

export default LoginForm;
