import {RandomUserEntity} from "@/components/InfiniteScroller/types";

export type PagingTriggerProps = {
    isTriggerActivated: boolean;
    currentListLength: number;
    limitValue: number;
    onPageLoad: (newPageData: RandomUserEntity[]) => void;
}

export type PagingTriggerExpose = {
    rootElement: HTMLElement | null;
}