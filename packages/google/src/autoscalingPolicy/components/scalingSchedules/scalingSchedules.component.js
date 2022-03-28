'use strict';

import { module } from 'angular';
import _ from 'lodash';

export const GOOGLE_AUTOSCALINGPOLICY_COMPONENTS_SCALINGSCHEDULES_SCALINGSCHEDULES_COMPONENT =
  'spinnaker.deck.gce.autoscalingPolicy.scalingSchedules.component';
export const name = GOOGLE_AUTOSCALINGPOLICY_COMPONENTS_SCALINGSCHEDULES_SCALINGSCHEDULES_COMPONENT; // for backwards compatibility
module(GOOGLE_AUTOSCALINGPOLICY_COMPONENTS_SCALINGSCHEDULES_SCALINGSCHEDULES_COMPONENT, []).component(
  'gceAutoscalingPolicyScalingSchedules',
  {
    bindings: {
      policy: '=',
      updatePolicy: '<',
    },
    templateUrl: require('./scalingSchedules.component.html'),
    controller: function () {
      const multipleAllowedFor = {
        scalingSchedules: true,
      };

      this.addSchedule = (scheduleType) => {
        if (multipleAllowedFor[scheduleType]) {
          this.policy[scheduleType] = this.policy[scheduleType] || [];
          this.policy[scheduleType].push({});
        } else if (emptyOrUndefined(this.policy[scheduleType])) {
          this.policy[scheduleType] = {};
        }
      };

      this.deleteSchedule = (scheduleType, index) => {
        if (multipleAllowedFor[scheduleType]) {
          this.policy[scheduleType].splice(index, 1);
        } else {
          // sending an empty object to the API deletes the policy.
          this.policy[scheduleType] = {};
        }
      };
      function emptyOrUndefined(value) {
        return _.isEqual(value, {}) || _.isUndefined(value);
      }
    },
  },
);
