import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

type AuthenticatorProps = {
    readonly mode: 'login' | 'register';
}

function Authenticator({ mode }: AuthenticatorProps) {
    const isRegister = mode === 'register'
    const cardTitle = mode === 'login' ? 'Login' : 'Regisrar-se'
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    {isRegister &&
                        <div className='flex flex-col sm:flex-row gap-2'>
                            <div>
                                <Label>Nome</Label>
                                <Input type="text" placeholder='Nome'></Input>
                            </div>
                            <div>
                                <Label>Sobrenome</Label>
                                <Input type="text" placeholder='Sobrenome'></Input>
                            </div>
                        </div>}

                    <div>
                        <Label>E-mail</Label>
                        <Input type="email" placeholder='E-mail' title='E-mail' aria-label='E-mail' />
                    </div>
                    <div>
                        <Label>Senha</Label>
                        <Input type="password" placeholder='Senha' title='Senha'></Input>
                    </div>
                    {isRegister &&
                        <div>
                            <Label>Confirmar senha</Label>
                            <Input type="password" placeholder='Confirmar Senha'></Input>
                        </div>
                    }
                    <Button>{cardTitle}</Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default Authenticator