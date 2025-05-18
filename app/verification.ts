import { MetadataRoute } from 'next';

export default function verification() {
  return {
    google: process.env.GOOGLE_VERIFICATION_CODE || '',
    // Add more verification codes if needed
    // yandex: 'YANDEX_VERIFICATION_CODE',
    // bing: 'BING_VERIFICATION_CODE',
  };
}
