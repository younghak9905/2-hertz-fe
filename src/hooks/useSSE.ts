'use client';

import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

type SSEEventHandlers = {
  [eventName: string]: (data: unknown) => void;
};

export const useSSE = ({ url, handlers }: { url: string; handlers: SSEEventHandlers }) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn('No access token found for SSE connection.');
      return;
    }

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      fetch: (input, init = {}) => {
        const headers = new Headers(init.headers);
        headers.set('Authorization', `Bearer ${accessToken}`);

        return fetch(input, {
          ...init,
          headers,
        });
      },
      withCredentials: true,
    });

    Object.entries(handlers).forEach(([event, callback]) => {
      eventSource.addEventListener(event, (e: MessageEvent) => {
        try {
          const parsed = JSON.parse(e.data);
          callback(parsed);
        } catch (err: unknown) {
          console.error(`Error parsing SSE event '${event}':`, err);
        }
      });
    });

    eventSource.onerror = (err: Event) => {
      console.error('SSE connection error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url, handlers]);
};
