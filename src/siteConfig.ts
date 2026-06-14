const defaultContactEmail = 'hello@ai-disclosure-generator.com'

export const siteConfig = {
  siteUrl:
    import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
    'https://ai-disclosure-generator.com',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || defaultContactEmail,
  sponsorPaymentUrl: import.meta.env.VITE_SPONSOR_PAYMENT_URL || '',
  customServicePaymentUrl: import.meta.env.VITE_CUSTOM_SERVICE_PAYMENT_URL || '',
  sponsorName: import.meta.env.VITE_SPONSOR_NAME || '',
  sponsorUrl: import.meta.env.VITE_SPONSOR_URL || '',
  sponsorTagline: import.meta.env.VITE_SPONSOR_TAGLINE || '',
}

export function buildMailto(subject: string) {
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`
}
