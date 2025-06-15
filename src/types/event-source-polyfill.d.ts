declare module 'event-source-polyfill' {
  export class EventSourcePolyfill extends EventSource {
    constructor(
      url: string | URL,
      eventSourceInitDict?: EventSourceInit & {
        headers?: Record<string, string>;
        withCredentials?: boolean;
        fetch?: typeof fetch;
      },
    );
  }
}
