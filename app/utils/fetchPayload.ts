// app/utils/fetchPayload.js
'use client' // Ensures this file is treated as a client-side module

import { useQuery } from '@tanstack/react-query';

export async function fetchPayload(BASE_URI, collection, limit) {
    try {
        const res = await fetch(`${BASE_URI}/api/${collection}?limit=${limit}`);
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

export function useCachedPayload(BASE_URI, collection, limit) {
    return useQuery({
        queryKey: ['fetchPayload', { collection, limit }],
        queryFn: () => fetchPayload(BASE_URI, collection, limit),
        staleTime: 1000 * 60 * 60 * 24,
    });
}