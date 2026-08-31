export interface ISubscription {
    id: string;
    name: string;
    iyzico_id: string;
    iyzico_plan: string;
    iyzico_status: string;
    trial_ends_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
}
