'use client';

import { Button, Input, Label, Modal, Textarea } from '@codenteq/interfeys';
import * as Yup from 'yup';
import { IClassScheduleForm } from '@/types/IClassSchedule';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import toast from 'react-hot-toast';
import { postClassSchedule } from '@/store/slices/class-schedule';
import React from 'react';

const ClassScheduleCreateSchema: Yup.ObjectSchema<IClassScheduleForm> =
    Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        start_date: Yup.string().required('Required'),
        end_date: Yup.string().required('Required'),
    });

interface ICreateModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function CreateModal({ open, setIsOpen }: ICreateModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(ClassScheduleCreateSchema) });
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector(state => state.classSchedule);

    const onSubmit = (data: IClassScheduleForm) => {
        dispatch(postClassSchedule(data))
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
                                <Label htmlFor="name">Adı</Label>
                                <Input
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.name?.message}
                                </p>
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="description">Açıklama</Label>
                                <Textarea
                                    {...register('description')}
                                    id="description"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.description?.message}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="start_date">
                                    Başlangıç tarihi
                                </Label>
                                <Input
                                    {...register('start_date')}
                                    type="datetime-local"
                                    id="start_date"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.start_date?.message}
                                </p>
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="end_date">Bitiş tarihi</Label>
                                <Input
                                    {...register('end_date')}
                                    type="datetime-local"
                                    id="end_date"
                                />
                                <p className="text-sm text-[#f43f5e]">
                                    {errors.end_date?.message}
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
