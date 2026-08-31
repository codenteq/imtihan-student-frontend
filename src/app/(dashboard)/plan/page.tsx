'use client';

import {
    ArrowTopRightOnSquareIcon,
    CreditCardIcon,
    NoSymbolIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import { Button, InfoCard, Label } from '@codenteq/interfeys';
import Link from 'next/link';
import useSWR from 'swr';
import { getSubscriptionsAPI, cancelSubscriptionAPI, downloadInvoiceAPI, getAvailablePlansAPI } from '@/services/subscription';
import { ISubscription } from '@/types/ISubscription';
import CheckoutModal from '@/app/(dashboard)/plan/_forms/CheckoutModal';
import toast from 'react-hot-toast';

export default function PlanPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isCanceling, setIsCanceling] = useState(false);
    const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(null);

    const { data: subscriptions, mutate, isLoading } = useSWR<ISubscription[]>(
        '/api/student/subscriptions',
        getSubscriptionsAPI
    );

    const { data: availablePlans } = useSWR<any[]>(
        '/api/student/subscription-plans',
        getAvailablePlansAPI
    );

    useEffect(() => {
        dispatch(setTitle('Planlarım'));
    }, [dispatch]);

    const activeSubscription = subscriptions?.find(
        sub => sub.iyzico_status === 'ACTIVE' || sub.iyzico_status === 'TRIAL'
    );

    const handleCancel = async () => {
        if (!activeSubscription || !confirm('Aboneliğinizi iptal etmek istediğinize emin misiniz?')) return;
        try {
            setIsCanceling(true);
            await cancelSubscriptionAPI(activeSubscription.id);
            await mutate();
            toast.success('Aboneliğiniz başarıyla iptal edildi.');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Abonelik iptal edilirken bir hata oluştu.');
        } finally {
            setIsCanceling(false);
        }
    };

    const handleDownloadInvoice = async (id: string) => {
        const loadingToast = toast.loading('Fatura hazırlanıyor...');
        try {
            await downloadInvoiceAPI(id);
            toast.success('Fatura başarıyla indirildi.', { id: loadingToast });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Fatura indirilirken bir hata oluştu.', { id: loadingToast });
        }
    };

    const handleSubscribe = (planCode: string) => {
        setSelectedPlanCode(planCode);
        setOpenCheckoutModal(true);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <>
            <main>
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <span className="text-zinc-500">Yükleniyor...</span>
                    </div>
                ) : activeSubscription ? (
                    <div className="flex flex-col items-center lg:max-w-4xl border border-brand rounded mb-6">
                        <div className="bg-zinc-50 dark:bg-zinc-950 w-full px-10 py-24 flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-bold">{activeSubscription.name || 'Premium Üyelik'}</h3>
                                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium rounded-full">
                                    {activeSubscription.iyzico_status === 'TRIAL' ? 'Deneme Sürümü' : 'Aktif'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between w-full p-4 gap-4">
                            <div className="flex-1">
                                <p className="pb-7 text-zinc-600 dark:text-zinc-400">
                                    Sınırsız çevrimiçi sınav, eğitim materyalleri ve ilerleme takibi hakkı.
                                </p>
                                <a
                                    href="https://support.imtihantech.com/plan-help"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 hover:underline">
                                    Planın hakkında bilgi edin
                                </a>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold pb-5">Durum Detayları</h3>
                                <label className="block text-zinc-700 dark:text-zinc-300">
                                    {activeSubscription.ends_at ? (
                                        <>Abonelik bitiş tarihi: <b>{formatDate(activeSubscription.ends_at)}</b></>
                                    ) : activeSubscription.trial_ends_at ? (
                                        <>Deneme bitiş tarihi: <b>{formatDate(activeSubscription.trial_ends_at)}</b></>
                                    ) : (
                                        <>Aboneliğiniz aktif olarak devam etmektedir.</>
                                    )}
                                </label>
                                <div className="flex items-center pt-7 gap-5">
                                    <CreditCardIcon className="h-9 w-9 text-brand" />
                                    <div>
                                        <h4>Kayıtlı Ödeme Yöntemi</h4>
                                        <Label>Sistemde kayıtlı</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-10">
                        <div className="flex flex-col items-center lg:max-w-4xl border border-zinc-200 dark:border-zinc-800 rounded mb-8 text-center py-10 bg-zinc-50 dark:bg-zinc-950">
                            <NoSymbolIcon className="h-16 w-16 text-zinc-400 mb-4" />
                            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">Aktif Bir Planınız Yok</h3>
                            <p className="text-zinc-500 max-w-md mx-auto">
                                Henüz bir plana abone değilsiniz. Çevrimiçi sınavlara ve eğitim materyallerine erişmek için hemen bir plan seçin ve avantajlardan faydalanmaya başlayın.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-4xl">
                            {availablePlans?.map((plan: any) => (
                                <div key={plan.referenceCode} className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-brand transition-colors bg-white dark:bg-zinc-900 shadow-sm">
                                    <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-brand">{plan.price} {plan.currencyCode}</span>
                                            <span className="text-zinc-500">/{plan.paymentInterval === 'MONTHLY' ? 'Ay' : plan.paymentInterval === 'YEARLY' ? 'Yıl' : 'Dönem'}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <ul className="space-y-3 mb-6 flex-1">
                                            <li className="flex items-start gap-2">
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-zinc-600 dark:text-zinc-300">İmtihan E-Sınav Tam Erişim</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-zinc-600 dark:text-zinc-300">Tüm materyallere sınırsız erişim</span>
                                            </li>
                                            {plan.trialPeriodDays > 0 && (
                                                <li className="flex items-start gap-2">
                                                    <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                                                    <span className="text-brand font-medium">{plan.trialPeriodDays} Gün Ücretsiz Deneme!</span>
                                                </li>
                                            )}
                                        </ul>
                                        <Button
                                            type={'button'}
                                            label="Abone Ol"
                                            className="w-full justify-center"
                                            onClick={() => handleSubscribe(plan.referenceCode)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSubscription && (
                    <div className="py-5 lg:max-w-xs flex flex-col gap-3">
                        <Button
                            className="w-full"
                            type={'button'}
                            label="Faturayı İndir"
                            onClick={() => handleDownloadInvoice(activeSubscription.id)}
                        />
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white border-none"
                            type={'button'}
                            label={isCanceling ? 'İptal Ediliyor...' : 'Planı İptal Et'}
                            onClick={handleCancel}
                            disabled={isCanceling}
                        />
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium planımı nasıl iptal edebilirim?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/plan-help#premium-planlar%C4%B1n%C4%B1-iptal-etme"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>

                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium planım doğru çalışmıyor. Ne yapmalıyım?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/plan-help#premium-%C3%A7al%C4%B1%C5%9Fm%C4%B1yor"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>

                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium fiyatı neden arttı?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/payment-help#fiyat-g%C3%BCncellemeri"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>
                    </div>
                </div>
            </main>
            
            <CheckoutModal
                open={openCheckoutModal}
                setIsOpen={setOpenCheckoutModal}
                planReferenceCode={selectedPlanCode}
            />
        </>
    );
}