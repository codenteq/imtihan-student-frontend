'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { postSupport } from '@/store/slices/support';
import toast from 'react-hot-toast';
import { ISupportForm } from '@/types/ISupport';
import React, { ReactNode } from 'react';
import { Button, Input, Label, Modal, Textarea } from '@codenteq/interfeys';

const SupportCreateSchema: Yup.ObjectSchema<ISupportForm> = Yup.object().shape({
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
    is_active: Yup.boolean().required('Required').default(false),
});

interface ICreateModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function CreateModal({
    open,
    setIsOpen,
}: ICreateModalProps): ReactNode {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(SupportCreateSchema) });
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector(state => state.support);

    const onSubmit = (data: ISupportForm) => {
        dispatch(postSupport(data))
            .then(() => {
                toast.success('Başarıyla oluşturuldu!');
                reset();
                setIsOpen(false);
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    return (
        <>
            {open && (
                <Modal title="Oluştur" isOpen={open} setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="subject">Konu</Label>
                                <Input
                                    {...register('subject')}
                                    type="text"
                                    id="subject"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.subject?.message}
                                </p>
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="message">Mesaj</Label>
                                <Textarea
                                    {...register('message')}
                                    id="message"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.message?.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button
                                isLoading={isLoading}
                                loader="Lütfen bekleyin"
                                type="submit">
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
