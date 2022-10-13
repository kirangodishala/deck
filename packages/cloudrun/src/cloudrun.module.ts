import { module } from 'angular';

import {
  CloudProviderRegistry,
  DeploymentStrategyRegistry,
  STAGE_ARTIFACT_SELECTOR_COMPONENT_REACT,
  YAML_EDITOR_COMPONENT,
} from '@spinnaker/core';

import { CLOUDRUN_COMPONENT_URL_DETAILS } from './common/componentUrlDetails.component';
import { CLOUDRUN_LOAD_BALANCER_CREATE_MESSAGE } from './common/loadBalancerMessage.component';
import './help/cloudrun.help';
import { CLOUDRUN_INSTANCE_DETAILS_CTRL } from './instance/details/details.controller';
import { CLOUDRUN_ALLOCATION_CONFIGURATION_ROW } from './loadBalancer/configure/wizard/allocationConfigurationRow.component';
import { CLOUDRUN_LOAD_BALANCER_BASIC_SETTINGS } from './loadBalancer/configure/wizard/basicSettings.component';
import { CLOUDRUN_STAGE_ALLOCATION_CONFIGURATION_ROW } from './loadBalancer/configure/wizard/stageAllocationConfigurationRow.component';
import { CLOUDRUN_LOAD_BALANCER_WIZARD_CTRL } from './loadBalancer/configure/wizard/wizard.controller';
import { CLOUDRUN_LOAD_BALANCER_DETAILS_CTRL } from './loadBalancer/details/details.controller';
import { CLOUDRUN_LOAD_BALANCER_TRANSFORMER } from './loadBalancer/loadBalancerTransformer';
import logo from './logo/cloudrun.logo.png';
import { KUBERNETES_ANNOTATION_CUSTOM_SECTIONS } from './manifest/annotationCustomSections.component';
import { KUBERNETES_MANIFEST_ARTIFACT } from './manifest/artifact/artifact.component';
import { KUBERNETES_MANIFEST_DELETE_CTRL } from './manifest/delete/delete.controller';
import { JSON_EDITOR_COMPONENT } from './manifest/editor/json/jsonEditor.component';
import { KUBERNETES_MANIFEST_EVENTS } from './manifest/manifestEvents.component';
import { KUBERNETES_MANIFEST_IMAGE_DETAILS } from './manifest/manifestImageDetails.component';
import { KUBERNETES_MANIFEST_LABELS } from './manifest/manifestLabels.component';
import { KUBERNETES_MANIFEST_QOS } from './manifest/manifestQos.component';
import { KUBERNETES_MANIFEST_RESOURCES } from './manifest/manifestResources.component';
import { KUBERNETES_ROLLING_RESTART } from './manifest/rollout/RollingRestart';
import { KUBERNETES_MANIFEST_PAUSE_ROLLOUT_CTRL } from './manifest/rollout/pause.controller';
import { KUBERNETES_MANIFEST_RESUME_ROLLOUT_CTRL } from './manifest/rollout/resume.controller';
import { KUBERNETES_MANIFEST_UNDO_ROLLOUT_CTRL } from './manifest/rollout/undo.controller';
import { KUBERNETES_MANIFEST_SCALE_CTRL } from './manifest/scale/scale.controller';
import { KUBERNETES_MANIFEST_SELECTOR } from './manifest/selector/selector.component';
import { KUBERNETES_MANIFEST_CONDITION } from './manifest/status/condition.component';
import { KUBERNETES_MANIFEST_STATUS } from './manifest/status/status.component';
import { CLOUDRUN_PIPELINE_MODULE } from './pipeline/pipeline.module';
import './pipelines/stages';
import './pipelines/stages';
import { KUBERNETES_FIND_ARTIFACTS_FROM_RESOURCE_STAGE } from './pipelines/stages/findArtifactsFromResource/findArtifactsFromResourceStage';
import { KUBERNETES_SCALE_MANIFEST_STAGE } from './pipelines/stages/scaleManifest/scaleManifestStage';
import { KUBERNETES_DISABLE_MANIFEST_STAGE } from './pipelines/stages/traffic/disableManifest.stage';
import { KUBERNETES_ENABLE_MANIFEST_STAGE } from './pipelines/stages/traffic/enableManifest.stage';
import { KUBERNETES_UNDO_ROLLOUT_MANIFEST_STAGE } from './pipelines/stages/undoRolloutManifest/undoRolloutManifestStage';
import './pipelines/validation/manifestSelector.validator';
import { CLOUDRUN_SERVER_GROUP_COMMAND_BUILDER } from './serverGroup/configure/serverGroupCommandBuilder.service';
import { ServerGroupWizard } from './serverGroup/configure/wizard/serverGroupWizard';
import { CLOUDRUN_SERVER_GROUP_DETAILS_CTRL } from './serverGroup/details/details.controller';
import { CLOUDRUN_SERVER_GROUP_TRANSFORMER } from './serverGroup/serverGroupTransformer.service';

import './logo/cloudrun.logo.less';

export const CLOUDRUN_MODULE = 'spinnaker.cloudrun';

const requires = [
  CLOUDRUN_COMPONENT_URL_DETAILS,
  CLOUDRUN_SERVER_GROUP_COMMAND_BUILDER,
  CLOUDRUN_SERVER_GROUP_DETAILS_CTRL,
  CLOUDRUN_SERVER_GROUP_TRANSFORMER,
  CLOUDRUN_LOAD_BALANCER_TRANSFORMER,
  CLOUDRUN_LOAD_BALANCER_DETAILS_CTRL,
  CLOUDRUN_LOAD_BALANCER_WIZARD_CTRL,
  CLOUDRUN_LOAD_BALANCER_CREATE_MESSAGE,
  CLOUDRUN_ALLOCATION_CONFIGURATION_ROW,
  CLOUDRUN_LOAD_BALANCER_BASIC_SETTINGS,
  CLOUDRUN_STAGE_ALLOCATION_CONFIGURATION_ROW,
  CLOUDRUN_PIPELINE_MODULE,
  CLOUDRUN_INSTANCE_DETAILS_CTRL,
  KUBERNETES_MANIFEST_DELETE_CTRL,
  KUBERNETES_MANIFEST_SCALE_CTRL,
  KUBERNETES_MANIFEST_UNDO_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_PAUSE_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_RESUME_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_STATUS,
  KUBERNETES_MANIFEST_CONDITION,
  KUBERNETES_MANIFEST_ARTIFACT,
  KUBERNETES_SCALE_MANIFEST_STAGE,
  KUBERNETES_UNDO_ROLLOUT_MANIFEST_STAGE,
  KUBERNETES_FIND_ARTIFACTS_FROM_RESOURCE_STAGE,
  KUBERNETES_MANIFEST_SELECTOR,
  KUBERNETES_MANIFEST_LABELS,
  KUBERNETES_MANIFEST_EVENTS,
  KUBERNETES_MANIFEST_RESOURCES,
  KUBERNETES_MANIFEST_QOS,
  KUBERNETES_ANNOTATION_CUSTOM_SECTIONS,
  KUBERNETES_MANIFEST_IMAGE_DETAILS,
  YAML_EDITOR_COMPONENT,
  JSON_EDITOR_COMPONENT,
  KUBERNETES_ENABLE_MANIFEST_STAGE,
  KUBERNETES_DISABLE_MANIFEST_STAGE,
  STAGE_ARTIFACT_SELECTOR_COMPONENT_REACT,
  KUBERNETES_ROLLING_RESTART,
];

module(CLOUDRUN_MODULE, requires).config(() => {
  CloudProviderRegistry.registerProvider('cloudrun', {
    name: 'cloudrun',
    //adHocInfrastructureWritesEnabled: SETTINGS.cloudrunAdHocInfraWritesEnabled,
    logo: {
      path: logo,
    },

    instance: {
      detailsTemplateUrl: require('./instance/details/details.html'),
      detailsController: 'cloudrunInstanceDetailsCtrl',
    },
    serverGroup: {
      CloneServerGroupModal: ServerGroupWizard,
      commandBuilder: 'cloudrunV2ServerGroupCommandBuilder',
      detailsController: 'cloudrunV2ServerGroupDetailsCtrl',
      detailsTemplateUrl: require('./serverGroup/details/details.html'),
      transformer: 'cloudrunV2ServerGroupTransformer',
      skipUpstreamStageCheck: true,
    },

    loadBalancer: {
      transformer: 'cloudrunLoadBalancerTransformer',
      createLoadBalancerTemplateUrl: require('./loadBalancer/configure/wizard/wizard.html'),
      createLoadBalancerController: 'cloudrunLoadBalancerWizardCtrl',
      detailsTemplateUrl: require('./loadBalancer/details/details.html'),
      detailsController: 'cloudrunLoadBalancerDetailsCtrl',
    },
  });
});

DeploymentStrategyRegistry.registerProvider('cloudrun', ['custom', 'redblack', 'rollingpush', 'rollingredblack']);
