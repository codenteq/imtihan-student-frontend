'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { postNote } from '@/store/slices/note';
import toast from 'react-hot-toast';
import TextEditor from '@/components/TextEditor';
import { INoteForm } from '@/types/INote';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setTitle } from '@/store/slices/root';
import { Button, Input, Label, Switch } from '@codenteq/interfeys';

const NoteCreateSchema: Yup.ObjectSchema<INoteForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    is_everyone: Yup.boolean().required('Required'),
});

export default function NoteCreatePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { push } = useRouter();
    const { isLoading } = useSelector(state => state.note);

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<INoteForm>({ resolver: yupResolver(NoteCreateSchema) });

    const onSubmit = (data: INoteForm): void => {
        dispatch(postNote(data))
            .then(() => {
                toast.success('Başarıyla oluşturuldu!');
                push('/note');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
                console.log('err');
            });
    };

    useEffect(() => {
        dispatch(setTitle('Not Oluştur'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <div className="p-3">
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
                                    <Label htmlFor="content">İçerik</Label>
                                    <TextEditor
                                        value={getValues('content') || ''}
                                        onChange={content => {
                                            setValue('content', content, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    />
                                    <p className="text-sm text-[#f43f5e]">
                                        {errors.content?.message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_everyone"
                                        {...register('is_everyone')}
                                        defaultValue={1}
                                    />
                                    <Label htmlFor="is_everyone">
                                        Herkesin görmesine izin ver
                                    </Label>
                                </div>
                                <Button
                                    isLoading={isLoading}
                                    loader="Lütfen bekleyin"
                                    type="submit">
                                    Kaydet
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
