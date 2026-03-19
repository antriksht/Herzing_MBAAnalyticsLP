/**
 * Herzing Analytics Utility
 * Pushes events to the GTM dataLayer for tracking.
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;

  const deviceType = window.innerWidth < 1024 ? "Mobile" : "Desktop"; // Aligning with our lg: breakpoint

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    deviceType,
    ...eventData,
    siteSection: "Transfer Landing Page",
    timestamp: new Date().toISOString()
  });

  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName} (${deviceType}):`, eventData);
  }
};
