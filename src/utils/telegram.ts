import { languages, type Language } from './i18n';

export interface ContactSubmission {
  name: string;
  email: string;
  website?: string;
  language?: string;
  companySize?: string;
  engagement?: string;
  message: string;
}

const sanitizeInline = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim();
};

const sanitizeMultiline = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
};

export const formatContactSubmission = (payload: ContactSubmission, lang: Language): string => {
  const languageLabel = languages[payload.language as Language]?.name ?? payload.language ?? '-';
  const companySize = sanitizeInline(payload.companySize) || '-';
  const engagement = sanitizeInline(payload.engagement) || '-';

  const messageLines = [
    `📬 New contact inquiry (${lang})`,
    `• Name: ${sanitizeInline(payload.name) || '-'}`,
    `• Email: ${sanitizeInline(payload.email) || '-'}`,
    `• Website: ${sanitizeInline(payload.website) || '-'}`,
    `• Preferred language: ${sanitizeInline(languageLabel) || '-'}`,
    `• Company size: ${companySize}`,
    `• Engagement: ${engagement}`,
    '',
    '📝 Message:',
    sanitizeMultiline(payload.message) || '-',
  ];

  return messageLines.join('\n');
};

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export const sendTelegramMessage = async (config: TelegramConfig, text: string): Promise<void> => {
  const endpoint = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: config.chatId,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram request failed with status ${response.status}`);
  }

  type TelegramResponse = {
    ok?: boolean;
  };

  const body = (await response.json()) as TelegramResponse;

  if (!body?.ok) {
    throw new Error('Telegram API returned an error');
  }
};
