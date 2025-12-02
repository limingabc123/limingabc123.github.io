import type { VNode } from '../core/types';
import { AnimationQueues } from './utils/common';
export declare function patchEvent(name: string, lastValue: any, nextValue: any, dom: any): void;
export declare function patchProp(prop: any, lastValue: any, nextValue: any, dom: Element, isSVG: boolean, hasControlledValue: boolean, lastVNode: VNode | null, animations: AnimationQueues): void;
export declare function mountProps(vNode: any, flags: any, props: any, dom: any, isSVG: any, animations: AnimationQueues): void;
