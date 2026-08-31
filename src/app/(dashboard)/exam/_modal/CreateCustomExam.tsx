'use client';

import { Button, Label, Modal, Select } from '@codenteq/interfeys';
import { useEffect, useState } from 'react';
import { createExam } from '@/store/slices/exam';
import toast from 'react-hot-toast';
import { setTitle } from '@/store/slices/root';
import { getExamTypes } from '@/store/slices/exam-type';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { useRouter } from 'next/navigation';
import {
    getQuestionCategories,
    IQuestionCategoryTree,
} from '@/store/slices/question-category';

interface ICreateCustomExamModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function CreateCustomExamModal({
    open,
    setIsOpen,
}: ICreateCustomExamModalProps) {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const { isLoading } = useSelector(state => state.exam);
    const { questionCategories } = useSelector(state => state.questionCategory);

    const handleExamCreate = () => {
        if (!categoryId) return;
        toast.promise(
            dispatch(
                createExam({
                    type: 'custom',
                    id: categoryId,
                }),
            ),
            {
                loading: 'İmtihan oluşturuluyor...',
                success: () => {
                    router.push('/exam/test');
                    return 'İmtihan oluşturuldu. Yönlendiriliyorsunuz...';
                },
                error: 'İmtihan oluşturulurken bir hata oluştu.',
            },
        );
    };

    useEffect(() => {
        dispatch(setTitle('İmtihanlar'));
        dispatch(getExamTypes());
        dispatch(getQuestionCategories());
    }, [dispatch]);

    return (
        <>
            {open && (
                <Modal
                    title="Özel İmtihan Oluştur"
                    isOpen={open}
                    setIsOpen={setIsOpen}>
                    <form>
                        <div className="mb-5">
                            <Label htmlFor="category_id">Kategori</Label>
                            <Select
                                className="block mt-1 w-full"
                                onChange={e =>
                                    setCategoryId(Number(e.target.value))
                                }
                                name="category_id">
                                <option value="">Kategori seç</option>
                                {questionCategories.map(
                                    (category: IQuestionCategoryTree) =>
                                        category.parents.map(
                                            (
                                                parent: IQuestionCategoryTree,
                                                index,
                                            ) => (
                                                <optgroup
                                                    key={index}
                                                    label={parent.name}>
                                                    {parent.parents.map(
                                                        (child, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    child.id
                                                                }>
                                                                {child.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </optgroup>
                                            ),
                                        ),
                                )}
                            </Select>
                        </div>
                        <div className="flex justify-end w-full">
                            <Button
                                type="button"
                                isLoading={isLoading}
                                loader="Lütfen bekleyin"
                                onClick={handleExamCreate}>
                                Sınavı Başlat
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
