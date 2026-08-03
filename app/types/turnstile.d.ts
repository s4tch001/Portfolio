interface TurnstileRenderOptions {
  sitekey: string;
  action: string;
  theme: 'dark' | 'light';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileRenderOptions): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
}

interface Window {
  turnstile?: TurnstileApi;
}
