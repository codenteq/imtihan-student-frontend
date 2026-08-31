'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '@/store/slices/user';
import { IContactInformationForm } from '@/types/IUser';
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

const UserUpdateSchema: yup.ObjectSchema<IContactInformationForm> = yup
    .object()
    .shape({
        phone: yup
            .string()
            .matches(/^(\d{12})$/, 'Enter a valid phone number')
            .required('Required'),
        email: yup
            .string()
            .email('Enter a valid email address')
            .optional()
            .required('Required'),
    });

export default function ContactInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { user, isLoading } = useSelector(state => state.user);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IContactInformationForm, any>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            phone: user?.phone || '',
            email: user?.email || '',
        },
    });

    const onSubmit = (data: IContactInformationForm) => {
        dispatch(updateUser(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleEmailEdit = () => {
        setIsEditingEmail(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>İletişim tercihlerim</CardTitle>
                        <CardDescription>
                            Bilgilendirme Metni kapsamında önemli kampanyalardan
                            haberdar olmak için tercih ettiğiniz yöntemleri
                            belirtebilirsiniz. (Mobil bildirimler İleti Yönetim
                            Sistemi kapsamında değildir.)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Cep telefon numarası</Label>
                            <Input
                                {...register('phone')}
                                type="tel"
                                id="phone"
                                minLength={9}
                                maxLength={12}
                            />
                            <Label className="!text-zinc-500">
                                Ülke kodu ile birlikte (901234567890)
                            </Label>
                            <p className="text-sm text-[#f43f5e]">
                                {errors.phone?.message}
                            </p>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label
                                htmlFor="email"
                                className="flex justify-between">
                                E-posta adresi
                                {!isEditingEmail && (
                                    <button
                                        type="button"
                                        onClick={handleEmailEdit}
                                        className="text-brand font-bold">
                                        Değiştir
                                    </button>
                                )}
                            </Label>
                            <Input
                                {...register('email')}
                                value={isEditingEmail ? undefined : user?.email}
                                disabled={!isEditingEmail}
                                type="email"
                                id="email"
                            />
                            <Label className="!text-zinc-500">
                                Bu bilgileri değiştirebilmek için yeni e-posta
                                adresini doğrulamanızı isteyeceğiz.
                            </Label>
                            <p className="text-sm text-[#f43f5e]">
                                {errors.email?.message}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end mt-4">
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
        </>
    );
}
