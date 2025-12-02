import type { VNode } from '../core/types';
import { AnimationQueues } from './utils/common';
export declare function remove(vNode: VNode, parentDOM: Element, animations: AnimationQueues): void;
export declare function unmount(vNode: any, animations: AnimationQueues): void;
export declare function unmountAllChildren(children: VNode[], animations: AnimationQueues): void;
export declare function clearDOM(parentDOM: any, children: VNode[], animations: AnimationQueues): void;
export declare function removeAllChildren(dom: Element, vNode: VNode, children: any, animations: AnimationQueues): void;
