'use client';

import '@/app/style/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/auth/context/AuthProvider';
import AxiosWrapper from '@/components/AxiosWrapper';
import { AuthConsumer } from '@/auth/context/AuthConsumer';
import Progress from '@/components/progress/Progress';

const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <ThemeProvider enableSystem={true} attribute="class">
                    <ReduxProvider store={store}>
                        <AuthProvider>
                            <AuthConsumer>
                                <AxiosWrapper>
                                    <Progress />
                                    {children}
                                </AxiosWrapper>
                            </AuthConsumer>
                        </AuthProvider>
                    </ReduxProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
