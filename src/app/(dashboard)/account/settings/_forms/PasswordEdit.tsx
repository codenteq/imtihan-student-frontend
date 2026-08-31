'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React from 'react';
import { updatePassword } from '@/store/slices/user';
import { IUpdatePasswordForm } from '@/types/IUser';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
} from '@codenteq/interfeys';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const UserUpdateSchema: yup.ObjectSchema<IUpdatePasswordForm> = yup
    .object()
    .shape({
        password: yup.string().required('Required'),
        current_password: yup.string().required('Required'),
        password_confirmation: yup.string().required('Required'),
    });

export default function PasswordEdit() {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector(state => state.user);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IUpdatePasswordForm, any>({
        resolver: yupResolver(UserUpdateSchema),
    });

    const onSubmit = (data: IUpdatePasswordForm) => {
        dispatch(updatePassword(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(err?.message);
            });
    };

    return (
        <>
            <div className="space-y-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Parolanı güncelle</CardTitle>
                            <CardDescription>
                                Şifreniz en az bir harf, rakam veya özel
                                karakter içermeli. Ayrıca şifreniz en az 8
                                karakterden oluşmalı.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="current_password">
                                    Mevcut şifre
                                </Label>
                                <Input
                                    {...register('current_password')}
                                    type="password"
                                    id="current_password"
                                    className="pr-10"
                                    minLength={8}
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.current_password?.message}
                                </p>
                            </div>

                            <div className="grid w-full items-end gap-1.5">
                                <Label htmlFor="password">Yeni şifre</Label>
                                <Input
                                    {...register('password')}
                                    type="password"
                                    id="password"
                                    className="pr-10"
                                    minLength={8}
                                />
                                <Label className="!text-zinc-500">
                                    Güvenliğiniz için adınız, soyadınız ve doğum
                                    tarihinizi içermeyen bir şifre belirleyin.
                                </Label>
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.password?.message}
                                </p>
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="password_confirmation">
                                    Yeni şifre tekrar
                                </Label>
                                <Input
                                    {...register('password_confirmation')}
                                    type="password"
                                    id="password_confirmation"
                                    className="pr-10"
                                    minLength={8}
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.password_confirmation?.message}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-end mt-4">
                            <Button
                                isLoading={isLoading}
                                loader="Lütfen bekleyin"
                                type="submit"
                                disabled={!isDirty}>
                                Kaydet
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <div>
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card className="max-w-sm">
                            <CardHeader>
                                <CardDescription>
                                    Oturum açma bilgilerini hatırlamıyorum.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link
                                    href="https://support.imtihantech.com/account-help#oturum-a%C3%A7ma-bilgilerini-hat%C4%B1rlam%C4%B1yorum"
                                    target="_blank"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                    Detaylı bilgi
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
