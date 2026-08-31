'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { Button, Input, Modal } from '@codenteq/interfeys';
import { createSubscriptionAPI } from '@/services/subscription';
import { useSWRConfig } from 'swr';

interface ICheckoutModalProps {
    open: boolean;
    setIsOpen: (value: boolean) => void;
    planReferenceCode: string | null;
}

interface ICheckoutForm {
    card_holder_name: string;
    card_number: string;
    expire_month: string;
    expire_year: string;
    cvc: string;
}

const CheckoutSchema: yup.ObjectSchema<ICheckoutForm> = yup.object().shape({
    card_holder_name: yup.string().required('Gerekli'),
    card_number: yup.string().required('Gerekli'),
    expire_month: yup.string().length(2, '2 haneli olmalıdır (01-12)').required('Gerekli'),
    expire_year: yup.string().length(4, '4 haneli olmalıdır').required('Gerekli'),
    cvc: yup.string().min(3, 'En az 3 haneli').max(4, 'En fazla 4 haneli').required('Gerekli'),
});

export default function CheckoutModal({ open, setIsOpen, planReferenceCode }: ICheckoutModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<ICheckoutForm>({
        resolver: yupResolver(CheckoutSchema)
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { mutate } = useSWRConfig();

    const onSubmit = (data: ICheckoutForm) => {
        if (!planReferenceCode) return;
        
        setIsLoading(true);
        const payload = {
            ...data,
            pricing_plan_reference_code: planReferenceCode,
            status: 'ACTIVE',
        };

        createSubscriptionAPI(payload)
            .then(() => {
                toast.success('Aboneliğiniz başarıyla başlatıldı!');
                setIsOpen(false);
                reset();
                mutate('/api/student/subscriptions');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || 'Ödeme sırasında bir hata oluştu');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            {open && (
                <Modal title="Abonelik Başlat" isOpen={open} setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="font-semibold text-lg mb-2">Ödeme Bilgileri</h4>
                        <div className="flex flex-col gap-4">
                            <Input
                                className="w-full"
                                {...register('card_holder_name')}
                                type="text"
                                id="card_holder_name"
                                label="Kart Üzerindeki İsim"
                                messages={errors.card_holder_name?.message}
                            />
                            <Input
                                className="w-full"
                                {...register('card_number')}
                                type="text"
                                id="card_number"
                                label="Kart Numarası"
                                messages={errors.card_number?.message}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="w-full"
                                    {...register('expire_month')}
                                    type="text"
                                    id="expire_month"
                                    label="Ay (AA)"
                                    placeholder="01"
                                    messages={errors.expire_month?.message}
                                />
                                <Input
                                    className="w-full"
                                    {...register('expire_year')}
                                    type="text"
                                    id="expire_year"
                                    label="Yıl (YYYY)"
                                    placeholder="2026"
                                    messages={errors.expire_year?.message}
                                />
                            </div>
                            <Input
                                className="w-full"
                                {...register('cvc')}
                                type="text"
                                id="cvc"
                                label="CVC"
                                messages={errors.cvc?.message}
                            />
                        </div>
                        
                        <div className="mt-6 w-full">
                            <Button
                                className="w-full"
                                isLoading={isLoading}
                                type={'submit'}
                                label={'Ödemeyi Tamamla ve Abone Ol'}
                            />
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
