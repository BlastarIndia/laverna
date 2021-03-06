/*global define */
define([
    'underscore',
    'app',
    'backbone',
    'text!apps/notebooks/list/templates/layout.html',
    'backbone.mousetrap',
    'marionette',
], function (_, App, Backbone, Templ) {
    'use strict';

    var Layout = App.module('AppNotebook.List.Layout');

    /**
     * Layout view
     */
    Layout.View = Backbone.Marionette.Layout.extend({
        template: _.template(Templ),

        regions: {
            notebooks :  '#notebooks',
            tags      :  '#tags'
        },

        keyboardEvents: {
            'o' : 'openActiveLink'
        },

        events: {
            'click .sync-button': 'syncWithCloud'
        },

        initialize: function () {
            this.keyboardEvents[App.settings.navigateBottom] = 'next';
            this.keyboardEvents[App.settings.navigateTop] = 'prev';
        },

        /**
         * Force sync
         */
        syncWithCloud: function (e) {
            e.preventDefault();
            this.trigger('syncWithCloud', true);
        },

        openActiveLink: function () {
            var a = this.$('.list-group-item.active');
            if (a.length) {
                App.navigate(a.attr('href'), true);
            }
        },

        /**
         * Navigation: next
         */
        next: function () {
            if ( !this.activeRegion) {
                this.activeRegion = 'notebooks';
            }
            this[this.activeRegion].currentView.trigger('next');
            this[this.activeRegion].currentView.on('changeRegion', this.changeNext, this);
        },

        /**
         * Navigation: prev
         */
        prev: function () {
            if ( !this.activeRegion) {
                this.activeRegion = 'notebooks';
            }
            this[this.activeRegion].currentView.trigger('prev');
        },

        changeNext: function (region) {
            if (this.options[region] !== 0) {
                this.activeRegion = region;
            }
        }

    });

    return Layout.View;
});
