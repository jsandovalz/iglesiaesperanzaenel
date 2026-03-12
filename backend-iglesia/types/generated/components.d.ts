import type { Schema, Struct } from '@strapi/strapi';

export interface ImagesSlider extends Struct.ComponentSchema {
  collectionName: 'components_images_sliders';
  info: {
    displayName: 'Slider';
    icon: 'alien';
  };
  attributes: {
    alt: Schema.Attribute.String;
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    src: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'images.slider': ImagesSlider;
    }
  }
}
