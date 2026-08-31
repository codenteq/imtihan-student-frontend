'use client';

import { ReactNode, useEffect } from 'react';
import {
    AreaChart,
    Card as TremorCard,
    Col,
    DonutChart,
    Grid,
    Metric,
    Text,
} from '@tremor/react';
import { dispatch, useSelector } from '@/store';
import { getExamResult } from '@/store/slices/exam-result';
import { useParams } from 'next/navigation';
import {
    TabGroup,
    TabList,
    TabsTrigger,
    TabPanels,
    TabPanel,
} from '@codenteq/interfeys';

export default function NoteViewPage(): ReactNode {
    const { id } = useParams();
    const examId: number = parseInt(id.toString(), 10);

    const { examResult } = useSelector(state => state.examResult);

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

    const exam = [
        {
            name: 'Doğru Sayısı',
            sales: examResult?.correct,
        },
        {
            name: 'Yanlış Sayısı',
            sales: examResult?.in_correct,
        },
    ];

    const valueFormatter = (number: number | bigint) =>
        `% ${Intl.NumberFormat('tr').format(number).toString()}`;

    useEffect(() => {
        dispatch(getExamResult(examId));
    }, [dispatch]);

    return (
        <>
            <main>
                <Grid numItems={1} numItemsSm={2} className="mb-5 gap-4">
                    <Grid numItems={2} className="gap-4">
                        <TremorCard decoration="top" decorationColor="sky">
                            <Text>Soru</Text>
                            <Metric>{examResult?.total_questions}</Metric>
                        </TremorCard>
                        <TremorCard decoration="top" decorationColor="sky">
                            <Text>Puan</Text>
                            <Metric>
                                {examResult?.point} / {examResult?.max_score}
                            </Metric>
                        </TremorCard>
                        <TremorCard decoration="top" decorationColor="sky">
                            <Text>Sonuç</Text>
                            <Metric>Başarılı</Metric>
                        </TremorCard>
                        <TremorCard decoration="top" decorationColor="sky">
                            <Text>Alan</Text>
                            <Metric>%67 Sayısal</Metric>
                        </TremorCard>
                    </Grid>

                    <TremorCard>
                        <TabGroup>
                            <TabList>
                                <TabsTrigger>Sınavlar</TabsTrigger>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Grid
                                        numItems={1}
                                        numItemsSm={2}
                                        numItemsLg={3}
                                        className="mb-5 gap-4">
                                        <Col
                                            numColSpan={1}
                                            numColSpanLg={2}
                                            className="flex items-center">
                                            <ul className="flex flex-col gap-4">
                                                <li>
                                                    Soru sayısı:{' '}
                                                    {
                                                        examResult?.total_questions
                                                    }
                                                </li>
                                                <li>
                                                    Doğru sayısı:{' '}
                                                    {examResult?.correct}
                                                </li>
                                                <li>
                                                    Yanlış sayısı:{' '}
                                                    {examResult?.in_correct}
                                                </li>
                                                <li>
                                                    Boş sayısı:{' '}
                                                    {examResult?.blank}
                                                </li>
                                            </ul>
                                        </Col>
                                        <DonutChart
                                            className="h-72"
                                            data={exam}
                                            category="sales"
                                            index="name"
                                            valueFormatter={valueFormatter}
                                            colors={[
                                                'cyan',
                                                'indigo',
                                                'green',
                                                'violet',
                                                'rose',
                                                'amber',
                                            ]}
                                        />
                                    </Grid>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </TremorCard>
                </Grid>

                <TremorCard>
                    <AreaChart
                        data={chartdata}
                        index="date"
                        categories={['Sınav Analizi', 'İlerleme Durumu']}
                        colors={['indigo', 'cyan']}
                        valueFormatter={dataFormatter}
                    />
                </TremorCard>
            </main>
        </>
    );
}
