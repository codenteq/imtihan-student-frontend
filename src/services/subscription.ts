import axios from '@/lib/axios';
import { ISubscription } from '@/types/ISubscription';

export async function getSubscriptionsAPI(): Promise<ISubscription[]> {
    return await axios.get('/api/student/subscriptions').then(res => (
        Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
    ));
}

export async function cancelSubscriptionAPI(id: string): Promise<ISubscription> {
    return await axios.put(`/api/student/subscriptions/${id}/cancel`).then(res => res.data.data ?? res.data);
}

export async function upgradeSubscriptionAPI(id: string, plan: string): Promise<ISubscription> {
    return await axios.put(`/api/student/subscriptions/${id}/upgrade`, { plan }).then(res => res.data.data ?? res.data);
}

export async function downloadInvoiceAPI(id: string): Promise<void> {
    const response = await axios.get(`/api/student/subscriptions/${id}/invoice`, {
        responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export async function getAvailablePlansAPI(): Promise<any[]> {
    return await axios.get('/api/student/subscription-plans').then(res => res.data);
}

export async function createSubscriptionAPI(data: any): Promise<ISubscription> {
    return await axios.post('/api/student/subscriptions', data).then(res => res.data.data ?? res.data);
}
