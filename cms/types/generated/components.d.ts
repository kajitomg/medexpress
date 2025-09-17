import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksMarkdownItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_markdown_items';
  info: {
    displayName: 'markdown item';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRowTextItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_row_text_items';
  info: {
    displayName: 'row text item';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsAboutHero extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_heroes';
  info: {
    displayName: 'about hero';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    formButton: Schema.Attribute.String & Schema.Attribute.Required;
    poster: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ElementsAboutInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_infos';
  info: {
    displayName: 'about info';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.markdown-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
          min: 2;
        },
        number
      >;
  };
}

export interface ElementsContactsDetails extends Struct.ComponentSchema {
  collectionName: 'components_elements_contacts_details';
  info: {
    description: '';
    displayName: 'contacts details';
  };
  attributes: {
    address: Schema.Attribute.Component<'shared.address', false> &
      Schema.Attribute.Required;
    email: Schema.Attribute.Component<'shared.email', false> &
      Schema.Attribute.Required;
    phonenumber: Schema.Attribute.Component<'shared.phonenumber', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'shared.social', false> &
      Schema.Attribute.Required;
    workingSchedule: Schema.Attribute.Component<
      'shared.working-schedule',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ElementsFooterAbout extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_abouts';
  info: {
    displayName: 'footer about';
  };
  attributes: {
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Component<'layout.logo', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'shared.social', false>;
  };
}

export interface ElementsFooterContacts extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_contacts';
  info: {
    displayName: 'footer contacts';
  };
  attributes: {
    address: Schema.Attribute.Component<'shared.address', false> &
      Schema.Attribute.Required;
    email: Schema.Attribute.Component<'shared.email', false> &
      Schema.Attribute.Required;
    phonenumber: Schema.Attribute.Component<'shared.phonenumber', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    workingSchedule: Schema.Attribute.Component<
      'shared.working-schedule',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ElementsHeaderContacts extends Struct.ComponentSchema {
  collectionName: 'components_elements_header_contacts';
  info: {
    displayName: 'header contacts';
  };
  attributes: {
    contactButton: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.Component<'shared.email', false> &
      Schema.Attribute.Required;
    phonenumber: Schema.Attribute.Component<'shared.phonenumber', false> &
      Schema.Attribute.Required;
    workingSchedule: Schema.Attribute.Component<
      'shared.working-schedule',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ElementsMainPageHero extends Struct.ComponentSchema {
  collectionName: 'components_elements_main_page_heroes';
  info: {
    description: '';
    displayName: 'main page hero';
  };
  attributes: {
    display: Schema.Attribute.RichText & Schema.Attribute.Required;
    formButton: Schema.Attribute.String;
    formInput: Schema.Attribute.String & Schema.Attribute.Required;
    formTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMainPageServices extends Struct.ComponentSchema {
  collectionName: 'components_elements_main_page_services';
  info: {
    description: '';
    displayName: 'main page services';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    contactButton: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutLogo extends Struct.ComponentSchema {
  collectionName: 'components_layout_logos';
  info: {
    description: '';
    displayName: 'logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_forms';
  info: {
    description: '';
    displayName: 'contact form';
  };
  attributes: {
    contactForm: Schema.Attribute.Component<'shared.contact-form', false> &
      Schema.Attribute.Required;
    display: Schema.Attribute.RichText;
    email: Schema.Attribute.Component<'shared.email', false> &
      Schema.Attribute.Required;
    phonenumber: Schema.Attribute.Component<'shared.phonenumber', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallery_sections';
  info: {
    displayName: 'gallery section';
  };
  attributes: {
    items: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'hero';
  };
  attributes: {
    picture: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsListSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_list_sections';
  info: {
    description: '';
    displayName: 'list section';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.row-text-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['serviceProcesses', 'faq', 'standOut']
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    description: '';
    displayName: 'address';
  };
  attributes: {
    body: Schema.Attribute.Relation<'oneToMany', 'api::address.address'>;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedContactForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_forms';
  info: {
    displayName: 'contact form';
  };
  attributes: {
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEmail extends Struct.ComponentSchema {
  collectionName: 'components_shared_emails';
  info: {
    description: '';
    displayName: 'email';
  };
  attributes: {
    body: Schema.Attribute.Relation<'oneToMany', 'api::email.email'>;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedPhonenumber extends Struct.ComponentSchema {
  collectionName: 'components_shared_phonenumbers';
  info: {
    description: '';
    displayName: 'phonenumber';
  };
  attributes: {
    body: Schema.Attribute.Relation<
      'oneToMany',
      'api::phonenumber.phonenumber'
    >;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedScheduleDay extends Struct.ComponentSchema {
  collectionName: 'components_shared_schedule_days';
  info: {
    description: '';
    displayName: 'schedule day';
  };
  attributes: {
    day: Schema.Attribute.Enumeration<
      [
        '\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A',
        '\u0412\u0442\u043E\u0440\u043D\u0438\u043A',
        '\u0421\u0440\u0435\u0434\u0430',
        '\u0427\u0435\u0442\u0432\u0435\u0440\u0433',
        '\u041F\u044F\u0442\u043D\u0438\u0446\u0430',
        '\u0421\u0443\u0431\u0431\u043E\u0442\u0430',
        '\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435',
      ]
    > &
      Schema.Attribute.Required;
    end: Schema.Attribute.Time & Schema.Attribute.DefaultTo<'17:30:00.000'>;
    start: Schema.Attribute.Time & Schema.Attribute.DefaultTo<'08:30:00.000'>;
    type: Schema.Attribute.Enumeration<
      [
        '\u0420\u0430\u0431\u043E\u0447\u0438\u0439',
        '\u0412\u044B\u0445\u043E\u0434\u043D\u043E\u0439',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u0420\u0430\u0431\u043E\u0447\u0438\u0439'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_socials';
  info: {
    displayName: 'social';
  };
  attributes: {
    body: Schema.Attribute.Relation<'oneToMany', 'api::social.social'>;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    description: '';
    displayName: 'text';
  };
  attributes: {
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedWorkingSchedule extends Struct.ComponentSchema {
  collectionName: 'components_shared_working_schedules';
  info: {
    description: '';
    displayName: 'working schedule';
  };
  attributes: {
    body: Schema.Attribute.Relation<
      'oneToOne',
      'api::working-schedule.working-schedule'
    >;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.markdown-item': BlocksMarkdownItem;
      'blocks.row-text-item': BlocksRowTextItem;
      'elements.about-hero': ElementsAboutHero;
      'elements.about-info': ElementsAboutInfo;
      'elements.contacts-details': ElementsContactsDetails;
      'elements.footer-about': ElementsFooterAbout;
      'elements.footer-contacts': ElementsFooterContacts;
      'elements.header-contacts': ElementsHeaderContacts;
      'elements.main-page-hero': ElementsMainPageHero;
      'elements.main-page-services': ElementsMainPageServices;
      'layout.logo': LayoutLogo;
      'sections.contact-form': SectionsContactForm;
      'sections.gallery-section': SectionsGallerySection;
      'sections.hero': SectionsHero;
      'sections.list-section': SectionsListSection;
      'shared.address': SharedAddress;
      'shared.contact-form': SharedContactForm;
      'shared.email': SharedEmail;
      'shared.media': SharedMedia;
      'shared.open-graph': SharedOpenGraph;
      'shared.phonenumber': SharedPhonenumber;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.schedule-day': SharedScheduleDay;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social': SharedSocial;
      'shared.text': SharedText;
      'shared.working-schedule': SharedWorkingSchedule;
    }
  }
}
