
export class SessionScrap {
    windowWidth: number;
    windowHeight: number;
    currentPage: string;
    scrollTopPosition: number;
    mouseX: number;
    mouseY: number;
    clickedItemId: string;
    InputId: string;
    InputKey: string;

    constructor(
        windowWidth = 1920,
        windowHeight = 969,
        currentPage = '/',
        scrollTopPosition = 0,
        mouseX = 0,
        mouseY = 0,
        clickedItemId = 'None',
        InputId = 'None',
        InputKey = 'None'
    ) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.currentPage = currentPage;
        this.scrollTopPosition = scrollTopPosition;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.clickedItemId = clickedItemId;
        this.InputId = InputId;
        this.InputKey = InputKey;
    }
}