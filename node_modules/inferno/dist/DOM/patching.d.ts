import type { VNode } from '../core/types';
import { VNodeFlags } from 'inferno-vnode-flags';
import { AnimationQueues } from './utils/common';
export declare function patch(lastVNode: VNode, nextVNode: VNode, parentDOM: Element, context: Object, isSVG: boolean, nextNode: Element | null, lifecycle: Function[], animations: AnimationQueues): void;
export declare function patchSingleTextChild(lastChildren: any, nextChildren: any, parentDOM: Element): void;
export declare function patchElement(lastVNode: VNode, nextVNode: VNode, context: Object, isSVG: boolean, nextFlags: VNodeFlags, lifecycle: Function[], animations: AnimationQueues): void;
export declare function updateClassComponent(instance: any, nextState: any, nextProps: any, parentDOM: Element, context: any, isSVG: boolean, force: boolean, nextNode: Element | null, lifecycle: Function[], animations: AnimationQueues): void;
