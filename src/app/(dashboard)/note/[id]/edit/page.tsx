'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { updateNote, getNote } from '@/store/slices/note';
import toast from 'react-hot-toast';
import React, { ReactNode, useEffect } from 'react';
import { INoteForm } from '@/types/INote';
import { useParams } from 'next/navigation';
import TextEditor from '@/components/TextEditor';
import { setTitle } from '@/store/slices/root';
import { Button, Input, Label, Switch } from '@codenteq/interfeys';

const NoteUpdateSchema: Yup.ObjectSchema<INoteForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    is_everyone: Yup.boolean().required('Required'),
});
export default function NoteEditPage(): ReactNode {
    const { id } = useParams();
    const noteId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, note } = useSelector(state => state.note);

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors, isDirty },
    } = useForm<INoteForm>({
        resolver: yupResolver(NoteUpdateSchema),
        defaultValues: {
            ...note,
        },
        values: {
            name: note?.name || '',
            content: note?.content || '',
            is_everyone: note?.is_everyone || false,
        },
    });

    const onSubmit = (data: INoteForm): void => {
        dispatch(updateNote(noteId, data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        dispatch(setTitle('Not Düzenle'));
        if (id) {
            dispatch(getNote(noteId));
        }
    }, [id]);

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
                                    type="submit"
                                    disabled={!isDirty}>
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
