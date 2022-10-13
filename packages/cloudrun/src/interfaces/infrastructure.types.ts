import type {
  IInstance,
  ILoadBalancer,
  IMoniker,
  ISecurityGroupDetail,
  IServerGroup,
  IServerGroupManager,
} from '@spinnaker/core';

export interface IKubernetesResource {
  apiVersion: string;
  createdTime?: number;
  displayName: string;
  kind: string;
  namespace: string;
}

export interface IKubernetesInstance extends IInstance, IKubernetesResource {
  humanReadableName: string;
  moniker: IMoniker;
  publicDnsName?: string;
}

export interface IKubernetesLoadBalancer extends ILoadBalancer, IKubernetesResource {}

export interface IKubernetesSecurityGroup extends ISecurityGroupDetail, IKubernetesResource {
  account: string;
  moniker: IMoniker;
}

export interface IKubernetesServerGroup extends IServerGroup, IKubernetesResource {
  disabled: boolean;
}

export interface IKubernetesServerGroupManager extends IServerGroupManager, IKubernetesResource {}

export interface ICloudrunResource {
  apiVersion: string;
  createdTime?: number;
  displayName: string;
  kind: string;
  namespace: string;
}

export interface ICloudrunInstance extends IInstance, ICloudrunResource {
  humanReadableName: string;
  moniker: IMoniker;
  publicDnsName?: string;
}

export interface ICloudrunLoadBalancer extends ILoadBalancer, ICloudrunResource {}

export interface ICloudrunServerGroup extends IServerGroup, ICloudrunResource {
  disabled: boolean;
}
