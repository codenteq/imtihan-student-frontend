'use client';

import React, { ReactNode } from 'react';
import { Button, Input, Label, Select } from '@codenteq/interfeys';

interface Step2Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function Step2({ onNext, onPrev }: Step2Props): ReactNode {
    return (
        <form onSubmit={onNext}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Fatura adresi
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="address">Adres</Label>
                    <Input name="address" type="text" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="country_id">Ülke</Label>
                    <Select name="country_id">
                        <option value="">Ülke seç</option>
                        <option value="0">Türkiye</option>
                    </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="city_id">Şehir</Label>
                    <Select name="city_id">
                        <option value="">Şehir seç</option>
                        <option value="0">Adana</option>
                    </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="state_id">İlçe</Label>
                    <Select name="state_id">
                        <option value="">İlçe seç</option>
                        <option value="0">Seyhan</option>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Button onClick={onPrev} variant="destructive">
                    Önceki
                </Button>
                <Button type="submit">Sonraki</Button>
            </div>
        </form>
    );
}
