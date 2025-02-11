import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useThemeStore } from './stores/theme-store';
import MainLayout from '@/components/layout/MainLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve:  name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        let page = pages[`./Pages/${name}.tsx`] as { default: { layout?: (page: any) => JSX.Element } }
        if (name.toLowerCase().includes('auth') || name.toLowerCase().includes('terms') || name.toLowerCase().includes('welcome')) {
            return page
        }
        page.default.layout = ((page: any) => <MainLayout children={page} />)
        return page
      },
    setup({ el, App, props }) {
        const RootElement = ()=>{
            const theme = useThemeStore(s => s.theme);
             // theme management (git test)
            useEffect(() => {
                const root = window.document.documentElement;
                root.classList.remove('light', 'dark');

                if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                root.classList.add(systemTheme);
                } else {
                root.classList.add(theme);
                }
            }, [theme]);
            return (<App {...props} />);
        }
        createRoot(el).render(<RootElement />)
    },
    progress: {
        color: '#4B5563',
    },
});
