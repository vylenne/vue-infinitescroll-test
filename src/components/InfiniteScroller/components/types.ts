import {RandomUserApiData} from "@/components/InfiniteScroller/types";

export type PagingTriggerProps = {
    isTriggerActivated: boolean;
    currentListLength: number;
    limitValue: number;
    onPageLoad: (newPageData: RandomUserApiData[]) => void;
}

export type PagingTriggerExpose = {
    rootElement: HTMLElement | null;
}