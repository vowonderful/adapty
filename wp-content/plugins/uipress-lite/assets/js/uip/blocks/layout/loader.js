const { __, _x, _n, _nx } = wp.i18n;
const uipress = new window.uipClass();
export function fetchBlocks() {
  return [
    /**
     * Container options
     * @since 3.0.0
     */
    {
      name: __('Container', 'uipress-lite'),
      moduleName: 'uip-container',
      description: __('Creates a container block with options for aligning content', 'uipress-lite'),
      category: __('Layout', 'uipress-lite'),
      group: 'layout',
      path: '../blocks/layout/container.min.js',
      icon: 'crop_free',
      settings: {},
      content: [],
      optionsEnabled: [
        //Block options group
        {
          name: 'block',
          label: __('Block options', 'uipress-lite'),
          icon: 'check_box_outline_blank',
          options: [],
        },
        //Style options group
        {
          name: 'style',
          icon: 'dashboard_customize',
          styleType: 'style',
          options: uipress.returnDefaultOptions(true, true),
        },
        //Advanced options group
        {
          name: 'advanced',
          label: __('Advanced', 'uipress-lite'),
          icon: 'code',
          options: uipress.returnAdvancedOptions(),
        },
      ],
    },
    /**
     * Drop down
     * @since 3.0.0
     */
    {
      name: __('Dropdown', 'uipress-lite'),
      moduleName: 'uip-dropdown',
      description: __('Creates a dropdown with a customisable trigger', 'uipress-lite'),
      category: __('Layout', 'uipress-lite'),
      group: 'layout',
      path: '../blocks/layout/dropdown.min.js',
      icon: 'expand_circle_down',
      settings: {},
      content: [],
      optionsEnabled: [
        //Block options group
        {
          name: 'block',
          label: __('Block options', 'uipress-lite'),
          icon: 'check_box_outline_blank',
          options: [
            {
              option: 'title',
              uniqueKey: 'buttonText',
              label: __('Trigger text', 'uipress-lite'),
              value: {
                string: __('Press me', 'uipress-lite'),
                dynamic: false,
                dynamicKey: '',
                dynamicPos: 'left',
              },
            },
            { option: 'iconSelect', label: __('Icon', 'uipress-lite') },
            { option: 'iconPosition', label: __('Icon position', 'uipress-lite'), value: { value: 'left' } },
            {
              option: 'defaultSelect',
              uniqueKey: 'dropDirection',
              label: __('Dropdown position', 'uipress-lite'),
              args: {
                options: [
                  {
                    value: 'bottom-left',
                    label: __('Bottom left', 'uipress-lite'),
                  },
                  {
                    value: 'bottom-right',
                    label: __('Bottom right', 'uipress-lite'),
                  },
                  {
                    value: 'top-left',
                    label: __('Top left', 'uipress-lite'),
                  },
                  {
                    value: 'top-right',
                    label: __('Top right', 'uipress-lite'),
                  },
                  {
                    value: 'left',
                    label: __('Left', 'uipress-lite'),
                  },
                  {
                    value: 'right',
                    label: __('Right', 'uipress-lite'),
                  },
                ],
              },
              value: 'bottom-left',
            },
            { option: 'keyboardShortcut', label: __('Keyboard shortcut to open', 'uipress-lite') },
          ],
        },

        //Container options group
        {
          name: 'style',
          label: __('Style', 'uipress-lite'),
          icon: 'palette',
          styleType: 'style',
          options: uipress.returnDefaultOptions(),
        },

        //Container options group
        {
          name: 'trigger',
          label: __('Trigger styles', 'uipress-lite'),
          icon: 'smart_button',
          styleType: 'style',
          class: '.uip-drop-trigger',
          options: uipress.returnDefaultOptions(),
        },
        {
          name: 'dropdown',
          label: __('Dropdown styles', 'uipress-lite'),
          icon: 'palette',
          styleType: 'style',
          class: '.uip-dropdown-conatiner',
          options: uipress.returnDefaultOptions(),
        },
        //Advanced options group
        {
          name: 'advanced',
          label: __('Advanced', 'uipress-lite'),
          icon: 'code',
          options: uipress.returnAdvancedOptions(),
        },
      ],
    },

    /**
     * Responsive grid
     * @since 3.0.0
     */
    {
      name: __('Responsive grid', 'uipress-lite'),
      moduleName: 'responsive-grid',
      description: __('Outputs a responsive grid', 'uipress-lite'),
      category: __('Layout', 'uipress-lite'),
      group: 'layout',
      path: '../blocks/layout/responsive-grid.min.js',
      icon: 'grid_view',
      settings: {},
      content: [],
      optionsEnabled: [
        //Block options group
        {
          name: 'block',
          label: __('Block options', 'uipress-lite'),
          icon: 'check_box_outline_blank',
          options: [
            { option: 'number', uniqueKey: 'columnsNum', label: __('Columns', 'uipress-lite'), value: 3 },
            {
              option: 'valueUnits',
              uniqueKey: 'minWidth',
              label: __('Min col width', 'uipress-lite'),
              value: { value: 100, units: 'px' },
            },
            { option: 'valueUnits', uniqueKey: 'gridGap', label: __('Grid gap', 'uipress-lite'), value: { value: 1, units: 'rem' } },
          ],
        },

        //Container options group
        {
          name: 'style',
          label: __('Content area', 'uipress-lite'),
          icon: 'dashboard_customize',
          styleType: 'style',
          options: uipress.returnDefaultOptions(),
        },

        //Advanced options group
        {
          name: 'advanced',
          label: __('Advanced', 'uipress-lite'),
          icon: 'code',
          options: uipress.returnAdvancedOptions(),
        },
      ],
    },

    /**
     * Slide out panel
     * @since 3.0.0
     */
    {
      name: __('Slide out panel', 'uipress-lite'),
      moduleName: 'uip-slide-out',
      description: __('Creates a slide out panel with a customisable trigger', 'uipress-lite'),
      category: __('Layout', 'uipress-lite'),
      group: 'layout',
      path: '../blocks/layout/slide-out-panel.min.js',
      icon: 'space_dashboard',
      settings: {},
      content: [],
      optionsEnabled: [
        //Block options group
        {
          name: 'block',
          label: __('Block options', 'uipress-lite'),
          icon: 'check_box_outline_blank',
          options: [
            {
              option: 'title',
              uniqueKey: 'buttonText',
              label: __('Trigger text', 'uipress-lite'),
              value: {
                string: __('Press me', 'uipress-lite'),
                dynamic: false,
                dynamicKey: '',
                dynamicPos: 'left',
              },
            },
            { option: 'iconSelect', label: __('Icon', 'uipress-lite') },
            { option: 'iconPosition', label: __('Icon position', 'uipress-lite'), value: { value: 'left' } },
            {
              option: 'choiceSelect',
              uniqueKey: 'panelSide',
              label: __('Panel position', 'uipress-lite'),
              args: {
                options: {
                  left: {
                    value: 'left',
                    label: __('Left', 'uipress-lite'),
                  },
                  right: {
                    value: 'right',
                    label: __('Right', 'uipress-lite'),
                  },
                },
              },
              value: {
                value: 'right',
              },
            },
            {
              option: 'choiceSelect',
              uniqueKey: 'overlayStyle',
              label: __('Style', 'uipress-lite'),
              args: {
                options: {
                  overlay: {
                    value: 'overlay',
                    label: __('Overlay', 'uipress-lite'),
                  },
                  push: {
                    value: 'push',
                    label: __('Push', 'uipress-lite'),
                  },
                },
              },
              value: {
                value: 'overlay',
              },
            },
            {
              option: 'choiceSelect',
              uniqueKey: 'closeOnPageChange',
              args: {
                options: {
                  false: {
                    value: false,
                    label: __('Disabled', 'uipress-lite'),
                  },
                  true: {
                    value: true,
                    label: __('Enabled', 'uipress-lite'),
                  },
                },
              },
              label: __('Close on page change', 'uipress-lite'),
            },
            { option: 'keyboardShortcut', label: __('Keyboard shortcut', 'uipress-lite') },
          ],
        },
        {
          name: 'style',
          icon: 'dashboard_customize',
          styleType: 'style',
          options: uipress.returnDefaultOptions(),
        },
        //Container options group
        {
          name: 'trigger',
          label: __('Trigger style', 'uipress-lite'),
          icon: 'palette',
          styleType: 'style',
          class: '.uip-panel-trigger',
          options: uipress.returnDefaultOptions(),
        },
        //Container options group
        {
          name: 'panel',
          label: __('Panel styles', 'uipress-lite'),
          icon: 'palette',
          styleType: 'style',
          class: '.uip-offcanvas-panel',
          options: uipress.returnDefaultOptions(),
        },
        //Advanced options group
        {
          name: 'advanced',
          label: __('Advanced', 'uipress-lite'),
          icon: 'code',
          options: uipress.returnAdvancedOptions(),
        },
      ],
    },
    ///Pro placeholders
    {
      name: __('Modal', 'uipress-lite'),
      moduleName: 'uip-block-modal',
      description: __('Outputs a modal block with a customisable trigger', 'uipress-lite'),
      category: __('Layout', 'uipress-lite'),
      group: 'layout',
      icon: 'open_in_new',
    },
  ];
}
