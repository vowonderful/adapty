/**
 * Import required modules
 * @since 3.0.0
 */
///IMPORT TRANSLATIONS
const { __, _x, _n, _nx } = wp.i18n;
import { createApp, getCurrentInstance, defineComponent, ref } from './../libs/vue-esm.js';
import { VueDraggableNext } from './../libs/VueDraggableNext.js';
import { createRouter, createWebHistory, createWebHashHistory } from './../libs/vue-router-esm.js';

//Dynamic import Import scripts
//Get plugin version
const pluginVersion = import.meta.url.split('?ver=')[1];

//Import UiPress class
import { uip } from './classes/uip.min.js?ver=3.2.12';
import { uipMediaLibrary } from './classes/uip-media-library.min.js?ver=3.2.12';
const uipress = new uip('builder');

///Blocks groups
//Register block settings groups
import * as blockGroups from './blocks/block-settings-groups.min.js?ver=3.2.12';
uipress.register_new_block_groups(blockGroups.fetchGroups());
//Import blocks
import * as elementBlocks from './blocks/elements/loader.min.js?ver=3.2.12';
import * as layoutBlocks from './blocks/layout/loader.min.js?ver=3.2.12';
import * as formBlockOptions from './blocks/inputs/loader.min.js?ver=3.2.12';
import * as dynamicBlocks from './blocks/dynamic/loader.min.js?ver=3.2.12';
import * as analyticsBlocks from './blocks/analytics/loader.min.js?ver=3.2.12';
import * as storeAnalyticsBlocks from './blocks/storeanalytics/loader.min.js?ver=3.2.12';

let allBlocks = [].concat(
  elementBlocks.fetchBlocks(),
  layoutBlocks.fetchBlocks(),
  formBlockOptions.fetchBlocks(),
  dynamicBlocks.fetchBlocks(),
  analyticsBlocks.fetchBlocks(),
  storeAnalyticsBlocks.fetchBlocks()
);
uipress.register_new_blocks(allBlocks);
//IMPORT BLOCK SETTINGS
//Dynamic settings
import * as UIPDynamicss from './options/dynamic-settings.min.js?ver=3.2.12';
uipress.register_new_dynamic_settings(UIPDynamicss.fetchSettings(uipress));
uipress.uipAppData.dynamicOptions = uipress.loadDynamics();
///Block settings
import * as UIPsettings from './options/settings-loader.min.js?ver=3.2.12';
let dynamicSettings = UIPsettings.getSettings(uipress.uipAppData.dynamicOptions, 'builder');
uipress.register_new_block_settings(dynamicSettings);
//Register theme styles
import * as UIPthemeStyles from './options/theme-styles.min.js?ver=3.2.12';
uipress.register_new_theme_styles(UIPthemeStyles.fetchSettings(uipress));
uipress.uipAppData.themeStyles = uipress.loadThemeStyles();
//Register template group settings
import * as UIPtemplateSettings from './uibuilder/template-settings-groups.min.js?ver=3.2.12';
uipress.register_new_template_groups(UIPtemplateSettings.fetchGroups());
uipress.register_new_template_groups_options(UIPtemplateSettings.fetchSettings());
uipress.uipAppData.templateGroupOptions = uipress.loadTemplateGroups();

//Register global group settings
import * as UIPGlobalSettingsGroups from './uibuilder/global-settings-groups.min.js?ver=3.2.12';
uipress.register_new_global_groups(UIPGlobalSettingsGroups.fetchGroups());
uipress.register_new_global_groups_options(UIPGlobalSettingsGroups.fetchSettings());
uipress.uipAppData.globalGroupOptions = uipress.loadGlobalGroups();

//Register Builder plugins
uipress.uipAppData.plugins = uipress.loadPlugins();

const allUIPBlocks = uipress.loadBlocks();
const allUIPSettings = uipress.loadSettings();
const allBlockGroups = uipress.loadBlockGroups();

uipress.uipAppData.blockGroups = allBlockGroups;
uipress.uipAppData.blocks = allUIPBlocks;
uipress.uipAppData.settings = allUIPSettings;

///Views
import * as UIbuilderTable from './uibuilder/uip-template-list.min.js?ver=3.2.12';
import * as UIBuilderFramework from './uibuilder/uip-builder-framework.min.js?ver=3.2.12';
import * as UIbuilderSetupWizard from './uibuilder/uip-builder-setup-wizard.min.js?ver=3.2.12';
import * as UIbuilderGlobalExport from './uibuilder/uip-builder-global-export.min.js?ver=3.2.12';
import * as UIbuilderSiteSync from './uibuilder/uip-builder-site-sync.min.js?ver=3.2.12';
import * as UIbuilderGlobalImport from './uibuilder/uip-builder-global-import.min.js?ver=3.2.12';
import * as UIbuilderGlobalSettings from './uibuilder/uip-builder-global-settings.min.js?ver=3.2.12';
import * as UIbuilderBlockSettingsLoader from './uibuilder/uip-settings-loader.min.js?ver=3.2.12';

import * as UIbuilderSettings from './uibuilder/uip-builder-settings.min.js?ver=3.2.12';
import * as UIbuilderToolbar from './uibuilder/uip-builder-toolbar.min.js?ver=3.2.12';
import * as UIbuilderPreview from './uibuilder/uip-ui-preview.min.js?ver=3.2.12';
import * as UIbuilderblocksList from './uibuilder/uip-builder-blocks-list.min.js?ver=3.2.12';
import * as UIbuilderDropArea from './uibuilder/uip-builder-drop-area.min.js?ver=3.2.12';
import * as UIbuilderTreeviewDropArea from './uibuilder/uip-treeview-drop-area.min.js?ver=3.2.12';
import * as UIbuilderBlockReturner from './uibuilder/uip-block-returner.min.js?ver=3.2.12';
import * as UIbuilderBlockSettings from './uibuilder/uip-block-settings.min.js?ver=3.2.12';
import * as UIbuilderHistory from './uibuilder/uip-builder-history.min.js?ver=3.2.12';
import * as UIbuilderBlockActions from './uibuilder/uip-block-actions.min.js?ver=3.2.12';
import * as UIbuilderLibrary from './uibuilder/uip-template-library.min.js?ver=3.2.12';

import * as UIbuilderVariablesList from './uibuilder/uip-builder-variables.min.js?ver=3.2.12';
import * as UIbuilderSavePattern from './uibuilder/uip-save-pattern.min.js?ver=3.2.12';
import * as UIbuilderDynamicDataWatcher from './uibuilder/uip-dynamic-data-watcher.min.js?ver=3.2.12';

//Tool import
import * as UIToolsErrroLog from './tools/uip-php-error-log.min.js?ver=3.2.12';

//modules
import * as UIbuilderDropdown from './modules/uip-dropdown.min.js?ver=3.2.12';
import * as UIbuilderMultiSelect from './modules/uip-multiselect.min.js?ver=3.2.12';
import * as UIbuilderUserMultiSelect from './modules/uip-user-role-multiselect.min.js?ver=3.2.12';
import * as UIbuilderUserSearch from './modules/uip-user-role-search.min.js?ver=3.2.12';

import * as UIbuilderPostTypeMultiSelect from './modules/uip-post-type-select.min.js?ver=3.2.12';
import * as UIbuilderPostMetaMultiSelect from './modules/uip-post-meta-select.min.js?ver=3.2.12';
import * as UIbuilderAccordion from './modules/uip-accordion.min.js?ver=3.2.12';
import * as UIbuilderSwitchToggle from './modules/uip-switch-toggle.min.js?ver=3.2.12';
import * as UIbuilderTooltip from './modules/uip-tooltip.min.js?ver=3.2.12';
import * as UIbuilderChartLoading from './modules/uip-loading-chart.min.js?ver=3.2.12';
import * as UIbuilderOffcanvas from './modules/uip-offcanvas.min.js?ver=3.2.12';
import * as UIbuilderSaveButton from './modules/uip-save-button.min.js?ver=3.2.12';
import * as UIbuilderDynamicList from './modules/uip-dynamic-data-list.min.js?ver=3.2.12';
import * as UIbuilderChart from './modules/uip-chart.min.js?ver=3.2.12';
import * as UIbuilderModal from './modules/uip-modal.min.js?ver=3.2.12';
import * as UIfloatingPanel from './modules/uip-floating-panel.min.js?ver=3.1.12';

//Option components
import * as UIbuilderImageSelect from './options/uip-image-select.min.js?ver=3.2.12';
import * as UIbuilderInlineImageSelect from './options/uip-inline-image-select.min.js?ver=3.2.12';
import * as UIbuilderBackgroundPosition from './options/uip-background-position.min.js?ver=3.2.12';
import * as UIbuilderSwitch from './options/uip-switch-select.min.js?ver=3.2.12';
import * as UIbuilderValueUnits from './options/uip-value-units.min.js?ver=3.2.12';
import * as UIbuilderUnits from './options/uip-units.min.js?ver=3.2.12';
import * as UIbuilderDimensions from './options/uip-dimensions.min.js?ver=3.2.12';
import * as UIbuilderColorSelect from './options/uip-color-select.min.js?ver=3.2.12';
import * as UIbuilderColorPicker from './options/uip-color-picker.min.js?ver=3.2.12';
import * as UIbuilderBorder from './options/uip-border-designer.min.js?ver=3.2.12';
import * as UIbuilderOutline from './options/uip-outline-designer.min.js?ver=3.2.12';
import * as UIbuilderShadow from './options/uip-shadow-designer.min.js?ver=3.2.12';
import * as UIbuilderInput from './options/uip-input.min.js?ver=3.2.12';
import * as UIbuilderTextarea from './options/uip-textarea.min.js?ver=3.2.12';
import * as UIbuilderClasses from './options/uip-classes.min.js?ver=3.2.12';
import * as UIbuilderNumber from './options/uip-number.min.js?ver=3.2.12';
import * as UIbuilderPostTypes from './options/uip-post-types.min.js?ver=3.2.12';
import * as UIbuilderPostMeta from './options/uip-post-meta.min.js?ver=3.2.12';
import * as UIbuilderParagraphInput from './options/uip-paragraph-input.min.js?ver=3.2.12';
import * as UIbuilderDynamicInput from './options/uip-dynamic-input.min.js?ver=3.2.12';
import * as UIbuilderPadding from './options/uip-padding.min.js?ver=3.2.12';
import * as UIbuilderSpacing from './options/uip-spacing.min.js?ver=3.2.12';
import * as UIbuilderMargin from './options/uip-margin.min.js?ver=3.2.12';
import * as UIbuilderIconSelect from './options/uip-icon-select.min.js?ver=3.2.12';
import * as UIbuilderInlineIconSelect from './options/uip-inline-icon-select.min.js?ver=3.2.12';
import * as UIbuilderChoiceSelect from './options/uip-choice-select.min.js?ver=3.2.12';
import * as UIbuilderIconChoiceSelect from './options/uip-icon-choice-select.min.js?ver=3.2.12';
import * as UIbuilderTextFormat from './options/uip-text-format.min.js?ver=3.2.12';
import * as UIbuilderDefaultSelect from './options/uip-default-select.min.js?ver=3.2.12';
import * as UIbuilderMenuSelect from './options/uip-custom-menu-select.min.js?ver=3.2.12';

import * as UIbuilderLinkSelect from './options/uip-link-select.min.js?ver=3.2.12';
import * as UIbuilderBorderRadius from './options/uip-border-radius.min.js?ver=3.2.12';
import * as UIbuilderTabBuilder from './options/uip-tab-builder.min.js?ver=3.2.12';
import * as UIbuilderHiddenMenuItems from './options/uip-hidden-menu-items-select.min.js?ver=3.2.12';
import * as UIbuilderHiddenToolbarItems from './options/uip-hidden-toolbar-items-select.min.js?ver=3.2.12';
import * as UIbuilderEditToolbarItems from './options/uip-edit-toolbar-items.min.js?ver=3.2.12';
import * as UIbuilderEditMenuItems from './options/uip-edit-menu-items.min.js?ver=3.2.12';
import * as UIbuilderResponsive from './options/uip-responsive.min.js?ver=3.2.12';
import * as UIbuilderMultiselectOption from './options/uip-multi-select.min.js?ver=3.2.12';
import * as UIbuilderCodeEditor from './options/uip-code-editor.min.js?ver=3.2.12';
import * as UIbuilderPositionEditor from './options/uip-position-designer.min.js?ver=3.2.12';
import * as UIbuilderSubmitAction from './options/uip-submit-action.min.js?ver=3.2.12';
import * as UIbuilderSelectOptionBuilder from './options/uip-select-option-builder.min.js?ver=3.2.12';
import * as UIbuilderSimpleColorPicker from './options/uip-simple-color-picker.min.js?ver=3.2.12';
import * as UIbuilderArrayList from './options/uip-array-list.min.js?ver=3.2.12';
import * as UIbuilderSelectPostTypes from './options/uip-select-post-types.min.js?ver=3.2.12';
import * as UIbuilderFlexLayout from './options/uip-flex-layout.min.js?ver=3.2.12';
import * as UIbuilderQueryBuilder from './options/uip-query-builder.min.js?ver=3.2.12';
import * as UIbuilderStyles from './options/uip-styles.min.js?ver=3.2.12';
import * as UIbuilderEffects from './options/uip-effects.min.js?ver=3.2.12';

/**
 * Builds main args for ui builder
 * @since 3.0.0
 */
const uiBuilderArgs = defineComponent({
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      uipGlobalData: uipress.uipAppData,
    };
  },
  provide() {
    return {
      uipData: this.returnGlobalData,
      uipress: uipress,
      uipMediaLibrary: uipMediaLibrary,
    };
  },
  created: function () {
    window.addEventListener('resize', this.getScreenWidth);
  },
  computed: {
    returnGlobalData() {
      return this.uipGlobalData;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {},
  template: '<router-view></router-view>',
});

/**
 * Defines and create ui builder routes
 * @since 3.0.0
 */
const routes = [
  {
    path: '/',
    name: __('List View', 'uipress-lite'),
    component: UIbuilderTable.moduleData(),
    query: { page: '1', search: '' },
    children: [
      {
        name: __('Setup wizard', 'uipress-lite'),
        path: '/setupwizard/',
        component: UIbuilderSetupWizard.moduleData(),
      },
      {
        name: __('Global export', 'uipress-lite'),
        path: '/globalexport/',
        component: UIbuilderGlobalExport.moduleData(),
      },
      {
        name: __('Global import', 'uipress-lite'),
        path: '/globalimport/',
        component: UIbuilderGlobalImport.moduleData(),
      },
      {
        name: __('Site sync', 'uipress-lite'),
        path: '/sitesync/',
        component: UIbuilderSiteSync.moduleData(),
      },
      {
        name: __('Site settings', 'uipress-lite'),
        path: '/site-settings/',
        component: UIbuilderGlobalSettings.moduleData(),
      },
    ],
  },
  {
    path: '/uibuilder/:templateID/',
    name: 'Builder',
    component: UIBuilderFramework.moduleData(),
    children: [
      {
        name: __('Block Settings', 'uipress-lite'),
        path: 'settings/blocks/:uid',
        component: UIbuilderBlockSettingsLoader.moduleData(),
      },
      {
        name: __('Template Settings', 'uipress-lite'),
        path: 'settings/template',
        component: UIbuilderSettings.moduleData(),
      },
    ],
  },
];

const uiBuilderrouter = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
/**
 * Builds main app for ui builder
 * @since 3.0.0
 */

const uipUiBuilderApp = createApp(uiBuilderArgs);
//Allow reactive data from inject
uipUiBuilderApp.config.unwrapInjectedRef = true;
uipUiBuilderApp.config.devtools = true;
uipUiBuilderApp.use(uiBuilderrouter);
uipUiBuilderApp.provide('router', uiBuilderrouter);

uipUiBuilderApp.config.errorHandler = function (err, vm, info) {
  if (err == "TypeError: Cannot read properties of null (reading 'parent')") {
    uipress.notify(__('Please clear your cache', 'uipress-lite'), __('Thank you for updating uiPress. Please clear your cache to ensure the builder works correctly', 'warning', true));
    return;
  }
  uipress.notify(err, info, 'error');
  console.log(err);
  console.log(vm);
};

//import to app
//import * as navigation from "./modules/navigation.min.js";
//import components
uipUiBuilderApp.component('builder-settings', UIbuilderSettings.moduleData());
uipUiBuilderApp.component('builder-toolbar', UIbuilderToolbar.moduleData());

uipUiBuilderApp.component('multi-select', UIbuilderMultiSelect.moduleData());
uipUiBuilderApp.component('user-role-select', UIbuilderUserMultiSelect.moduleData());
uipUiBuilderApp.component('user-role-search', UIbuilderUserSearch.moduleData());
uipUiBuilderApp.component('post-type-select', UIbuilderPostTypeMultiSelect.moduleData());
uipUiBuilderApp.component('post-meta-select', UIbuilderPostMetaMultiSelect.moduleData());
uipUiBuilderApp.component('accordion', UIbuilderAccordion.moduleData());
uipUiBuilderApp.component('ui-preview', UIbuilderPreview.moduleData());
uipUiBuilderApp.component('builder-blocks-list', UIbuilderblocksList.moduleData());
uipUiBuilderApp.component('uip-tooltip', UIbuilderTooltip.moduleData());
uipUiBuilderApp.component('uip-content-area', UIbuilderDropArea.moduleData());
uipUiBuilderApp.component('uip-treeview-drop-area', UIbuilderTreeviewDropArea.moduleData());
uipUiBuilderApp.component('uip-block-returner', UIbuilderBlockReturner.moduleData());
uipUiBuilderApp.component('loading-chart', UIbuilderChartLoading.moduleData());
uipUiBuilderApp.component('uip-offcanvas', UIbuilderOffcanvas.moduleData());
uipUiBuilderApp.component('uip-save-button', UIbuilderSaveButton.moduleData());
uipUiBuilderApp.component('builder-history', UIbuilderHistory.moduleData());
uipUiBuilderApp.component('block-actions', UIbuilderBlockActions.moduleData());
uipUiBuilderApp.component('dynamic-data-list', UIbuilderDynamicList.moduleData());
uipUiBuilderApp.component('uip-block-settings', UIbuilderBlockSettings.moduleData());
uipUiBuilderApp.component('drop-down', UIbuilderDropdown.moduleData());
uipUiBuilderApp.component('list-variables', UIbuilderVariablesList.moduleData());
uipUiBuilderApp.component('saveaspattern', UIbuilderSavePattern.moduleData());
uipUiBuilderApp.component('uip-chart', UIbuilderChart.moduleData());
uipUiBuilderApp.component('uip-modal', UIbuilderModal.moduleData());
uipUiBuilderApp.component('uip-template-library', UIbuilderLibrary.moduleData());
uipUiBuilderApp.component('uip-floating-panel', UIfloatingPanel.moduleData());
uipUiBuilderApp.component('uip-dynamic-data-watcher', UIbuilderDynamicDataWatcher.moduleData());

//Tools
uipUiBuilderApp.component('uip-error-log', UIToolsErrroLog.moduleData());

//Import libs
uipUiBuilderApp.component('uip-draggable', VueDraggableNext);

//OPTION MODS
uipUiBuilderApp.component('image-select', UIbuilderImageSelect.moduleData());
uipUiBuilderApp.component('background-position', UIbuilderBackgroundPosition.moduleData());
uipUiBuilderApp.component('switch-select', UIbuilderSwitch.moduleData());
uipUiBuilderApp.component('value-units', UIbuilderValueUnits.moduleData());
uipUiBuilderApp.component('units-select', UIbuilderUnits.moduleData());
uipUiBuilderApp.component('dimensions', UIbuilderDimensions.moduleData());
uipUiBuilderApp.component('color-select', UIbuilderColorSelect.moduleData());
uipUiBuilderApp.component('color-picker', UIbuilderColorPicker.moduleData());
uipUiBuilderApp.component('toggle-switch', UIbuilderSwitchToggle.moduleData());
uipUiBuilderApp.component('border-designer', UIbuilderBorder.moduleData());
uipUiBuilderApp.component('outline-designer', UIbuilderOutline.moduleData());
uipUiBuilderApp.component('shadow-designer', UIbuilderShadow.moduleData());
uipUiBuilderApp.component('uip-input', UIbuilderInput.moduleData());
uipUiBuilderApp.component('uip-textarea', UIbuilderTextarea.moduleData());
uipUiBuilderApp.component('uip-classes', UIbuilderClasses.moduleData());
uipUiBuilderApp.component('post-types', UIbuilderPostTypes.moduleData());
uipUiBuilderApp.component('post-meta', UIbuilderPostMeta.moduleData());
uipUiBuilderApp.component('uip-number', UIbuilderNumber.moduleData());
uipUiBuilderApp.component('uip-paragraph-input', UIbuilderParagraphInput.moduleData());
uipUiBuilderApp.component('uip-dynamic-input', UIbuilderDynamicInput.moduleData());
uipUiBuilderApp.component('uip-padding', UIbuilderPadding.moduleData());
uipUiBuilderApp.component('uip-spacing', UIbuilderSpacing.moduleData());
uipUiBuilderApp.component('uip-margin', UIbuilderMargin.moduleData());
uipUiBuilderApp.component('icon-select', UIbuilderIconSelect.moduleData());
uipUiBuilderApp.component('inline-icon-select', UIbuilderInlineIconSelect.moduleData());
uipUiBuilderApp.component('choice-select', UIbuilderChoiceSelect.moduleData());
uipUiBuilderApp.component('icon-choice-select', UIbuilderIconChoiceSelect.moduleData());
uipUiBuilderApp.component('text-format', UIbuilderTextFormat.moduleData());
uipUiBuilderApp.component('default-select', UIbuilderDefaultSelect.moduleData());
uipUiBuilderApp.component('custom-menu-select', UIbuilderMenuSelect.moduleData());
uipUiBuilderApp.component('hiden-menu-items-select', UIbuilderHiddenMenuItems.moduleData());
uipUiBuilderApp.component('hiden-toolbar-items-select', UIbuilderHiddenToolbarItems.moduleData());
uipUiBuilderApp.component('edit-toolbar-items', UIbuilderEditToolbarItems.moduleData());
uipUiBuilderApp.component('edit-menu-items', UIbuilderEditMenuItems.moduleData());
uipUiBuilderApp.component('hidden-responsive', UIbuilderResponsive.moduleData());
uipUiBuilderApp.component('multi-select-option', UIbuilderMultiselectOption.moduleData());
uipUiBuilderApp.component('code-editor', UIbuilderCodeEditor.moduleData());
uipUiBuilderApp.component('position-designer', UIbuilderPositionEditor.moduleData());
uipUiBuilderApp.component('submit-actions', UIbuilderSubmitAction.moduleData());
uipUiBuilderApp.component('link-select', UIbuilderLinkSelect.moduleData());
uipUiBuilderApp.component('uip-border-radius', UIbuilderBorderRadius.moduleData());
uipUiBuilderApp.component('tab-builder', UIbuilderTabBuilder.moduleData());
uipUiBuilderApp.component('select-option-builder', UIbuilderSelectOptionBuilder.moduleData());
uipUiBuilderApp.component('simple-color-picker', UIbuilderSimpleColorPicker.moduleData());
uipUiBuilderApp.component('array-list', UIbuilderArrayList.moduleData());
uipUiBuilderApp.component('uip-select-post-types', UIbuilderSelectPostTypes.moduleData());
uipUiBuilderApp.component('flex-layout', UIbuilderFlexLayout.moduleData());
uipUiBuilderApp.component('style-designer', UIbuilderStyles.moduleData());
uipUiBuilderApp.component('inline-image-select', UIbuilderInlineImageSelect.moduleData());
uipUiBuilderApp.component('query-builder', UIbuilderQueryBuilder.moduleData());
uipUiBuilderApp.component('uip-effects', UIbuilderEffects.moduleData());

/**
 * Async import blocks and mount app
 * @since 3.0.0
 */
uipress.dynamicImport(allUIPBlocks, uipUiBuilderApp).then((response) => {
  if (response == true) {
    //Import plugins
    uipress.importPlugins(uipress.uipAppData.plugins, uipUiBuilderApp).then((response) => {
      if (response == true) {
        //Success
        uipUiBuilderApp.mount('#uip-ui-builder');
      } else {
        uipress.notify(__('Unable to load all plugins', 'uipress-lite'), __('Some functions may not work as expected.', 'uipress-lite'), 'error', true);
      }
    });
  } else {
    uipress.notify(__('Unable to load all components', 'uipress-lite'), __('Some functions may not work as expected.', 'uipress-lite'), 'error', true);
  }
});
