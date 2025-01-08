const errorMappings: Record<string, string> = {
    'User exists': 'Пользователь с таким именем уже существует.',
    'Invalid user credentials': 'Неверное имя пользователя или пароль.',
    'Network Error': 'Проблемы с подключением. Проверьте интернет и повторите попытку.',
    'Failed to create user': 'Не удалось создать пользователя. Проверьте данные и попробуйте снова.',
    'invalid_grant': 'Неверные учетные данные. Повторите попытку.',
};

export const translateError = (error: any): string => {
    const errorMessage = error.response?.data?.error || error.response?.statusText || error.message || 'Unknown error';

    for (const keyword in errorMappings) {
        if (errorMessage.includes(keyword)) {
            return errorMappings[keyword];
        }
    }

    return 'Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.';
};
