import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Language, t } from '../../utils/i18n';

interface ContactProps {
  lang: Language;
}

export const ContactPage: FC<ContactProps> = ({ lang }) => {
  const title = t(lang, 'contactPageTitle');

  return (
    <Layout lang={lang} title={title}>
      <section class="page-intro">
        <h1>{t(lang, 'contactTitle')}</h1>
        <p>{t(lang, 'contactSubtitle')}</p>
      </section>

      <section class="contact-form">
        <form>
          <div class="form-group">
            <label for="name">{t(lang, 'formName')}</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="email">{t(lang, 'formEmail')}</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="website">{t(lang, 'formWebsite')}</label>
            <input type="url" id="website" name="website" />
          </div>
          <div class="form-group">
            <label for="message">{t(lang, 'formMessage')}</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit" class="cta-button">{t(lang, 'formSubmit')}</button>
        </form>
      </section>
    </Layout>
  );
};
