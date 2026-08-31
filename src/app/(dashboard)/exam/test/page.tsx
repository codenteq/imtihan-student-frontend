'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { IExamAnswer, IOption, IQuestion } from '@/types/IExam';
import { useRouter } from 'next/navigation';
import { deleteExam, storeAnswer } from '@/store/slices/exam';
import { Button, Label } from '@codenteq/interfeys';

export default function TestPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const { exam } = useSelector(state => state.exam);

    const [answer, setAnswer] = useState<IExamAnswer[]>([]);
    const [nextQuestion, setNextQuestion] = useState<number>(0);
    const [time, setTime] = useState(50);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const optionChangeColor = (option: any) => {
        if (answer.find(ans => ans.answer_id === option)) {
            return 'bg-brand text-white';
        }
        return 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800';
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleOptionSelect = (option: IOption) => {
        console.log(
            answer,
            ...answer.filter(d => d.question_id !== option.question_id),
        );
        setAnswer([
            {
                question_id: option.question_id,
                answer_id: option.id,
            },
            ...answer.filter(d => d.question_id !== option.question_id),
        ]);
        console.log('finish', answer);
    };

    const handleCloseExam = () => {
        if (exam) {
            if (confirm("İmtihan'dan çıkmak istediğinize emin misiniz?")) {
                dispatch(deleteExam(exam.exam_id)).then(() =>
                    router.push('/exam'),
                );
            }
        }
    };

    const handleFinishExam = () => {
        console.log('merh', exam?.exam_id);
        if (exam) {
            dispatch(storeAnswer(exam?.exam_id, answer)).then(() =>
                router.push('/exam/result'),
            );
        }
    };

    const handleNextQuestion = () => {
        if (exam?.questions?.length == nextQuestion + 1) return;
        setNextQuestion(nextQuestion + 1);
    };

    useEffect(() => {
        function handleContextMenu(e: any) {
            e.preventDefault();
        }

        document.body.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.body.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        if (exam) setTime(parseInt(exam?.time) * 60);
    }, []);

    useEffect(() => {
        if (time === 0) return;

        const timerId = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if (time === 0) {
            handleFinishExam();
        }
    }, [time]);

    useEffect(() => {
        const initialAnswers = exam?.questions?.map((question: IQuestion) => ({
            question_id: question.id,
            answer_id: null,
        }));

        setAnswer(initialAnswers || []);
    }, []);

    return (
        <div className="select-none">
            <header className="flex justify-between items-center fixed w-full backdrop-blur-sm border-b border-zinc-100 px-2 sm:px-4 py-2.5 dark:bg-black/30 dark:border-zinc-900 z-10">
                <button className="cursor-pointer" onClick={handleCloseExam}>
                    <XMarkIcon className="w-6 h-6 z-10 dark:text-white" />
                </button>
                <div className="font-medium text-2xl text-center sm:block md:blcok lg:blcok xl:blcok 2xl:blcok block text-zinc-900 dark:text-white">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <div>
                    <div
                        className="fixed flex justify-center items-center top-2 right-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11] cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}>
                        <EllipsisVerticalIcon className="w-6 h-6 z-10 dark:text-white" />
                    </div>

                    {isOpen && (
                        <div className="fixed top-14 right-2 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/50 dark:bg-black/50">
                            <ul className="py-2 px-4 list-none">
                                <li className="text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-400 cursor-pointer">
                                    Hatalı soru bildir
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <main className="min-h-screen bg-white dark:bg-black lg:px-4 px-5 py-16">
                <div className="flex flex-col gap-5 lg:flex-row justify-center items-center">
                    <div className="lg:w-3/6">
                        {exam?.questions[nextQuestion] && (
                            <div>
                                <div>
                                    {exam?.questions[nextQuestion]
                                        .is_image_option && (
                                        <Image
                                            src={
                                                exam?.questions[nextQuestion]
                                                    .src || ''
                                            }
                                            alt="Placeholder"
                                            className="w-full lg:w-96"
                                        />
                                    )}
                                </div>
                                <h3>{exam?.questions[nextQuestion].name}</h3>
                                <p
                                    className="text-zinc-500 dark:text-zinc-400 text-lg"
                                    dangerouslySetInnerHTML={{
                                        __html: exam?.questions[nextQuestion]
                                            .description,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-3/6 py-5">
                        <ul
                            id="answers"
                            className="lg:h-[calc(100svh-200px)] grid gap-3 content-center list-none">
                            {exam?.questions[nextQuestion]?.options?.map(
                                (option: IOption) => (
                                    <li
                                        key={option.id}
                                        className={`w-full py-6 px-2.5 text-lg rounded-lg cursor-pointer ${optionChangeColor(
                                            option.id,
                                        )}`}
                                        onClick={() =>
                                            handleOptionSelect(option)
                                        }>
                                        <span>{option.description}</span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="p-3 flex justify-around items-center gap-2 bg-white dark:bg-black fixed bottom-0 border-t border-zinc-100 shadow w-full dark:border-zinc-800">
                <div>
                    <h3 className="line-clamp-1 font-bold">
                        {exam?.questions[nextQuestion]?.category.name}
                    </h3>
                    <Label>
                        Soru {nextQuestion + 1}/{exam?.questions?.length}
                    </Label>
                </div>

                <div>
                    {exam && exam?.questions?.length - 1 !== nextQuestion ? (
                        <Button onClick={handleNextQuestion} className="px-10">
                            Sonraki
                        </Button>
                    ) : (
                        <Button onClick={handleFinishExam} className="px-10">
                            Sınavı Bitir
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}
