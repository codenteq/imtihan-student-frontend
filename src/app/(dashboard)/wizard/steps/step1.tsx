'use client';

import React, { ReactNode } from 'react';
import { Button, Input, Label, Select } from '@codenteq/interfeys';
import EducationLevel from '@/enums/education-level';
import Gender from '@/enums/gender';

interface Step1Props {
    onNext: () => void;
}

export default function Step1({ onNext }: Step1Props): ReactNode {
    return (
        <form onSubmit={onNext}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Hesap detayları
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input type="tel" name="phone" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="birth_date">Doğum tarihi</Label>
                    <Input type="date" name="birth_date" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="education_level">Eğitim Seviyesi</Label>
                    <Select name="education_level">
                        <option value="">Eğitim seviyesi seç</option>
                        <option value={EducationLevel.PRIMARY}>İlkokul</option>
                        <option value={EducationLevel.MIDDLE}>Ortaokul</option>
                        <option value={EducationLevel.HIGH}>Lise</option>
                        <option value={EducationLevel.UNIVERSITY}>
                            Üniversite
                        </option>
                    </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="gender">Cinsiyet</Label>
                    <Select name="gender">
                        <option value="">Cinsiyet seç</option>
                        <option value={Gender.MALE}>Erkek</option>
                        <option value={Gender.FEMALE}>Kadın</option>
                    </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="language_id">Dil</Label>
                    <Select name="language_id">
                        <option value="">Dil seç</option>
                        <option value="1">Türkçe</option>
                        <option value="2">İngilizce</option>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit">Sonraki</Button>
            </div>
        </form>
    );
}
