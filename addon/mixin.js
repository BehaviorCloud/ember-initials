import Ember from 'ember';
import { colorIndex } from './-private/utils';
import { generateInitials, generateImage, revokeImage } from './-private/generators';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],

  defaultName: '?',
  defaultBackground: '#dd6a58',

  name: Ember.computed.reads('defaultName'),
  seedText: Ember.computed.reads('name'),

  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  backgroundStyles: {},
  textStyles: {},

  textColor: 'white',
  fontSize: 50,
  fontWeight: 200,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

  colors: [
    '#1abc9c', '#16a085', '#f1c40f',
    '#f39c12', '#2ecc71', '#27ae60',
    '#e67e22', '#d35400', '#3498db',
    '#2980b9', '#e74c3c', '#c0392b',
    '#9b59b6', '#8e44ad', '#bdc3c7',
    '#34495e', '#2c3e50', '#95a5a6',
    '#7f8c8d', '#ec87bf', '#d870ad',
    '#f69785', '#9ba37e', '#b49255',
    '#b49255', '#a94136', '#5461b4',
  ],

  initialsObserver: Ember.observer('name', 'seedText', 'fontSize', 'fontWeight', 'fontFamily', 'textColor', 'defaultName', 'size', function () {
    revokeImage(this.get('src'));
    this.notifyPropertyChange('src');
  }),

  backgroundColor: Ember.computed('colors.length', 'seedText', 'defaultName', 'defaultBackground', function () {
    if (this.get('seedText') === this.get('defaultName')) {
      return this.get('defaultBackground');
    } else {
      let index = colorIndex(this.get('seedText'), this.get('colors.length'));
      return this.get('colors')[index];
    }
  }),

  src: Ember.computed(function () {
    return this.createInitials();
  }),

  createInitials() {
    return generateImage(this.initialsProperties());
  },

  initialsProperties() {
    return {
      width: 100,
      height: 100,
      initials: generateInitials(this.get('name') || this.get('defaultName')),
      initialsColor: this.get('textColor'),
      textStyles: Ember.assign(this._textStyles(), this.get('textStyles')),
      backgroundStyles: Ember.assign(this._backgroundStyles(), this.get('backgroundStyles')),
    };
  },

  willDestroyElement() {
    this._super(...arguments);
    revokeImage(this.get('src'));
  },

  _textStyles() {
    return {
      'font-family': this.get('fontFamily'),
      'font-weight': this.get('fontWeight'),
      'font-size': `${this.get('fontSize')}px`,
    };
  },

  _backgroundStyles() {
    return {
      'background-color': this.get('backgroundColor'),
    };
  },
});
