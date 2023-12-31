const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      returnData: Function,
      value: Object,
    },
    inject: ['uipress'],
    data: function () {
      return {
        option: {
          grow: 'none',
          flexShrink: 'none',
          enabled: {
            maxHeight: false,
            minHeight: false,
            maxWidth: false,
            minWidth: false,
            flexShrink: false,
          },
          width: {
            value: '',
            units: '%',
          },
          height: {
            value: '',
            units: '%',
          },
          maxWidth: {
            value: '',
            units: '%',
          },
          maxHeight: {
            value: '',
            units: '%',
          },
          minWidth: {
            value: '',
            units: '%',
          },
          minHeight: {
            value: '',
            units: '%',
          },
        },
        growOptions: {
          grow: {
            value: 'grow',
            label: __('Yes', 'uipress-lite'),
          },
          none: {
            value: 'none',
            label: __('No', 'uipress-lite'),
          },
        },
        shrinkOptions: {
          none: {
            value: 'none',
            label: __('No', 'uipress-lite'),
          },
          shrink: {
            value: 'shrink',
            label: __('Yes', 'uipress-lite'),
          },
        },
        strings: {
          height: __('Height', 'uipress-light'),
          width: __('Width', 'uipress-light'),
          maxHeight: __('Max height', 'uipress-light'),
          maxWidth: __('Max width', 'uipress-light'),
          minHeight: __('Min height', 'uipress-light'),
          minWidth: __('Min width', 'uipress-light'),
          grow: __('Grow', 'uipress-lite'),
          flexShrink: __('Shrink', 'uipress-lite'),
        },
      };
    },
    watch: {
      option: {
        handler(newValue, oldValue) {
          this.returnData(this.option);
        },
        deep: true,
      },
    },
    mounted: function () {
      this.formatInput(this.value);
    },
    computed: {
      returnOption() {
        return this.option;
      },
    },
    methods: {
      formatInput(value) {
        if (typeof value === 'undefined') {
          return;
        }
        if (this.uipress.isObject(value)) {
          this.option = { ...this.option, ...value };
          return;
        }
      },
    },
    template: `
    
    <div class="uip-flex uip-flex-column uip-row-gap-xs">
        
        
        <!--Stretch -->
        <div class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.grow}}</span></div>
            
          <div class="uip-position-relative">
            <toggle-switch :options="growOptions" :activeValue="option.grow" :returnValue="function(data){ option.grow = data}"></toggle-switch>
          </div>
          
        </div>
      
        <!--Height-->
        <div class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.height}}</span></div>
            
          <div class="uip-position-relative">
           <value-units :value="returnOption.height" :returnData="function(data) {option.height = data}"></value-units>
          </div>
          
        </div>
        
        <!--Min Height-->
        <div v-if="option.enabled.minHeight" class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.minHeight}}</span></div>
            
          <div class="uip-position-relative uip-flex">
           <value-units :value="returnOption.minHeight" :returnData="function(data) {option.minHeight = data}"></value-units>
           
           <button @click="option.enabled.minHeight = false; option.minHeight.value = ''" class="uip-button-default uip-border-rounder uip-icon uip-padding-xxs uip-link-muted uip-margin-left-xs">close</button>
          </div>
          
        </div>
        
        <!--Max Height-->
        <div v-if="option.enabled.maxHeight" class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.maxHeight}}</span></div>
            
          <div class="uip-position-relative uip-flex">
           <value-units :value="returnOption.maxHeight" :returnData="function(data) {option.maxHeight = data}"></value-units>
           
           <button @click="option.enabled.maxHeight = false; option.maxHeight.value = ''" class="uip-button-default uip-border-rounder uip-icon uip-padding-xxs uip-link-muted uip-margin-left-xs">close</button>
          </div>
          
        </div>
        
        <!--Width-->
        <div class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.width}}</span></div>
            
          <div class="uip-position-relative">
           <value-units :value="returnOption.width" :returnData="function(data) {option.width = data}"></value-units>
          </div>
          
        </div>
        
        <!--Min Width-->
        <div v-if="option.enabled.minWidth" class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.minWidth}}</span></div>
            
          <div class="uip-position-relative uip-flex">
           <value-units :value="returnOption.minWidth" :returnData="function(data) {option.minWidth = data}"></value-units>
           
           <button @click="option.enabled.minWidth = false; option.minWidth.value = ''" class="uip-button-default uip-border-rounder uip-icon uip-padding-xxs uip-link-muted uip-margin-left-xs">close</button>
          </div>
          
        </div>
        
        <!--Max Width-->
        <div v-if="option.enabled.maxWidth" class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.maxWidth}}</span></div>
            
          <div class="uip-position-relative uip-flex">
           <value-units :value="returnOption.maxWidth" :returnData="function(data) {option.maxWidth = data}"></value-units>
           
           <button @click="option.enabled.maxWidth = false; option.maxWidth.value = ''" class="uip-button-default uip-border-rounder uip-icon uip-padding-xxs uip-link-muted uip-margin-left-xs">close</button>
          </div>
          
        </div>
        
        <!--Flex shrink-->
        <div v-if="option.enabled.flexShrink" class="uip-grid-col-1-3">
        
          <div class="uip-text-muted uip-flex uip-flex-center"><span>{{strings.flexShrink}}</span></div>
            
          <div class="uip-position-relative uip-flex">
           <toggle-switch :options="shrinkOptions" :activeValue="option.flexShrink" :returnValue="function(data){ option.flexShrink = data}"></toggle-switch>
           
           <button @click="option.enabled.flexShrink = false; option.flexShrink = false" class="uip-button-default uip-border-rounder uip-icon uip-padding-xxs uip-link-muted uip-margin-left-xs">close</button>
          </div>
          
        </div>
        
        <div class="uip-grid-col-1-3">
        
          <div></div>
          
          <div class="uip-flex">
            <drop-down dropPos="bottom-left" containerClass="uip-flex uip-w-100p" triggerClass="uip-flex uip-w-100p">
              <template v-slot:trigger>
                <button class="uip-button-default uip-icon uip-border-rounder uip-padding-xxs uip-link-muted uip-w-100p">add</button>
              </template>
              <template v-slot:content>
                <div class="uip-padding-xs uip-flex uip-flex-column">
                
                  <div @click="option.enabled.minHeight = true" class="uip-link-muted hover:uip-background-muted uip-border-round uip-padding-xxs">{{strings.minHeight}}</div>
                  <div @click="option.enabled.maxHeight = true" class="uip-link-muted hover:uip-background-muted uip-border-round uip-padding-xxs">{{strings.maxHeight}}</div>
                  <div @click="option.enabled.minWidth = true" class="uip-link-muted hover:uip-background-muted uip-border-round uip-padding-xxs">{{strings.minWidth}}</div>
                  <div @click="option.enabled.maxWidth = true" class="uip-link-muted hover:uip-background-muted uip-border-round uip-padding-xxs">{{strings.maxWidth}}</div>
                  <div @click="option.enabled.flexShrink = true" class="uip-link-muted hover:uip-background-muted uip-border-round uip-padding-xxs">{{strings.flexShrink}}</div>
                  
                  
                  
                </div>
              </template>
            </drop-down>  
          </div>
        </div>
        
      </div>`,
  };
}
