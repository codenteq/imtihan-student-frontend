'use client';

import {
    Card as TremorCard,
    Grid,
    Col,
    AreaChart,
    DonutChart,
    Text,
    Metric,
} from '@tremor/react';
import Exam from '../../../public/lottie/animation_llpjjjsc.json';
import Note from '../../../public/lottie/animation_llpiacni.json';
import Calendar from '../../../public/lottie/animation_llpjqp34.json';
import { AppDispatch, useDispatch } from '@/store';
import React, { useEffect } from 'react';
import { setTitle } from '@/store/slices/root';
import {
    Button,
    TabGroup,
    TabList,
    TabsTrigger,
    TabPanels,
    TabPanel,
    Card as InterfeysCard,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@codenteq/interfeys';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
});

export default function DashboardPage() {
    const dispatch: AppDispatch = useDispatch();

    const chartdata = [
        {
            date: 'Haz 22',
            'Sınav Analizi': 0,
            'İlerleme Durumu': 0,
        },
        {
            date: 'Tem 22',
            'Sınav Analizi': 32,
            'İlerleme Durumu': 75,
        },
        {
            date: 'Agu 22',
            'Sınav Analizi': 66,
            'İlerleme Durumu': 83,
        },
    ];

    const dataFormatter = (number: number | bigint) =>
        '% ' + Intl.NumberFormat('tr').format(number).toString();

    const cities = [
        {
            name: 'Genel Sınav',
            sales: 56,
        },
        {
            name: 'Genel İlerleme',
            sales: 83,
        },
    ];

    const valueFormatter = (number: number | bigint) =>
        `% ${Intl.NumberFormat('tr').format(number).toString()}`;

    useEffect(() => {
        dispatch(setTitle('Ana Sayfa'));
    }, [dispatch]);

    return (
        <>
            <main>
                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col>
                        <TremorCard
                            decoration="top"
                            decorationColor="sky"
                            className="dark:bg-zinc-800">
                            <Text className="dark:text-zinc-300">Analiz</Text>
                            <Metric className="dark:text-zinc-100">% 32</Metric>
                        </TremorCard>
                    </Col>
                    <TremorCard
                        decoration="top"
                        decorationColor="sky"
                        className="dark:bg-zinc-800">
                        <Text className="dark:text-zinc-300">İlerleme</Text>
                        <Metric className="dark:text-zinc-100">% 75</Metric>
                    </TremorCard>
                    <TremorCard
                        decoration="top"
                        decorationColor="sky"
                        className="dark:bg-zinc-800">
                        <Text className="dark:text-zinc-300">Ortalama</Text>
                        <Metric className="dark:text-zinc-100">% 50</Metric>
                    </TremorCard>
                </Grid>

                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <TremorCard className="dark:bg-zinc-800">
                            <AreaChart
                                data={chartdata}
                                index="date"
                                categories={[
                                    'Sınav Analizi',
                                    'İlerleme Durumu',
                                ]}
                                colors={['indigo', 'cyan']}
                                valueFormatter={dataFormatter}
                                className="h-64"
                            />
                        </TremorCard>
                    </Col>
                    <TremorCard className="dark:bg-zinc-800">
                        <DonutChart
                            className="h-64"
                            data={cities}
                            category="sales"
                            index="name"
                            valueFormatter={valueFormatter}
                            colors={[
                                'slate',
                                'violet',
                                'indigo',
                                'rose',
                                'cyan',
                                'amber',
                            ]}
                        />
                    </TremorCard>
                </Grid>

                <TabGroup>
                    <TabList className="w-full lg:max-w-4xl">
                        <TabsTrigger className="w-full">Sınavlar</TabsTrigger>
                        <TabsTrigger className="w-full">Notlar</TabsTrigger>
                        <TabsTrigger className="w-full">Takvim</TabsTrigger>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <InterfeysCard className="flex flex-col lg:flex-row items-center lg:max-w-4xl">
                                <CardHeader className="order-last lg:order-first">
                                    <CardTitle>
                                        Hadi sınavınızı oluşturalım.
                                    </CardTitle>
                                    <CardDescription>
                                        Zorluk seviyeleri, soru sayıları ve
                                        kayıtlı konulardan oluşan bir sınav
                                        oluşturun.
                                        <Link href={'/exam'}>
                                            <Button className="w-full lg:max-w-xs mt-4">
                                                Sınav Oluştur
                                            </Button>
                                        </Link>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72">
                                        <LottieAnimation animationData={Exam} />
                                    </div>
                                </CardContent>
                            </InterfeysCard>
                        </TabPanel>
                        <TabPanel>
                            <InterfeysCard className="flex flex-col lg:flex-row items-center lg:max-w-4xl">
                                <CardHeader className="order-last lg:order-first">
                                    <CardTitle>
                                        Hadi notunuzu oluşturalım.
                                    </CardTitle>
                                    <CardDescription>
                                        Sınırsız defter, notlarınızı alın ve
                                        arkadaşlarınız ile paylaşın.
                                        <Link href={'/note'}>
                                            <Button className="w-full lg:max-w-xs mt-4">
                                                Not Oluştur
                                            </Button>
                                        </Link>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72">
                                        <LottieAnimation animationData={Note} />
                                    </div>
                                </CardContent>
                            </InterfeysCard>
                        </TabPanel>
                        <TabPanel>
                            <InterfeysCard className="flex flex-col lg:flex-row items-center lg:max-w-4xl">
                                <CardHeader className="order-last lg:order-first">
                                    <CardTitle>
                                        Hadi ders programınızı oluşturalım.
                                    </CardTitle>
                                    <CardDescription>
                                        Ders programınızı oluşturarak tarihi,
                                        zamanı ve dersi belirleyin.
                                        <Link href={'/class-schedule'}>
                                            <Button className="w-full lg:max-w-xs mt-4">
                                                Program Oluştur
                                            </Button>
                                        </Link>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72">
                                        <LottieAnimation
                                            animationData={Calendar}
                                        />
                                    </div>
                                </CardContent>
                            </InterfeysCard>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}
